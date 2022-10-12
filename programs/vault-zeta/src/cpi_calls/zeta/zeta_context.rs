use super::*;
use anchor_spl::token::Token;
use anchor_lang::prelude::*;

/// Zeta Context
/// Leave this as is, it defines the instruction context for the zeta program
#[derive(Accounts, Clone)]
pub struct InitializeMarginAccount<'info> {
  /// CHECK: checked via external program
  #[account(mut)]
  pub margin_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(signer)]
  pub authority: AccountInfo<'info>,
  #[account(mut)]
  pub payer: Signer<'info>,
  /// CHECK: checked via external program
  pub zeta_program: AccountInfo<'info>,
  pub system_program: Program<'info, System>,
  /// CHECK: checked via external program
  pub zeta_group: AccountInfo<'info>,
}

#[derive(Accounts, Clone)]
pub struct Deposit<'info> {
  /// CHECK: checked via external program
  pub zeta_group: AccountInfo<'info>,
  #[account(mut)]
  /// CHECK: checked via external program
  pub margin_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub vault: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub user_token_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub socialized_loss_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(signer)]
  pub authority: AccountInfo<'info>,
  pub token_program: Program<'info, Token>,
  /// CHECK: checked via external program
  pub state: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub greeks: AccountInfo<'info>,
}

#[derive(Accounts, Clone)]
pub struct Withdraw<'info> {
  /// CHECK: checked via external program
  pub state: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub zeta_group: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub vault: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub margin_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub user_token_account: AccountInfo<'info>,
  pub token_program: Program<'info, Token>,
  /// CHECK: checked via external program
  #[account(signer)]
  pub authority: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub greeks: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub oracle: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub socialized_loss_account: AccountInfo<'info>,
}

#[derive(Accounts, Clone)]
pub struct InitializeOpenOrders<'info> {
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
  #[account(signer)]
  pub authority: AccountInfo<'info>,
  #[account(mut)]
  pub payer: Signer<'info>,
  /// CHECK: checked via external program
  pub market: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub serum_authority: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub open_orders_map: AccountInfo<'info>,
  pub rent: Sysvar<'info, Rent>,
  pub system_program: Program<'info, System>,
}

// Market accounts are the accounts used to place orders against the dex minus
// common accounts, i.e., program ids, sysvars, and the `pc_wallet`.
#[derive(Accounts, Clone)]
pub struct MarketAccounts<'info> {
  /// CHECK: checked via external program
  #[account(mut)]
  pub market: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub request_queue: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub event_queue: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub bids: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub asks: AccountInfo<'info>,
  // The `spl_token::Account` that funds will be taken from, i.e., transferred
  // from the user into the market's vault.
  //
  // For bids, this is the base currency. For asks, the quote.
  // This has to be owned by serum_authority PDA as serum checks that the owner
  // of open orders also owns this token account
  /// CHECK: checked via external program
  #[account(mut)]
  pub order_payer_token_account: AccountInfo<'info>,
  // Also known as the "base" currency. For a given A/B market,
  // this is the vault for the A mint.
  /// CHECK: checked via external program
  #[account(mut)]
  pub coin_vault: AccountInfo<'info>,
  // Also known as the "quote" currency. For a given A/B market,
  // this is the vault for the B mint.
  /// CHECK: checked via external program
  #[account(mut)]
  pub pc_vault: AccountInfo<'info>,
  // User wallets, used for settling.
  /// CHECK: checked via external program
  #[account(mut)]
  pub coin_wallet: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub pc_wallet: AccountInfo<'info>,
}

#[derive(Accounts, Clone)]
pub struct PlaceOrder<'info> {
  /// CHECK: checked via external program
  pub state: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub zeta_group: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub margin_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(signer)]
  pub authority: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub dex_program: AccountInfo<'info>,
  pub token_program: Program<'info, Token>,
  /// CHECK: checked via external program
  pub serum_authority: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub greeks: AccountInfo<'info>,
  #[account(mut)]
  /// CHECK: checked via external program
  pub open_orders: AccountInfo<'info>,
  pub rent: Sysvar<'info, Rent>,
  pub market_accounts: MarketAccounts<'info>,
  /// CHECK: checked via external program
  pub oracle: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub market_node: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub market_mint: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub mint_authority: AccountInfo<'info>,
}

// Shared accounts required for cancel order
#[derive(Accounts, Clone)]
pub struct CancelAccounts<'info> {
  /// CHECK: checked via external program
  pub zeta_group: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub state: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub margin_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub dex_program: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub serum_authority: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub open_orders: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub market: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub bids: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub asks: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub event_queue: AccountInfo<'info>,
}

#[derive(Accounts, Clone)]
pub struct CancelOrder<'info> {
  /// CHECK: checked via external program
  #[account(signer)]
  pub authority: AccountInfo<'info>,
  pub cancel_accounts: CancelAccounts<'info>,
}

#[derive(Accounts, Clone)]
pub struct Liquidate<'info> {
  /// CHECK: checked via external program
  pub state: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(signer)]
  pub authority: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub liquidator_margin_account: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub greeks: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub oracle: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub market: AccountInfo<'info>,
  /// CHECK: checked via external program
  pub zeta_group: AccountInfo<'info>,
  /// CHECK: checked via external program
  #[account(mut)]
  pub liquidated_margin_account: AccountInfo<'info>,
}
