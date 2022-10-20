pub mod zeta_program {
  // anchor_lang::prelude::declare_id!("ZETAxsqBRek56DhiGXrn75yj2NHU3aYUnxvHXpkf3aD"); // mainnet
  anchor_lang::prelude::declare_id!("BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7"); // devnet
}

pub use zeta_usdc::ID as USDC;
mod zeta_usdc {
  // anchor_lang::prelude::declare_id!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
  anchor_lang::prelude::declare_id!("6PEh8n3p7BbCTykufbq1nSJYAZvUp6gSwEANAs1ZhsCX");
}

pub mod pyth_client;
pub mod zeta_client;
mod zeta_calculations;
mod zeta_account;
mod zeta_utils;
mod zeta_context;
mod zeta_constants;

pub use zeta_calculations::*;
pub use zeta_account::*;
pub use zeta_utils::*;
pub use zeta_context::*;
pub use zeta_constants::*;
