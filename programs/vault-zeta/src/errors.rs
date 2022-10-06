use anchor_lang::prelude::*;

#[error_code]
pub enum VaultError {
  #[msg("Crank denied")]
  CrankDenied,
  #[msg("Harvest denied")]
  HarvestDenied,
  #[msg("too much shares")]
  SharesOverflow,
  #[msg("Vault have reached his deposit limit")]
  VaultIsFull,
  #[msg("Attempts to deposit 0 liquidity to Vault")]
  ZeroDeposit,
  #[msg("Attempts to withdraw 0 shares")]
  ZeroWithdraw,
  #[msg("Cranker doesn't participate in current snapshot")]
  CrankerNotFound,
  #[msg("Attempt to swap 0 rewards")]
  ZeroBalanceSwap,
  #[msg("You can exit only if position is out of money")]
  UnexpectedExit,
  #[msg("Deposit is disabled")]
  DepositDisabled,
  #[msg("Vault is closed, use emergency_withdraw method")]
  UseEmergencyWithdraw,
}
