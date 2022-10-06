use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use crate::{executor_seeds, cpi_calls as cpi};
use crate::structs::Vault;


#[derive(Accounts)]
pub struct HarvestYield<'info> {
  #[account(
  mut,
  has_one = authority,
  has_one = reserve,
  seeds = [b"vault", reserve.key().as_ref(), authority.key().as_ref()],
  bump = vault.bump
  )]
  pub vault: Box<Account<'info, Vault>>,
  /// CHECK:
  #[account(
  seeds = [b"executor", vault.key().as_ref()],
  bump = vault.executor_bump
  )]
  pub executor: AccountInfo<'info>,
  pub authority: Signer<'info>,
  #[account(
  mut, address = vault.collateral_vault
  )]
  pub collateral_vault: Box<Account<'info, TokenAccount>>,
  #[account(
  mut, address = vault.underlying_vault
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

impl<'info> HarvestYield<'info> {
  pub fn harvest_yield(&mut self) -> Result<()> {
    let clock = Clock::get()?;
    let real_underlying = self.vault.for_underlying(
      self.collateral_vault.amount,
      &self.reserve
    ).unwrap();
    let total_assets = self.vault.total_assets().unwrap();

    let accrued_yield = real_underlying
      .checked_sub(total_assets).unwrap();
    let collateral_amount = self.vault.for_collateral(
      accrued_yield,
      &self.reserve
    ).unwrap();
    self.redeem_collateral(collateral_amount)?;
    self.vault.after_harvest(accrued_yield, clock.unix_timestamp)?;
    Ok(())
  }

  fn redeem_collateral(&self, amount_in: u64) -> Result<u64>  {
    let seeds = executor_seeds!(self.vault);
    let seeds: &[&[&[u8]]] = &[&seeds[..]];
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
        clock: self.clock.to_account_info(),
        token_program: self.token_program.to_account_info(),
        lending_program: self.lending_program.to_account_info()
      }, seeds);
    cpi::solend::redeem_collateral(cpi, amount_in)?;
    Ok(0)
  }
}
