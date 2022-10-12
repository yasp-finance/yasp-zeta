pub mod solend_program {
  anchor_lang::prelude::declare_id!("So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo"); // mainnet
  // anchor_lang::prelude::declare_id!("ALend7Ketfx5bxh6ghsCDXAoDrhvEmsXT3cynB6aPLgx"); // devnet
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
