use std::borrow::Borrow;
use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use anchor_spl::mint::USDC;
use crate::{executor_seeds, cpi_calls as cpi};
use crate::cpi_calls::zeta::MarginAccount;
use crate::structs::Vault;

#[derive(Accounts)]
pub struct RedeemZeta<'info> {
  #[account(
  mut,
  has_one = authority,
  seeds = [b"vault", vault.reserve.as_ref(), zeta_group.key().as_ref(), authority.key().as_ref()],
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
  #[account(mut,
  token::mint = USDC,
  token::authority = executor
  )]
  pub usdc_vault: Box<Account<'info, TokenAccount>>,
  /// CHECK: Oracle is currently unused and will be enabled on subsequent updates
  pub oracle: UncheckedAccount<'info>,
  /// CHECK:
  pub zeta_group: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub zeta_vault: AccountInfo<'info>,
  /// CHECK:
  #[account(mut, address = vault.margin_account)]
  pub margin_account: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub socialized_loss_account: AccountInfo<'info>,
  /// CHECK:
  pub state: AccountInfo<'info>,
  /// CHECK:
  pub greeks: AccountInfo<'info>,
  pub token_program: Program<'info, Token>,
  pub zeta_program: Program<'info, cpi::zeta::ZetaProgram>,
}

impl<'info> RedeemZeta<'info> {
  pub fn redeem_zeta(&mut self, amount_out: u64) -> Result<()> {
    self.withdraw_zeta(amount_out)?;
    Ok(())
  }

  fn withdraw_zeta(&self, amount_out: u64) -> Result<()> {
    let seeds = executor_seeds!(self.vault);
    cpi::zeta::zeta_client::withdraw(
      self.zeta_program.to_account_info(),
      cpi::zeta::Withdraw {
        zeta_group: self.zeta_group.to_account_info(),
        margin_account: self.margin_account.to_account_info(),
        vault: self.zeta_vault.to_account_info(),
        user_token_account: self.usdc_vault.to_account_info(),
        socialized_loss_account:  self.socialized_loss_account.to_account_info(),
        authority: self.executor.to_account_info(),
        token_program: self.token_program.clone(),
        state: self.state.to_account_info(),
        greeks: self.greeks.to_account_info(),
        oracle: self.oracle.to_account_info(),
      },
      amount_out,
      seeds
    )?;
    Ok(())
  }
}
