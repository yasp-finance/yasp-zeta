use anchor_lang::prelude::*;
use anchor_spl::token::{burn, Burn, Mint, Token, TokenAccount};
use crate::{executor_seeds, vault_seeds, cpi_calls as cpi, VaultError};
use crate::structs::Vault;


#[derive(Accounts)]
pub struct WithdrawFromVault<'info> {
  #[account(
  mut,
  token::authority = user_account,
  token::mint = shares_mint
  )]
  pub user_shares: Box<Account<'info, TokenAccount>>,
  #[account(
  mut,
  token::authority = user_account,
  token::mint = reserve.liquidity.mint_pubkey
  )]
  pub user_token_account: Box<Account<'info, TokenAccount>>,
  pub user_account: Signer<'info>,
  #[account(
  mut,
  has_one = reserve,
  seeds = [b"vault", reserve.key().as_ref(), vault.zeta_group.as_ref(), vault.authority.as_ref()],
  bump = vault.bump
  )]
  pub vault: Box<Account<'info, Vault>>,
  /// CHECK:
  #[account(
  seeds = [b"executor", vault.key().as_ref()],
  bump = vault.executor_bump
  )]
  pub executor: AccountInfo<'info>,
  #[account(
  mut,
  seeds = [b"shares", vault.key().as_ref()],
  bump = vault.mint_bump
  )]
  pub shares_mint: Box<Account<'info, Mint>>,
  #[account(
  mut,
  token::authority = executor,
  token::mint = reserve.collateral.mint_pubkey
  )]
  pub collateral_vault: Box<Account<'info, TokenAccount>>,
  /// CHECK:
  #[account(mut)]
  pub reserve_liquidity_supply: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub reserve_collateral_mint: AccountInfo<'info>,
  /// CHECK:
  pub lending_market: AccountInfo<'info>,
  /// CHECK:
  pub lending_market_authority: AccountInfo<'info>,
  pub reserve: Box<Account<'info, cpi::solend::Reserve>>,
  pub clock: Sysvar<'info, Clock>,
  pub token_program: Program<'info, Token>,
  pub lending_program: Program<'info, cpi::solend::SolendProgram>,
}

impl<'info> WithdrawFromVault<'info> {
  pub fn withdraw(&mut self, max_shares_amount: u64) -> Result<()> {
    if max_shares_amount > self.user_shares.amount {
      return err!(VaultError::SharesOverflow);
    }

    if max_shares_amount == 0 {
      return err!(VaultError::ZeroWithdraw);
    }

    // if !self.vault.is_live {
    //   return err!(VaultError::UseEmergencyWithdraw)
    // }
    let clock = Clock::get()?;
    let total_underlying = self.vault.free_funds(clock.unix_timestamp)
      .unwrap();
    let underlying_value = self.vault.share_value(
      max_shares_amount,
      total_underlying,
      self.shares_mint.supply,
    ).unwrap();
    let shares_amount = self.vault.shares_for_amount(
      underlying_value,
      total_underlying,
      self.shares_mint.supply,
    ).unwrap();
    let collateral_amount = self.vault.for_collateral(
      underlying_value,
      &self.reserve,
    ).unwrap();
    self.burn_shares(shares_amount)?;
    self.redeem_collateral(collateral_amount)?;
    self.vault.after_withdraw(underlying_value)
  }

  fn burn_shares(&self, shares_amount: u64) -> Result<()> {
    let seeds = vault_seeds!(self.vault);
    let seeds: &[&[&[u8]]] = &[&seeds[..]];
    let cpi_accounts = Burn {
      mint: self.shares_mint.to_account_info(),
      from: self.user_shares.to_account_info(),
      authority: self.executor.to_account_info(),
    };
    let cpi_program = self.token_program.to_account_info();
    let ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, seeds);
    burn(ctx, shares_amount)
  }

  fn redeem_collateral(&self, amount_in: u64) -> Result<u64> {
    let seeds = executor_seeds!(self.vault);
    let signer: &[&[&[u8]]] = &[&seeds[..]];
    let cpi = CpiContext::new_with_signer(
      self.lending_program.to_account_info(),
      cpi::solend::RedeemReserveCollateral {
        source_collateral: *self.collateral_vault.clone(),
        destination_liquidity: *self.user_token_account.clone(),
        reserve: self.reserve.to_account_info(),
        reserve_collateral_mint: self.reserve_collateral_mint.to_account_info(),
        reserve_liquidity_supply: self.reserve_liquidity_supply.to_account_info(),
        lending_market: self.lending_market.to_account_info(),
        lending_market_authority: self.lending_market_authority.to_account_info(),
        user_transfer_authority: self.executor.to_account_info(),
        clock: self.clock.to_account_info(),
        token_program: self.token_program.to_account_info(),
        lending_program: self.lending_program.to_account_info(),
      }, signer);
    cpi::solend::redeem_collateral(cpi, amount_in)?;
    Ok(0)
  }
}
