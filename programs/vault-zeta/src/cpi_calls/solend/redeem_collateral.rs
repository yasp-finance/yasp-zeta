use anchor_lang::prelude::*;
use anchor_lang::solana_program::instruction::Instruction;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::pubkey::PUBKEY_BYTES;
use anchor_spl::token::{TokenAccount};
use super::instructions::LendingInstruction;

#[allow(clippy::too_many_arguments)]
pub fn redeem_reserve_collateral(
  program_id: Pubkey,
  collateral_amount: u64,
  source_collateral_pubkey: Pubkey,
  destination_liquidity_pubkey: Pubkey,
  reserve_pubkey: Pubkey,
  reserve_collateral_mint_pubkey: Pubkey,
  reserve_liquidity_supply_pubkey: Pubkey,
  lending_market_pubkey: Pubkey,
  user_transfer_authority_pubkey: Pubkey,
  token_program_id: Pubkey,
) -> Instruction {
  let (lending_market_authority_pubkey, _bump_seed) = Pubkey::find_program_address(
    &[&lending_market_pubkey.to_bytes()[..PUBKEY_BYTES]],
    &program_id,
  );
  Instruction {
    program_id,
    accounts: vec![
      AccountMeta::new(source_collateral_pubkey, false),
      AccountMeta::new(destination_liquidity_pubkey, false),
      AccountMeta::new(reserve_pubkey, false),
      AccountMeta::new(reserve_collateral_mint_pubkey, false),
      AccountMeta::new(reserve_liquidity_supply_pubkey, false),
      AccountMeta::new_readonly(lending_market_pubkey, false),
      AccountMeta::new_readonly(lending_market_authority_pubkey, false),
      AccountMeta::new_readonly(user_transfer_authority_pubkey, true),
      AccountMeta::new_readonly(token_program_id, false),
    ],
    data: LendingInstruction::RedeemReserveCollateral { collateral_amount }.pack(),
  }
}

#[derive(Accounts)]
pub struct RedeemReserveCollateral<'info> {
  #[account(mut)]
  pub source_collateral: Account<'info, TokenAccount>,
  #[account(mut)]
  pub destination_liquidity: Account<'info, TokenAccount>,
  /// CHECK:
  #[account(mut)]
  pub reserve: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub reserve_collateral_mint: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub reserve_liquidity_supply: AccountInfo<'info>,
  /// CHECK:
  pub lending_market: AccountInfo<'info>,
  /// CHECK:
  pub lending_market_authority: AccountInfo<'info>,
  /// CHECK:
  #[account(signer)]
  pub user_transfer_authority: AccountInfo<'info>,
  /// CHECK:
  pub token_program: AccountInfo<'info>,
  /// CHECK:
  pub lending_program: AccountInfo<'info>,
}

pub fn handler_signed<'a, 'b, 'c, 'info>(
  ctx: CpiContext<'a, 'b, 'c, 'info, RedeemReserveCollateral<'info>>,
  liquidity_amount: u64,
) -> Result<u64> {
  let ix = redeem_reserve_collateral(
    ctx.accounts.lending_program.key(),
    liquidity_amount,
    ctx.accounts.source_collateral.key(),
    ctx.accounts.destination_liquidity.key(),
    ctx.accounts.reserve.key(),
    ctx.accounts.reserve_collateral_mint.key(),
    ctx.accounts.reserve_liquidity_supply.key(),
    ctx.accounts.lending_market.key(),
    ctx.accounts.user_transfer_authority.key(),
    ctx.accounts.token_program.key(),
  );

  let accounts = [
    ctx.accounts.lending_program.to_account_info(),
    ctx.accounts.source_collateral.to_account_info(),
    ctx.accounts.destination_liquidity.to_account_info(),
    ctx.accounts.reserve.to_account_info(),
    ctx.accounts.reserve_collateral_mint.to_account_info(),
    ctx.accounts.reserve_liquidity_supply.to_account_info(),
    ctx.accounts.lending_market.to_account_info(),
    ctx.accounts.user_transfer_authority.to_account_info(),
    ctx.accounts.lending_market_authority.to_account_info(),
    ctx.accounts.token_program.to_account_info()
  ];

  let initial_liquidity = ctx.accounts.destination_liquidity.amount;
  invoke_signed(
    &ix,
    &accounts,
    &ctx.signer_seeds,
  )?;
  let liquidity_increased = ctx.accounts.destination_liquidity.amount
    .checked_sub(initial_liquidity).unwrap();
  Ok(liquidity_increased)
}



