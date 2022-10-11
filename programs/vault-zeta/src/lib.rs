use anchor_lang::prelude::*;

mod cpi_calls;
mod instructions;
mod structs;
mod macros;
mod errors;

pub use instructions::*;
pub use macros::*;
pub use errors::*;

declare_id!("CXeQdAb6PZHSEwtHQNQafDSxpSfVhG9JWhebsrwzP1Q8");

#[program]
pub mod vault_zeta {
  use super::*;

  pub fn initialize(
    ctx: Context<InitializeVault>,
    deposit_limit: u64,
    management_fee_bps: u64
  ) -> Result<()> {
    initialize_vault(ctx, deposit_limit, management_fee_bps)
  }

  pub fn deposit(ctx: Context<DepositToVault>, amount_in: u64) -> Result<()> {
    ctx.accounts.deposit(amount_in)?;
    Ok(())
  }

  pub fn withdraw(ctx: Context<WithdrawFromVault>, amount_out: u64) -> Result<()> {
    ctx.accounts.withdraw(amount_out)?;
    Ok(())
  }

  // Manager tools
  pub fn init_open_orders(
    ctx: Context<InitOpenOrders>
  ) -> Result<()> {
    ctx.accounts.initialize_open_orders()
  }

  pub fn harvest_yield(ctx: Context<HarvestYield>) -> Result<()> {
    ctx.accounts.harvest_yield()
  }

  pub fn swap_to_usdc(ctx: Context<Swap>) -> Result<()> {
    ctx.accounts.swap_underlying_to_usdc()
  }

  pub fn swap_to_underlying(ctx: Context<Swap>) -> Result<()> {
    ctx.accounts.swap_usdc_to_underlying()
  }

  pub fn reinvest_zeta(ctx: Context<ReinvestZeta>) -> Result<()> {
    ctx.accounts.reinvest_zeta()
  }

  pub fn bid_order(
    ctx: Context<BidOrder>,
    price: u64,
    size: u64
  ) -> Result<()> {
    ctx.accounts.bid_order(price, size)?;
    Ok(())
  }

  pub fn redeem_zeta(ctx: Context<RedeemZeta>, amount_out: u64) -> Result<()> {
    ctx.accounts.redeem_zeta(amount_out)
  }

  pub fn reinvest_solend(ctx: Context<ReinvestSolend>) -> Result<()> {
    ctx.accounts.reinvest_solend()
  }
}
