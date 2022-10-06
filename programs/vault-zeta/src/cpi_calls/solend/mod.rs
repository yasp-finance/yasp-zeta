pub mod solend_program {
  anchor_lang::prelude::declare_id!("LendZqTs7gn5CTSJU1jWKhKuVpjJGom45nnwPb2AMTi"); // mainnet
  // anchor_lang::solana_program::declare_id!("LendZqTs7gn5CTSJU1jWKhKuVpjJGom45nnwPb2AMTi"); // devnet
}

mod deposit_liquidity;
mod redeem_collateral;
mod instructions;
mod states;
mod math;

pub use deposit_liquidity::DepositReserveLiquidity;
pub use deposit_liquidity::handler_signed as deposit_liquidity;
pub use redeem_collateral::RedeemReserveCollateral;
pub use redeem_collateral::handler_signed as redeem_collateral;
pub use states::*;
pub use math::*;
