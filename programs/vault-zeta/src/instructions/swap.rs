use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use crate::{executor_seeds, cpi_calls as cpi};
use crate::cpi_calls::whirlpool::sqrt_price_from_tick_index;
use crate::structs::Vault;

#[derive(Accounts)]
pub struct Swap<'info> {
  #[account(
  mut,
  has_one = authority,
  seeds = [b"vault", vault.reserve.as_ref(), vault.authority.as_ref()],
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
  #[account(mut)]
  pub whirlpool: Box<Account<'info, cpi::whirlpool::Whirlpool>>,
  #[account(mut, address = vault.underlying_vault)]
  pub underlying_vault: Box<Account<'info, TokenAccount>>,
  #[account(mut, address = vault.usdc_vault)]
  pub usdc_vault: Box<Account<'info, TokenAccount>>,
  #[account(mut)]
  pub token_vault_a: Box<Account<'info, TokenAccount>>,
  #[account(mut)]
  pub token_vault_b: Box<Account<'info, TokenAccount>>,
  #[account(mut)]
  /// CHECK:
  pub tick_array_0: AccountInfo<'info>,
  #[account(mut)]
  /// CHECK:
  pub tick_array_1: AccountInfo<'info>,
  #[account(mut)]
  /// CHECK:
  pub tick_array_2: AccountInfo<'info>,
  /// CHECK:
  pub oracle: AccountInfo<'info>,
  pub token_program: Program<'info, Token>,
  pub pool_program_id: Program<'info, cpi::whirlpool::OrcaWhirlpool>,
}

impl<'info> Swap<'info> {
  pub fn swap_underlying_to_usdc(&self) -> Result<()> {
    self.swap(self.underlying_vault.amount, 0, true)?;
    Ok(())
  }

  pub fn swap_usdc_to_underlying(&self) -> Result<()> {
    self.swap(self.usdc_vault.amount, 0, false)?;
    Ok(())
  }

  fn is_a_to_b(&self) -> bool {
    self.whirlpool.token_mint_a == self.underlying_vault.mint
  }

  fn swap(&self, amount_in: u64, min_amount_out: u64, swap_a_to_b: bool) -> Result<()> {
    let a_to_b = self.is_a_to_b();
    let (token_a, token_b) = if a_to_b {
      (&self.underlying_vault, &self.usdc_vault)
    } else {
      (&self.usdc_vault, &self.underlying_vault)
    };
    let seeds = executor_seeds!(self.vault);
    let signer: &[&[&[u8]]] = &[&seeds[..]];
    let cpi = CpiContext::new_with_signer(
      self.pool_program_id.to_account_info(),
      cpi::whirlpool::OrcaWhirlpoolSwap {
        token_program: self.token_program.to_account_info(),
        token_authority: self.executor.to_account_info(),
        whirlpool: self.whirlpool.to_account_info(),
        token_owner_account_a: token_a.to_account_info(),
        token_owner_account_b: token_b.to_account_info(),
        token_vault_a: self.token_vault_a.to_account_info(),
        token_vault_b: self.token_vault_b.to_account_info(),
        tick_array_0: self.tick_array_0.to_account_info(),
        tick_array_1: self.tick_array_1.to_account_info(),
        tick_array_2: self.tick_array_2.to_account_info(),
        oracle: self.oracle.to_account_info(),
        pool_program_id: self.pool_program_id.to_account_info(),
      }, signer);


    let current_tick_index = self.whirlpool.tick_current_index;
    let sqrt_price_limit = if swap_a_to_b {
      sqrt_price_from_tick_index(
        current_tick_index - self.whirlpool.tick_spacing as i32
      )
    } else {
      sqrt_price_from_tick_index(
        current_tick_index + self.whirlpool.tick_spacing as i32
      )
    };


    cpi::whirlpool::orca_whirlpool_swap(
      cpi,
      amount_in,
      min_amount_out,
      sqrt_price_limit as u128,
      true,
      swap_a_to_b,
    )?;
    Ok(())
  }
}
