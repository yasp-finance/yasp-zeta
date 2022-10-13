use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use anchor_spl::mint::USDC;
use serum_dex::critbit::{LeafNode, SlabView};
use serum_dex::state::{Market};
use crate::{executor_seeds, cpi_calls as cpi};
use crate::cpi_calls::zeta::{MarketAccounts, ZetaGroup};
use crate::structs::Vault;

#[derive(Accounts)]
pub struct BidOrder<'info> {
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
  /// CHECK: Oracle is currently unused and will be enabled on subsequent updates
  pub oracle: AccountInfo<'info>,
  /// CHECK:
  pub zeta_group: AccountInfo<'info>,
  /// CHECK:
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
  #[account(mut)]
  pub market: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub request_queue: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub event_queue: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub bids: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub asks: AccountInfo<'info>,
  // Also known as the "base" currency. For a given A/B market,
  // this is the vault for the A mint.
  /// CHECK:
  #[account(mut)]
  pub coin_vault: Box<Account<'info, TokenAccount>>,
  // Also known as the "quote" currency. For a given A/B market,
  // this is the vault for the B mint.
  /// CHECK:
  #[account(mut)]
  pub pc_vault: Box<Account<'info, TokenAccount>>,
  // User wallets, used for settling.
  /// CHECK:
  #[account(mut)]
  pub coin_wallet: Box<Account<'info, TokenAccount>>,
  /// CHECK:
  #[account(mut)]
  pub pc_wallet: Box<Account<'info, TokenAccount>>,
  /// CHECK:
  pub dex_program: AccountInfo<'info>,
  /// CHECK:
  pub serum_authority: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub greeks: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub open_orders: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub market_node: AccountInfo<'info>,
  /// CHECK:
  #[account(mut)]
  pub market_mint: AccountInfo<'info>,
  /// CHECK:
  pub mint_authority: AccountInfo<'info>,
  pub rent: Sysvar<'info, Rent>,
  pub token_program: Program<'info, Token>,
  pub zeta_program: Program<'info, cpi::zeta::ZetaProgram>,
}

impl<'info> BidOrder<'info> {
  // pub fn buy_put(&self, strike_price: u64, size: u64) -> Result<()> {
  //   self.bid_order(strike_price, size)?;
  //   Ok(())
  // }

  fn calculate_order(&self, max_amount: u64) -> Result<(u64, u64)> {
    let market_info = self.market.to_account_info();
    let bids = self.bids.to_account_info();
    let dex_program = self.dex_program.key();

    let market = Market::load(
      &market_info,
      &dex_program,
      false
    ).unwrap();

    let bids = market
      .load_bids_mut(&bids).unwrap();
    let best_price = bids
      .find_max().unwrap();
    let best_price_node = bids
      .get(best_price as u32).unwrap()
      .as_leaf().unwrap();

    let price = best_price_node.price().get();
    let size = max_amount
      .checked_div(price).unwrap();
    Ok((price, size))
  }

  pub fn bid_order(&self) -> Result<()> {
    let seeds = executor_seeds!(self.vault);
    let accounts = cpi::zeta::PlaceOrder {
      zeta_group: self.zeta_group.to_account_info(),
      margin_account: self.margin_account.to_account_info(),
      authority: self.executor.to_account_info(),
      token_program: self.token_program.clone(),
      state: self.state.to_account_info(),
      greeks: self.greeks.to_account_info(),
      market_accounts: MarketAccounts {
        market: self.market.to_account_info(),
        request_queue: self.request_queue.to_account_info(),
        event_queue: self.event_queue.to_account_info(),
        bids: self.bids.to_account_info(),
        asks: self.asks.to_account_info(),
        order_payer_token_account: self.pc_vault.to_account_info(),
        coin_vault: self.coin_vault.to_account_info(),
        pc_vault: self.pc_vault.to_account_info(),
        coin_wallet: self.coin_wallet.to_account_info(),
        pc_wallet: self.pc_wallet.to_account_info()
      },
      oracle: self.oracle.to_account_info(),
      open_orders: self.open_orders.to_account_info(),
      rent: self.rent.clone(),
      market_node: self.market_node.to_account_info(),
      market_mint: self.market_mint.to_account_info(),
      mint_authority: self.mint_authority.to_account_info(),
      serum_authority: self.serum_authority.to_account_info(),
      dex_program: self.dex_program.to_account_info(),
    };

    let (price, size) = self
      .calculate_order(self.pc_wallet.amount)
      .unwrap();
    msg!("wallet: {}", self.pc_wallet.amount);
    msg!("price: {}", price);
    msg!("size: {}", size);
    cpi::zeta::zeta_client::place_order(
      self.zeta_program.to_account_info(),
      accounts,
      price,
      size,
      cpi::zeta::Side::Bid,
      None,
      seeds
    )?;
    Ok(())
  }
}
