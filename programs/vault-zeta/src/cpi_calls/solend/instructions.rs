//! Instruction types

use anchor_lang::solana_program::{
  instruction::{Instruction},
  msg,
  program_error::ProgramError,
  pubkey::{Pubkey, PUBKEY_BYTES},
  sysvar,
};
use std::{convert::TryInto, mem::size_of};

/// Instructions supported by the lending program.
#[derive(Clone, Debug, PartialEq)]
pub enum LendingInstruction {
  // 0
  /// Initializes a new lending market.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Lending market account - uninitialized.
  ///   1. `[]` Rent sysvar.
  ///   2. `[]` Token program id.
  ///   3. `[]` Oracle program id.
  InitLendingMarket {
    /// Owner authority which can add new reserves
    owner: Pubkey,
    /// Currency market prices are quoted in
    /// e.g. "USD" null padded (`*b"USD\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"`) or SPL token mint pubkey
    quote_currency: [u8; 32],
  },

  // 1
  /// Sets the new owner of a lending market.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Lending market account.
  ///   1. `[signer]` Current owner.
  SetLendingMarketOwner {
    /// The new owner
    new_owner: Pubkey,
  },

  // 2
  /// Initializes a new lending market reserve.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source liquidity token account.
  ///                     $authority can transfer $liquidity_amount.
  ///   1. `[writable]` Destination collateral token account - uninitialized.
  ///   2. `[writable]` Reserve account - uninitialized.
  ///   3. `[]` Reserve liquidity SPL Token mint.
  ///   4. `[writable]` Reserve liquidity supply SPL Token account - uninitialized.
  ///   5. `[writable]` Reserve liquidity fee receiver - uninitialized.
  ///   6. `[writable]` Reserve collateral SPL Token mint - uninitialized.
  ///   7. `[writable]` Reserve collateral token supply - uninitialized.
  ///   8. `[]` Pyth product account.
  ///   9. `[]` Pyth price account.
  ///             This will be used as the reserve liquidity oracle account.
  ///   10 `[]` Lending market account.
  ///   11 `[]` Derived lending market authority.
  ///   12 `[signer]` Lending market owner.
  ///   13 `[signer]` User transfer authority ($authority).
  ///   14 `[]` Clock sysvar.
  ///   15 `[]` Rent sysvar.
  ///   16 `[]` Token program id.
  // InitReserve {
  //   /// Initial amount of liquidity to deposit into the new reserve
  //   liquidity_amount: u64,
  //   /// Reserve configuration values
  //   config: ReserveConfig,
  // },

  // 3
  /// Accrue interest and update market price of liquidity on a reserve.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Reserve account.
  ///   1. `[]` Reserve liquidity oracle account.
  ///             Must be the Pyth price account specified at InitReserve.
  ///   2. `[]` Clock sysvar.
  RefreshReserve,

  // 4
  /// Deposit liquidity into a reserve in exchange for collateral. Collateral represents a share
  /// of the reserve liquidity pool.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source liquidity token account.
  ///                     $authority can transfer $liquidity_amount.
  ///   1. `[writable]` Destination collateral token account.
  ///   2. `[writable]` Reserve account.
  ///   3. `[writable]` Reserve liquidity supply SPL Token account.
  ///   4. `[writable]` Reserve collateral SPL Token mint.
  ///   5. `[]` Lending market account.
  ///   6. `[]` Derived lending market authority.
  ///   7. `[signer]` User transfer authority ($authority).
  ///   8. `[]` Clock sysvar.
  ///   9. `[]` Token program id.
  DepositReserveLiquidity {
    /// Amount of liquidity to deposit in exchange for collateral tokens
    liquidity_amount: u64,
  },

  // 5
  /// Redeem collateral from a reserve in exchange for liquidity.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source collateral token account.
  ///                     $authority can transfer $collateral_amount.
  ///   1. `[writable]` Destination liquidity token account.
  ///   2. `[writable]` Reserve account.
  ///   3. `[writable]` Reserve collateral SPL Token mint.
  ///   4. `[writable]` Reserve liquidity supply SPL Token account.
  ///   5. `[]` Lending market account.
  ///   6. `[]` Derived lending market authority.
  ///   7. `[signer]` User transfer authority ($authority).
  ///   8. `[]` Clock sysvar.
  ///   9. `[]` Token program id.
  RedeemReserveCollateral {
    /// Amount of collateral tokens to redeem in exchange for liquidity
    collateral_amount: u64,
  },

  // 6
  /// Initializes a new lending market obligation.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Obligation account - uninitialized.
  ///   1. `[]` Lending market account.
  ///   2. `[signer]` Obligation owner.
  ///   3. `[]` Clock sysvar.
  ///   4. `[]` Rent sysvar.
  ///   5. `[]` Token program id.
  InitObligation,

  // 7
  /// Refresh an obligation's accrued interest and collateral and liquidity prices. Requires
  /// refreshed reserves, as all obligation collateral deposit reserves in order, followed by all
  /// liquidity borrow reserves in order.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Obligation account.
  ///   1. `[]` Clock sysvar.
  ///   .. `[]` Collateral deposit reserve accounts - refreshed, all, in order.
  ///   .. `[]` Liquidity borrow reserve accounts - refreshed, all, in order.
  RefreshObligation,

  // 8
  /// Deposit collateral to an obligation. Requires a refreshed reserve.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source collateral token account.
  ///                     Minted by deposit reserve collateral mint.
  ///                     $authority can transfer $collateral_amount.
  ///   1. `[writable]` Destination deposit reserve collateral supply SPL Token account.
  ///   2. `[]` Deposit reserve account - refreshed.
  ///   3. `[writable]` Obligation account.
  ///   4. `[]` Lending market account.
  ///   5. `[signer]` Obligation owner.
  ///   6. `[signer]` User transfer authority ($authority).
  ///   7. `[]` Clock sysvar.
  ///   8. `[]` Token program id.
  DepositObligationCollateral {
    /// Amount of collateral tokens to deposit
    collateral_amount: u64,
  },

  // 9
  /// Withdraw collateral from an obligation. Requires a refreshed obligation and reserve.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source withdraw reserve collateral supply SPL Token account.
  ///   1. `[writable]` Destination collateral token account.
  ///                     Minted by withdraw reserve collateral mint.
  ///   2. `[]` Withdraw reserve account - refreshed.
  ///   3. `[writable]` Obligation account - refreshed.
  ///   4. `[]` Lending market account.
  ///   5. `[]` Derived lending market authority.
  ///   6. `[signer]` Obligation owner.
  ///   7. `[]` Clock sysvar.
  ///   8. `[]` Token program id.
  WithdrawObligationCollateral {
    /// Amount of collateral tokens to withdraw - u64::MAX for up to 100% of deposited amount
    collateral_amount: u64,
  },

  // 10
  /// Borrow liquidity from a reserve by depositing collateral tokens. Requires a refreshed
  /// obligation and reserve.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source borrow reserve liquidity supply SPL Token account.
  ///   1. `[writable]` Destination liquidity token account.
  ///                     Minted by borrow reserve liquidity mint.
  ///   2. `[writable]` Borrow reserve account - refreshed.
  ///   3. `[writable]` Borrow reserve liquidity fee receiver account.
  ///                     Must be the fee account specified at InitReserve.
  ///   4. `[writable]` Obligation account - refreshed.
  ///   5. `[]` Lending market account.
  ///   6. `[]` Derived lending market authority.
  ///   7. `[signer]` Obligation owner.
  ///   8. `[]` Clock sysvar.
  ///   9. `[]` Token program id.
  ///   10 `[optional, writable]` Host fee receiver account.
  BorrowObligationLiquidity {
    /// Amount of liquidity to borrow - u64::MAX for 100% of borrowing power
    liquidity_amount: u64,
    // @TODO: slippage constraint - https://git.io/JmV67
  },

  // 11
  /// Repay borrowed liquidity to a reserve. Requires a refreshed obligation and reserve.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source liquidity token account.
  ///                     Minted by repay reserve liquidity mint.
  ///                     $authority can transfer $liquidity_amount.
  ///   1. `[writable]` Destination repay reserve liquidity supply SPL Token account.
  ///   2. `[writable]` Repay reserve account - refreshed.
  ///   3. `[writable]` Obligation account - refreshed.
  ///   4. `[]` Lending market account.
  ///   5. `[signer]` User transfer authority ($authority).
  ///   6. `[]` Clock sysvar.
  ///   7. `[]` Token program id.
  RepayObligationLiquidity {
    /// Amount of liquidity to repay - u64::MAX for 100% of borrowed amount
    liquidity_amount: u64,
  },

  // 12
  /// Repay borrowed liquidity to a reserve to receive collateral at a discount from an unhealthy
  /// obligation. Requires a refreshed obligation and reserves.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source liquidity token account.
  ///                     Minted by repay reserve liquidity mint.
  ///                     $authority can transfer $liquidity_amount.
  ///   1. `[writable]` Destination collateral token account.
  ///                     Minted by withdraw reserve collateral mint.
  ///   2. `[writable]` Repay reserve account - refreshed.
  ///   3. `[writable]` Repay reserve liquidity supply SPL Token account.
  ///   4. `[]` Withdraw reserve account - refreshed.
  ///   5. `[writable]` Withdraw reserve collateral supply SPL Token account.
  ///   6. `[writable]` Obligation account - refreshed.
  ///   7. `[]` Lending market account.
  ///   8. `[]` Derived lending market authority.
  ///   9. `[signer]` User transfer authority ($authority).
  ///   10 `[]` Clock sysvar.
  ///   11 `[]` Token program id.
  LiquidateObligation {
    /// Amount of liquidity to repay - u64::MAX for up to 100% of borrowed amount
    liquidity_amount: u64,
  },

  // 13
  /// Make a flash loan.
  ///
  /// Accounts expected by this instruction:
  ///
  ///   0. `[writable]` Source liquidity token account.
  ///                     Minted by reserve liquidity mint.
  ///                     Must match the reserve liquidity supply.
  ///   1. `[writable]` Destination liquidity token account.
  ///                     Minted by reserve liquidity mint.
  ///   2. `[writable]` Reserve account.
  ///   3. `[writable]` Flash loan fee receiver account.
  ///                     Must match the reserve liquidity fee receiver.
  ///   4. `[writable]` Host fee receiver.
  ///   5. `[]` Lending market account.
  ///   6. `[]` Derived lending market authority.
  ///   7. `[]` Token program id.
  ///   8. `[]` Flash loan receiver program id.
  ///             Must implement an instruction that has tag of 0 and a signature of `(amount: u64)`
  ///             This instruction must return the amount to the source liquidity account.
  ///   .. `[any]` Additional accounts expected by the receiving program's `ReceiveFlashLoan` instruction.
  ///
  ///   The flash loan receiver program that is to be invoked should contain an instruction with
  ///   tag `0` and accept the total amount (including fee) that needs to be returned back after
  ///   its execution has completed.
  ///
  ///   Flash loan receiver should have an instruction with the following signature:
  ///
  ///   0. `[writable]` Source liquidity (matching the destination from above).
  ///   1. `[writable]` Destination liquidity (matching the source from above).
  ///   2. `[]` Token program id
  ///   .. `[any]` Additional accounts provided to the lending program's `FlashLoan` instruction above.
  ///   ReceiveFlashLoan {
  ///       // Amount that must be repaid by the receiver program
  ///       amount: u64
  ///   }
  FlashLoan {
    /// The amount that is to be borrowed - u64::MAX for up to 100% of available liquidity
    amount: u64,
  },
}

impl LendingInstruction {
  /// Unpacks a byte buffer into a [LendingInstruction](enum.LendingInstruction.html).
  pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
    let (&tag, rest) = input
      .split_first()
      .ok_or(ProgramError::InvalidInstructionData).unwrap();
    Ok(match tag {
      0 => {
        let (owner, rest) = Self::unpack_pubkey(rest)?;
        let (quote_currency, _rest) = Self::unpack_bytes32(rest)?;
        Self::InitLendingMarket {
          owner,
          quote_currency: *quote_currency,
        }
      }
      1 => {
        let (new_owner, _rest) = Self::unpack_pubkey(rest)?;
        Self::SetLendingMarketOwner { new_owner }
      }
      2 => Self::RefreshReserve,
      3 => Self::RefreshReserve,
      4 => {
        let (liquidity_amount, _rest) = Self::unpack_u64(rest)?;
        Self::DepositReserveLiquidity { liquidity_amount }
      }
      5 => {
        let (collateral_amount, _rest) = Self::unpack_u64(rest)?;
        Self::RedeemReserveCollateral { collateral_amount }
      }
      6 => Self::InitObligation,
      7 => Self::RefreshObligation,
      8 => {
        let (collateral_amount, _rest) = Self::unpack_u64(rest)?;
        Self::DepositObligationCollateral { collateral_amount }
      }
      9 => {
        let (collateral_amount, _rest) = Self::unpack_u64(rest)?;
        Self::WithdrawObligationCollateral { collateral_amount }
      }
      10 => {
        let (liquidity_amount, _rest) = Self::unpack_u64(rest)?;
        Self::BorrowObligationLiquidity { liquidity_amount }
      }
      11 => {
        let (liquidity_amount, _rest) = Self::unpack_u64(rest)?;
        Self::RepayObligationLiquidity { liquidity_amount }
      }
      12 => {
        let (liquidity_amount, _rest) = Self::unpack_u64(rest)?;
        Self::LiquidateObligation { liquidity_amount }
      }
      13 => {
        let (amount, _rest) = Self::unpack_u64(rest)?;
        Self::FlashLoan { amount }
      }
      _ => {
        msg!("Instruction cannot be unpacked");
        return Err(ProgramError::InvalidInstructionData);
      }
    })
  }

  fn unpack_u64(input: &[u8]) -> Result<(u64, &[u8]), ProgramError> {
    if input.len() < 8 {
      msg!("u64 cannot be unpacked");
      return Err(ProgramError::InvalidInstructionData);
    }
    let (bytes, rest) = input.split_at(8);
    let value = bytes
      .get(..8)
      .and_then(|slice| slice.try_into().ok())
      .map(u64::from_le_bytes)
      .ok_or(ProgramError::InvalidInstructionData)?;
    Ok((value, rest))
  }

  // fn unpack_u8(input: &[u8]) -> Result<(u8, &[u8]), ProgramError> {
  //   if input.is_empty() {
  //     msg!("u8 cannot be unpacked");
  //     return Err(ProgramError::InvalidInstructionData);
  //   }
  //   let (bytes, rest) = input.split_at(1);
  //   let value = bytes
  //     .get(..1)
  //     .and_then(|slice| slice.try_into().ok())
  //     .map(u8::from_le_bytes)
  //     .ok_or(ProgramError::InvalidInstructionData)?;
  //   Ok((value, rest))
  // }

  fn unpack_bytes32(input: &[u8]) -> Result<(&[u8; 32], &[u8]), ProgramError> {
    if input.len() < 32 {
      msg!("32 bytes cannot be unpacked");
      return Err(ProgramError::InvalidInstructionData);
    }
    let (bytes, rest) = input.split_at(32);
    Ok((
      bytes
        .try_into()
        .map_err(|_| ProgramError::InvalidInstructionData)?,
      rest,
    ))
  }

  fn unpack_pubkey(input: &[u8]) -> Result<(Pubkey, &[u8]), ProgramError> {
    if input.len() < PUBKEY_BYTES {
      msg!("Pubkey cannot be unpacked");
      return Err(ProgramError::InvalidInstructionData);
    }
    let (key, rest) = input.split_at(PUBKEY_BYTES);
    let pk = Pubkey::new(key);
    Ok((pk, rest))
  }

  /// Packs a [LendingInstruction](enum.LendingInstruction.html) into a byte buffer.
  pub fn pack(&self) -> Vec<u8> {
    let mut buf = Vec::with_capacity(size_of::<Self>());
    match *self {
      Self::InitLendingMarket {
        owner,
        quote_currency,
      } => {
        buf.push(0);
        buf.extend_from_slice(owner.as_ref());
        buf.extend_from_slice(quote_currency.as_ref());
      }
      Self::SetLendingMarketOwner { new_owner } => {
        buf.push(1);
        buf.extend_from_slice(new_owner.as_ref());
      }
      Self::RefreshReserve => {
        buf.push(3);
      }
      Self::DepositReserveLiquidity { liquidity_amount } => {
        buf.push(4);
        buf.extend_from_slice(&liquidity_amount.to_le_bytes());
      }
      Self::RedeemReserveCollateral { collateral_amount } => {
        buf.push(5);
        buf.extend_from_slice(&collateral_amount.to_le_bytes());
      }
      Self::InitObligation => {
        buf.push(6);
      }
      Self::RefreshObligation => {
        buf.push(7);
      }
      Self::DepositObligationCollateral { collateral_amount } => {
        buf.push(8);
        buf.extend_from_slice(&collateral_amount.to_le_bytes());
      }
      Self::WithdrawObligationCollateral { collateral_amount } => {
        buf.push(9);
        buf.extend_from_slice(&collateral_amount.to_le_bytes());
      }
      Self::BorrowObligationLiquidity { liquidity_amount } => {
        buf.push(10);
        buf.extend_from_slice(&liquidity_amount.to_le_bytes());
      }
      Self::RepayObligationLiquidity { liquidity_amount } => {
        buf.push(11);
        buf.extend_from_slice(&liquidity_amount.to_le_bytes());
      }
      Self::LiquidateObligation { liquidity_amount } => {
        buf.push(12);
        buf.extend_from_slice(&liquidity_amount.to_le_bytes());
      }
      Self::FlashLoan { amount } => {
        buf.push(13);
        buf.extend_from_slice(&amount.to_le_bytes());
      }
    }
    buf
  }
}

