use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use anchor_spl::mint::USDC;
use crate::{cpi_calls as cpi, executor_seeds};
use crate::structs::Vault;

#[derive(Accounts)]
pub struct InitializeVault<'info> {
  #[account(
  init,
  space = 8 + Vault::MAXIMUM_SIZE,
  payer = authority,
  seeds = [b"vault", reserve.key().as_ref(), authority.key().as_ref()],
  bump
  )]
  pub vault: Box<Account<'info, Vault>>,
  #[account(
  init,
  payer = authority,
  mint::decimals = 9,
  mint::authority = vault,
  seeds = [b"shares", vault.key().as_ref()],
  bump
  )]
  pub shares_mint: Box<Account<'info, Mint>>,
  /// CHECK:
  #[account(
  seeds = [b"executor", vault.key().as_ref()],
  bump
  )]
  pub executor: AccountInfo<'info>,
  #[account(
    token::mint = reserve.collateral.mint_pubkey,
    token::authority = executor.key()
  )]
  pub collateral_vault: Box<Account<'info, TokenAccount>>,
  #[account(
  token::mint = USDC,
  token::authority = executor.key()
  )]
  pub reward_vault: Box<Account<'info, TokenAccount>>,
  pub reserve: Box<Account<'info, cpi::solend::Reserve>>,
  #[account(mut)]
  pub authority: Signer<'info>,
  /// CHECK:
  #[account(mut)]
  pub margin_account: AccountInfo<'info>,
  /// CHECK:
  pub zeta_group: AccountInfo<'info>,
  pub zeta_program: Program<'info, cpi::zeta::ZetaProgram>,
  pub rent: Sysvar<'info, Rent>,
  pub token_program: Program<'info, Token>,
  pub system_program: Program<'info, System>,
}

impl<'info> InitializeVault<'info> {
  fn init_vault(
    &mut self,
    bump: u8,
    mint_bump: u8,
    executor_bump: u8,
    deposit_limit: u64,
    management_fee_bps: u64,
  ) -> Result<()> {
    let clock = Clock::get()?;
    let now = clock.unix_timestamp;

    self.vault.initialize(
      now,
      bump,
      mint_bump,
      executor_bump,
      self.authority.key(),
      self.reserve.key(),
      self.collateral_vault.key(),
      self.reward_vault.key(),
      self.reward_vault.key(),
      deposit_limit,
      management_fee_bps,
    )

  }

  fn create_margin_account(
    &self,
  ) -> Result<()> {
    let seeds = executor_seeds!(self.vault);
    cpi::zeta::zeta_client::initialize_margin_account(
      self.zeta_program.to_account_info(),
      cpi::zeta::InitializeMarginAccount {
        margin_account: self.margin_account.to_account_info(),
        authority: self.authority.clone(),
        payer: self.authority.clone(),
        zeta_group: self.zeta_group.to_account_info(),
        system_program: self.system_program.clone(),
        zeta_program: self.zeta_program.to_account_info()
      },
      seeds
    )?;
    Ok(())
  }
}


pub fn initialize_vault(
  ctx: Context<InitializeVault>,
  deposit_limit: u64,
  management_fee_bps: u64,
) -> Result<()> {
  ctx.accounts.init_vault(
    *ctx.bumps.get("vault").unwrap(),
    *ctx.bumps.get("shares_mint").unwrap(),
    *ctx.bumps.get("executor").unwrap(),
    deposit_limit,
    management_fee_bps,
  )?;
  ctx.accounts.create_margin_account()?;
  Ok(())
}


