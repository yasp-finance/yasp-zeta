use anchor_lang::prelude::*;
use anchor_spl::token::{Approve, Mint, mint_to, MintTo, Token, TokenAccount};
use crate::{cpi_calls as cpi, executor_seeds, VaultError};
use crate::structs::Vault;


#[derive(Accounts)]
pub struct ReinvestSolend<'info> {
  #[account(
  mut,
  has_one = authority,
  has_one = reserve,
  seeds = [b"vault", reserve.key().as_ref(), vault.zeta_group.as_ref(), authority.key().as_ref()],
  bump = vault.bump
  )]
  pub vault: Box<Account<'info, Vault>>,
  pub authority: Signer<'info>,
  /// CHECK:
  #[account(
  seeds = [b"executor", vault.key().as_ref()],
  bump = vault.executor_bump
  )]
  pub executor: AccountInfo<'info>,
  #[account(
  mut,
  token::authority = executor,
  token::mint = reserve.collateral.mint_pubkey
  )]
  pub collateral_vault: Box<Account<'info, TokenAccount>>,
  #[account(
  mut,
  token::authority = executor,
  token::mint = reserve.liquidity.mint_pubkey
  )]
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
  pub reserve: Box<Account<'info, cpi::solend::Reserve>>,
  pub clock: Sysvar<'info, Clock>,
  pub token_program: Program<'info, Token>,
  pub lending_program: Program<'info, cpi::solend::SolendProgram>,
}

impl<'info> ReinvestSolend<'info> {
  pub fn reinvest_solend(&mut self) -> Result<()> {
    let gain_amount = self.underlying_vault.amount;
    let clock = Clock::get()?;
    self.deposit_liquidity(gain_amount)?;
    self.vault.after_gain(gain_amount, clock.unix_timestamp)?;
    Ok(())
  }

  fn deposit_liquidity(&mut self, max_amount_in: u64) -> Result<u64> {
    let seeds = executor_seeds!(self.vault);
    let seeds: &[&[&[u8]]] = &[&seeds[..]];
    let cpi = CpiContext::new_with_signer(
      self.lending_program.to_account_info(),
      cpi::solend::DepositReserveLiquidity {
        source_liquidity: self.underlying_vault.to_account_info(),
        destination_collateral: *self.collateral_vault.clone(),
        reserve: self.reserve.to_account_info(),
        reserve_liquidity_supply: self.reserve_liquidity_supply.to_account_info(),
        reserve_collateral_mint: self.reserve_collateral_mint.to_account_info(),
        lending_market: self.lending_market.to_account_info(),
        lending_market_authority: self.lending_market_authority.to_account_info(),
        user_transfer_authority: self.executor.to_account_info(),
        clock: self.clock.to_account_info(),
        token_program: self.token_program.to_account_info(),
        lending_program: self.lending_program.to_account_info(),
      }, seeds);
    cpi::solend::deposit_liquidity(cpi, max_amount_in)?;
    Ok(0)
  }
}
