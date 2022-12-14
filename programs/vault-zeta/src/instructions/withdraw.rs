use std::cmp::min;
use anchor_lang::prelude::*;
use anchor_spl::token::{burn, Burn, Mint, Token, TokenAccount, Transfer, transfer};
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
  mint::decimals = 9,
  mint::authority = vault.key(),
  seeds = [b"shares", vault.key().as_ref()],
  bump = vault.mint_bump
  )]
  pub shares_mint: Box<Account<'info, Mint>>,
  #[account(mut, address = vault.collateral_vault)]
  pub collateral_vault: Box<Account<'info, TokenAccount>>,
  #[account(mut, address = vault.underlying_vault)]
  pub underlying_vault: Box<Account<'info, TokenAccount>>,
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
  #[account(mut)]
  pub reserve: Box<Account<'info, cpi::solend::Reserve>>,
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
    msg!("max_shares_amount: {}", max_shares_amount);
    msg!("total_underlying: {}", total_underlying);
    msg!("underlying_value: {}", underlying_value);
    msg!("shares_amount: {}", shares_amount);
    msg!("collateral_amount: {}", collateral_amount);
    msg!("collateral_balance: {}", self.collateral_vault.amount);
    self.burn_shares(shares_amount)?;
    let actual = self.redeem_collateral(collateral_amount)?;
    msg!("actual: {}", actual);
    msg!("expected: {}", underlying_value);
    let withdraw_value = min(actual, underlying_value);
    self.transfer_underlying(withdraw_value)?;
    self.vault.after_withdraw(withdraw_value)
  }

  fn burn_shares(&self, shares_amount: u64) -> Result<()> {
    let signer = vault_seeds!(self.vault);
    let seeds: &[&[&[u8]]] = &[&signer[..]];
    let ctx = CpiContext::new_with_signer(
      self.token_program.to_account_info(),
      Burn {
        mint: self.shares_mint.to_account_info(),
        from: self.user_shares.to_account_info(),
        authority: self.user_account.to_account_info(),
      },
      seeds,
    );
    burn(ctx, shares_amount)
  }

  fn redeem_collateral(&mut self, amount_in: u64) -> Result<u64> {
    let seeds = executor_seeds!(self.vault);
    let signer: &[&[&[u8]]] = &[&seeds[..]];
    let cpi = CpiContext::new_with_signer(
      self.lending_program.to_account_info(),
      cpi::solend::RedeemReserveCollateral {
        source_collateral: *self.collateral_vault.clone(),
        destination_liquidity: *self.underlying_vault.clone(),
        reserve: self.reserve.to_account_info(),
        reserve_collateral_mint: self.reserve_collateral_mint.to_account_info(),
        reserve_liquidity_supply: self.reserve_liquidity_supply.to_account_info(),
        lending_market: self.lending_market.to_account_info(),
        lending_market_authority: self.lending_market_authority.to_account_info(),
        user_transfer_authority: self.executor.to_account_info(),
        token_program: self.token_program.to_account_info(),
        lending_program: self.lending_program.to_account_info(),
      }, signer);
    let liquidity_before = self.underlying_vault.amount;
    cpi::solend::redeem_collateral(cpi, amount_in)?;
    self.underlying_vault.reload()?;
    let liquidity_after = self.underlying_vault.amount
      .checked_sub(liquidity_before).unwrap();
    Ok(liquidity_after)
  }

  fn transfer_underlying(&mut self, amount: u64) -> Result<()> {
    let seeds = executor_seeds!(self.vault);
    let signer: &[&[&[u8]]] = &[&seeds[..]];

    let cpi = CpiContext::new_with_signer(
      self.token_program.to_account_info(),
      Transfer {
        from: self.underlying_vault.to_account_info(),
        to: self.user_token_account.to_account_info(),
        authority: self.executor.to_account_info(),
      }, signer,
    );
    transfer(cpi, amount)?;
    Ok(())
  }
}
