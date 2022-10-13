use anchor_lang::prelude::*;
use anchor_spl::token::{Approve, approve, Mint, mint_to, MintTo, Token, TokenAccount};
use num_traits::ToPrimitive;
use crate::{cpi_calls as cpi, executor_seeds, ratio, vault_seeds, VaultError};
use crate::structs::Vault;


#[derive(Accounts)]
pub struct DepositToVault<'info> {
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
  #[account(mut, address = vault.collateral_vault)]
  pub collateral_vault: Box<Account<'info, TokenAccount>>,
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
  /// CHECK:
  #[account(mut)]
  pub reserve_liquidity_supply: Box<Account<'info, TokenAccount>>,
  /// CHECK:
  #[account(mut)]
  pub reserve_collateral_mint: Box<Account<'info, Mint>>,
  /// CHECK:
  pub lending_market: AccountInfo<'info>,
  /// CHECK:
  pub lending_market_authority: AccountInfo<'info>,
  #[account(mut)]
  pub reserve: Box<Account<'info, cpi::solend::Reserve>>,
  pub token_program: Program<'info, Token>,
  pub lending_program: Program<'info, cpi::solend::SolendProgram>,
}

impl<'info> DepositToVault<'info> {
  pub fn deposit(&mut self, max_amount_in: u64) -> Result<()> {
    if self.vault.total_deposit + (max_amount_in as u64) > self.vault.deposit_limit {
      return err!(VaultError::VaultIsFull);
    }

    // if !self.vault.is_live {
    //   return err!(VaultError::DepositDisabled);
    // }
    // self.approve(max_amount_in)?;
    let clock = Clock::get()?;
    let collateral = self.deposit_liquidity(max_amount_in)?;
    let shares = self.get_shares(
      max_amount_in, clock.unix_timestamp
    )?;
    self.mint(shares)?;
    self.vault.after_deposit(max_amount_in)?;
    Ok(())
  }

  // fn approve(&self, amount_in: u64) -> Result<()> {
  //   let ctx = CpiContext::new(
  //     self.token_program.to_account_info(),
  //     Approve {
  //       delegate: self.executor.to_account_info(),
  //       to: self.user_token_account.to_account_info(),
  //       authority: self.user_account.to_account_info(),
  //     });
  //   approve(ctx, amount_in)?;
  //   Ok(())
  // }

  fn mint(&self, shares_amount: u64) -> Result<()> {
    let seeds = vault_seeds!(self.vault);
    let seeds: &[&[&[u8]]] = &[&seeds[..]];
    let ctx = CpiContext::new_with_signer(
      self.token_program.to_account_info(),
      MintTo {
        mint: self.shares_mint.to_account_info(),
        to: self.user_shares.to_account_info(),
        authority: self.vault.to_account_info(),
      }, seeds);
    mint_to(ctx, shares_amount)
  }

  fn get_shares(&self, underlying_amount: u64, now: i64) -> Result<u64> {
    let total_supply = self.shares_mint.supply;
    let total_assets = self.vault.free_funds(now).unwrap();
    let shares = if total_supply > 0 {
      ratio!(underlying_amount, total_supply, total_assets).unwrap()
    } else {
      // 1 share = 1 liquidity
      underlying_amount as u64
    };
    Ok(shares)
  }

  fn deposit_liquidity(&mut self, max_amount_in: u64) -> Result<u64> {
    let cpi = CpiContext::new(
      self.lending_program.to_account_info(),
      cpi::solend::DepositReserveLiquidity {
        source_liquidity: self.user_token_account.to_account_info(),
        destination_collateral: *self.collateral_vault.clone(),
        reserve: self.reserve.to_account_info(),
        reserve_liquidity_supply: self.reserve_liquidity_supply.to_account_info(),
        reserve_collateral_mint: self.reserve_collateral_mint.to_account_info(),
        lending_market: self.lending_market.to_account_info(),
        lending_market_authority: self.lending_market_authority.to_account_info(),
        user_transfer_authority: self.user_account.to_account_info(),
        token_program: self.token_program.to_account_info(),
        lending_program: self.lending_program.to_account_info(),
      });
    let collateral_before = self.collateral_vault.amount;
    cpi::solend::deposit_liquidity(cpi, max_amount_in)?;
    self.collateral_vault.reload()?;
    let collateral_after = self.collateral_vault.amount
      .checked_sub(collateral_before).unwrap();
    Ok(collateral_after)
  }
}
