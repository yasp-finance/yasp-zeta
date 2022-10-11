use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use crate::{cpi_calls as cpi, executor_seeds};
use crate::structs::Vault;

#[derive(Accounts)]
pub struct InitOpenOrders<'info> {
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
  /// CHECK: checked via external program
  pub state: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub zeta_group: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub dex_program: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub open_orders: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub margin_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub market: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub serum_authority: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub open_orders_map: AccountInfo<'info>,
  pub rent: Sysvar<'info, Rent>,
  pub system_program: Program<'info, System>,
  pub zeta_program: Program<'info, cpi::zeta::ZetaProgram>,
}

impl<'info> InitOpenOrders<'info> {
  pub fn initialize_open_orders(
    &self,
  ) -> Result<()> {
    let seeds = executor_seeds!(self.vault);
    cpi::zeta::zeta_client::initialize_open_orders(
      self.zeta_program.to_account_info(),
      cpi::zeta::InitializeOpenOrders {
        state: self.state.to_account_info(),
        margin_account: self.margin_account.to_account_info(),
        authority: self.executor.to_account_info(),
        payer: self.authority.clone(),
        market: self.market.to_account_info(),
        serum_authority:self.serum_authority.to_account_info(),
        open_orders_map: self.open_orders_map.to_account_info(),
        zeta_group: self.zeta_group.to_account_info(),
        dex_program: self.dex_program.to_account_info(),
        system_program: self.system_program.clone(),
        open_orders: self.open_orders.to_account_info(),
        rent: self.rent.clone(),
      },
      seeds
    )?;
    Ok(())
  }
}

