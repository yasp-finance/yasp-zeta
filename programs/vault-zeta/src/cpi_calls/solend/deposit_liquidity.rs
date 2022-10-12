use anchor_lang::prelude::*;
use anchor_lang::solana_program::instruction::Instruction;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::pubkey::PUBKEY_BYTES;
use anchor_spl::token::TokenAccount;
use super::instructions::LendingInstruction;

#[allow(clippy::too_many_arguments)]
pub fn deposit_reserve_liquidity(
  program_id: Pubkey,
  liquidity_amount: u64,
  source_liquidity_pubkey: Pubkey,
  destination_collateral_pubkey: Pubkey,
  reserve_pubkey: Pubkey,
  reserve_liquidity_supply_pubkey: Pubkey,
  reserve_collateral_mint_pubkey: Pubkey,
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
      AccountMeta::new(source_liquidity_pubkey, false),
      AccountMeta::new(destination_collateral_pubkey, false),
      AccountMeta::new(reserve_pubkey, false),
      AccountMeta::new(reserve_liquidity_supply_pubkey, false),
      AccountMeta::new(reserve_collateral_mint_pubkey, false),
      AccountMeta::new_readonly(lending_market_pubkey, false),
      AccountMeta::new_readonly(lending_market_authority_pubkey, false),
      AccountMeta::new_readonly(user_transfer_authority_pubkey, true),
      AccountMeta::new_readonly(token_program_id, false),
    ],
    data: LendingInstruction::DepositReserveLiquidity { liquidity_amount }.pack(),
  }
}

#[derive(Accounts)]
pub struct DepositReserveLiquidity<'info> {
  /// CHECK:
  #[account(mut)]
  pub source_liquidity: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub destination_collateral: Account<'info, TokenAccount>,
  /// CHECK:
  #[account(mut)]
  pub reserve: AccountInfo<'info>,
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
  /// CHECK:
  #[account(signer)]
  pub user_transfer_authority: AccountInfo<'info>,
  /// CHECK:
  pub token_program: AccountInfo<'info>,
  /// CHECK:
  pub lending_program: AccountInfo<'info>,
}

pub fn handler_signed<'a, 'b, 'c, 'info>(
  ctx: CpiContext<'a, 'b, 'c, 'info, DepositReserveLiquidity<'info>>,
  liquidity_amount: u64,
) -> Result<u64> {
  let ix = deposit_reserve_liquidity(
    ctx.accounts.lending_program.key(),
    liquidity_amount,
    ctx.accounts.source_liquidity.key(),
    ctx.accounts.destination_collateral.key(),
    ctx.accounts.reserve.key(),
    ctx.accounts.reserve_liquidity_supply.key(),
    ctx.accounts.reserve_collateral_mint.key(),
    ctx.accounts.lending_market.key(),
    ctx.accounts.user_transfer_authority.key(),
    ctx.accounts.token_program.key(),
  );

  let accounts = [
    ctx.accounts.source_liquidity.to_account_info(),
    ctx.accounts.destination_collateral.to_account_info(),
    ctx.accounts.reserve.to_account_info(),
    ctx.accounts.reserve_liquidity_supply.to_account_info(),
    ctx.accounts.reserve_collateral_mint.to_account_info(),
    ctx.accounts.lending_market.to_account_info(),
    ctx.accounts.lending_market_authority.to_account_info(),
    ctx.accounts.user_transfer_authority.to_account_info(),
    ctx.accounts.token_program.to_account_info(),
  ];
  let initial_collateral = ctx.accounts.destination_collateral.amount;
  invoke_signed(
    &ix,
    &accounts,
    &ctx.signer_seeds,
  )?;
  let collateral_increased = ctx.accounts.destination_collateral.amount
    .checked_sub(initial_collateral).unwrap();
  Ok(collateral_increased)
}

