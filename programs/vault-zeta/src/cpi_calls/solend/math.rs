//! Math for preserving precision of token amounts which are limited
//! by the SPL Token program to be at most u64::MAX.
//!
//! Decimals are internally scaled by a WAD (10^18) to preserve
//! precision up to 18 decimal places. Decimals are sized to support
//! both serialization and precise math for the full range of
//! unsigned 64-bit integers. The underlying representation is a
//! u192 rather than u256 to reduce compute cost while losing
//! support for arithmetic operations at the high end of u64 range.

#![allow(clippy::assign_op_pattern)]
#![allow(clippy::ptr_offset_with_cast)]
#![allow(clippy::manual_range_contains)]

use std::{convert::TryFrom, fmt};
use anchor_lang::prelude::ProgramError;
use uint::construct_uint;


/// Scale of precision
pub const SCALE: usize = 18;
/// Identity
pub const WAD: u64 = 1_000_000_000_000_000_000;
/// Half of identity
pub const HALF_WAD: u64 = 500_000_000_000_000_000;
/// Scale for percentages
pub const PERCENT_SCALER: u64 = 10_000_000_000_000_000;

/// Try to subtract, return an error on underflow
pub trait TrySub: Sized {
  /// Subtract
  fn try_sub(self, rhs: Self) -> Result<Self, ProgramError>;
}

/// Try to subtract, return an error on overflow
pub trait TryAdd: Sized {
  /// Add
  fn try_add(self, rhs: Self) -> Result<Self, ProgramError>;
}

/// Try to divide, return an error on overflow or divide by zero
pub trait TryDiv<RHS>: Sized {
  /// Divide
  fn try_div(self, rhs: RHS) -> Result<Self, ProgramError>;
}

/// Try to multiply, return an error on overflow
pub trait TryMul<RHS>: Sized {
  /// Multiply
  fn try_mul(self, rhs: RHS) -> Result<Self, ProgramError>;
}

// U192 with 192 bits consisting of 3 x 64-bit words
construct_uint! {
    pub struct U192(3);
}

/// Large decimal values, precise to 18 digits
#[derive(Clone, Copy, Debug, Default, PartialEq, PartialOrd, Eq, Ord)]
pub struct Decimal(pub U192);

impl Decimal {
  /// One
  pub fn one() -> Self {
    Self(Self::wad())
  }

  /// Zero
  pub fn zero() -> Self {
    Self(U192::zero())
  }

  // OPTIMIZE: use const slice when fixed in BPF toolchain
  fn wad() -> U192 {
    U192::from(WAD)
  }

  // OPTIMIZE: use const slice when fixed in BPF toolchain
  fn half_wad() -> U192 {
    U192::from(HALF_WAD)
  }

  /// Create scaled decimal from percent value
  pub fn from_percent(percent: u8) -> Self {
    Self(U192::from(percent as u64 * PERCENT_SCALER))
  }

  /// Return raw scaled value if it fits within u128
  #[allow(clippy::wrong_self_convention)]
  pub fn to_scaled_val(&self) -> anchor_lang::prelude::Result<u128> {
    Ok(u128::try_from(self.0).unwrap())
  }

  /// Create decimal from scaled value
  pub fn from_scaled_val(scaled_val: u128) -> Self {
    Self(U192::from(scaled_val))
  }

  /// Round scaled decimal to u64
  pub fn try_round_u64(&self) -> anchor_lang::prelude::Result<u64> {
    let rounded_val = Self::half_wad()
      .checked_add(self.0)
      .unwrap()
      .checked_div(Self::wad())
      .unwrap();
    Ok(u64::try_from(rounded_val).unwrap())
  }

  /// Ceiling scaled decimal to u64
  pub fn try_ceil_u64(&self) -> anchor_lang::prelude::Result<u64> {
    let ceil_val = Self::wad()
      .checked_sub(U192::from(1u64))
      .unwrap()
      .checked_add(self.0)
      .unwrap()
      .checked_div(Self::wad())
      .unwrap();
    Ok(u64::try_from(ceil_val).unwrap())
  }

  /// Floor scaled decimal to u64
  pub fn try_floor_u64(&self) -> anchor_lang::prelude::Result<u64> {
    let ceil_val = self
      .0
      .checked_div(Self::wad())
      .unwrap();
    Ok(u64::try_from(ceil_val).unwrap())
  }
}

impl fmt::Display for Decimal {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    let mut scaled_val = self.0.to_string();
    if scaled_val.len() <= SCALE {
      scaled_val.insert_str(0, &vec!["0"; SCALE - scaled_val.len()].join(""));
      scaled_val.insert_str(0, "0.");
    } else {
      scaled_val.insert(scaled_val.len() - SCALE, '.');
    }
    f.write_str(&scaled_val)
  }
}

impl From<u64> for Decimal {
  fn from(val: u64) -> Self {
    Self(Self::wad() * U192::from(val))
  }
}

impl From<u128> for Decimal {
  fn from(val: u128) -> Self {
    Self(Self::wad() * U192::from(val))
  }
}

impl TryAdd for Decimal {
  fn try_add(self, rhs: Self) -> Result<Self, ProgramError> {
    Ok(Self(
      self.0
        .checked_add(rhs.0)
        .unwrap(),
    ))
  }
}

impl TrySub for Decimal {
  fn try_sub(self, rhs: Self) -> Result<Self, ProgramError> {
    Ok(Self(
      self.0
        .checked_sub(rhs.0)
        .unwrap(),
    ))
  }
}

impl TryDiv<u64> for Decimal {
  fn try_div(self, rhs: u64) -> Result<Self, ProgramError> {
    Ok(Self(
      self.0
        .checked_div(U192::from(rhs))
        .unwrap(),
    ))
  }
}

impl TryDiv<Decimal> for Decimal {
  fn try_div(self, rhs: Self) -> Result<Self, ProgramError> {
    Ok(Self(
      self.0
        .checked_mul(Self::wad())
        .unwrap()
        .checked_div(rhs.0)
        .unwrap(),
    ))
  }
}

impl TryMul<u64> for Decimal {
  fn try_mul(self, rhs: u64) -> Result<Self, ProgramError> {
    Ok(Self(
      self.0
        .checked_mul(U192::from(rhs))
        .unwrap(),
    ))
  }
}

impl TryMul<Decimal> for Decimal {
  fn try_mul(self, rhs: Self) -> Result<Self, ProgramError> {
    Ok(Self(
      self.0
        .checked_mul(rhs.0)
        .unwrap()
        .checked_div(Self::wad())
        .unwrap(),
    ))
  }
}
