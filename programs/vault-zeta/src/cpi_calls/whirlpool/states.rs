use std::ops::Deref;
use std::u64;
use anchor_lang::prelude::*;
use arrayref::{array_ref, array_refs};
use anchor_lang::solana_program::program_pack::{IsInitialized, Pack, Sealed};
use super::orca_whirlpool;

#[derive(Clone)]
pub struct OrcaWhirlpool;

impl anchor_lang::Id for OrcaWhirlpool {
  fn id() -> Pubkey {
    orca_whirlpool::ID
  }
}

#[derive(Copy, Clone, AnchorSerialize, AnchorDeserialize, Default, Debug, PartialEq)]
pub struct WhirlpoolRewardInfo {
  /// Reward token mint.
  pub mint: Pubkey,
  /// Reward vault token account.
  pub vault: Pubkey,
  /// Authority account that has permission to initialize the reward and set emissions.
  pub authority: Pubkey,
  /// Q64.64 number that indicates how many tokens per second are earned per unit of liquidity.
  pub emissions_per_second_x64: u128,
  /// Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward
  /// emissions were turned on.
  pub growth_global_x64: u128,
}

#[repr(C)]
#[derive(Clone, Copy, Debug, Default, PartialEq)]
pub struct WhirlpoolState {
  pub whirlpools_config: Pubkey,
  pub whirlpool_bump: [u8; 1],

  pub tick_spacing: u16,
  pub tick_spacing_seed: [u8; 2],

  // Stored as hundredths of a basis point
  // u16::MAX corresponds to ~6.5%
  pub fee_rate: u16,

  // Denominator for portion of fee rate taken (1/x)%
  pub protocol_fee_rate: u16,

  // Maximum amount that can be held by Solana account
  pub liquidity: u128,

  // MAX/MIN at Q32.64, but using Q64.64 for rounder bytes
  // Q64.64
  pub sqrt_price: u128,
  pub tick_current_index: i32,

  pub protocol_fee_owed_a: u64,
  pub protocol_fee_owed_b: u64,

  pub token_mint_a: Pubkey,
  pub token_vault_a: Pubkey,

  // Q64.64
  pub fee_growth_global_a: u128,

  pub token_mint_b: Pubkey,
  pub token_vault_b: Pubkey,

  // Q64.64
  pub fee_growth_global_b: u128,

  pub reward_last_updated_timestamp: u64,

  pub reward_infos: [WhirlpoolRewardInfo; 3],
}

impl IsInitialized for WhirlpoolState {
  fn is_initialized(&self) -> bool {
    u8::from_le_bytes(self.whirlpool_bump) != 0
  }
}

#[derive(Clone)]
pub struct Whirlpool(WhirlpoolState);

impl Sealed for WhirlpoolState {}

impl Pack for WhirlpoolState {
  const LEN: usize = 8 + 261 + 384;

  fn pack_into_slice(&self, _dst: &mut [u8]) {
    unimplemented!()
  }

  fn unpack_from_slice(input: &[u8]) -> std::result::Result<Self, ProgramError> {
    if input.len() < WhirlpoolState::LEN {
      return Err(ProgramError::AccountDataTooSmall)
    }

    let input = array_ref![input, 8, WhirlpoolState::LEN - 8];
    #[allow(clippy::ptr_offset_with_cast)]
      let (
      whirlpools_config,
      whirlpool_bump,
      tick_spacing,
      tick_spacing_seed,
      fee_rate,
      protocol_fee_rate,
      liquidity,
      sqrt_price,
      tick_current_index,
      protocol_fee_owed_a,
      protocol_fee_owed_b,
      token_mint_a,
      token_vault_a,
      fee_growth_global_a,
      token_mint_b,
      token_vault_b,
      fee_growth_global_b,
      reward_last_updated_timestamp,
      mint_0,
      vault_0,
      authority_0,
      emissions_per_second_x64_0,
      growth_global_x64_0,
      mint_1,
      vault_1,
      authority_1,
      emissions_per_second_x64_1,
      growth_global_x64_1,
      mint_2,
      vault_2,
      authority_2,
      emissions_per_second_x64_2,
      growth_global_x64_2,
    ) = array_refs![input, 32,1,2,2,2,2,16,16,4,8,8,32,32,16,32,32,16,8, 32, 32, 32, 16, 16, 32, 32, 32, 16, 16, 32, 32, 32, 16, 16];

    Ok(Self {
      whirlpools_config: Pubkey::new_from_array(*whirlpools_config),
      whirlpool_bump: *whirlpool_bump,
      tick_spacing: u16::from_le_bytes(*tick_spacing),
      tick_spacing_seed: *tick_spacing_seed,
      fee_rate: u16::from_le_bytes(*fee_rate),
      protocol_fee_rate: u16::from_le_bytes(*protocol_fee_rate),
      liquidity: u128::from_le_bytes(*liquidity),
      sqrt_price: u128::from_le_bytes(*sqrt_price),
      tick_current_index: i32::from_le_bytes(*tick_current_index),
      protocol_fee_owed_a: u64::from_le_bytes(*protocol_fee_owed_a),
      protocol_fee_owed_b: u64::from_le_bytes(*protocol_fee_owed_b),
      token_mint_a: Pubkey::new_from_array(*token_mint_a),
      token_vault_a: Pubkey::new_from_array(*token_vault_a),
      fee_growth_global_a: u128::from_le_bytes(*fee_growth_global_a),
      token_mint_b: Pubkey::new_from_array(*token_mint_b),
      token_vault_b: Pubkey::new_from_array(*token_vault_b),
      fee_growth_global_b: u128::from_le_bytes(*fee_growth_global_b),
      reward_last_updated_timestamp: u64::from_le_bytes(*reward_last_updated_timestamp),
      reward_infos: [
        WhirlpoolRewardInfo {
          mint: Pubkey::new_from_array(*mint_0),
          vault: Pubkey::new_from_array(*vault_0),
          authority: Pubkey::new_from_array(*authority_0),
          emissions_per_second_x64: u128::from_le_bytes(*emissions_per_second_x64_0),
          growth_global_x64: u128::from_le_bytes(*growth_global_x64_0),
        },
        WhirlpoolRewardInfo {
          mint: Pubkey::new_from_array(*mint_1),
          vault: Pubkey::new_from_array(*vault_1),
          authority: Pubkey::new_from_array(*authority_1),
          emissions_per_second_x64: u128::from_le_bytes(*emissions_per_second_x64_1),
          growth_global_x64: u128::from_le_bytes(*growth_global_x64_1),
        },
        WhirlpoolRewardInfo {
          mint: Pubkey::new_from_array(*mint_2),
          vault: Pubkey::new_from_array(*vault_2),
          authority: Pubkey::new_from_array(*authority_2),
          emissions_per_second_x64: u128::from_le_bytes(*emissions_per_second_x64_2),
          growth_global_x64: u128::from_le_bytes(*growth_global_x64_2),
        },
      ],
    })
  }
}

impl anchor_lang::Owner for Whirlpool {
  fn owner() -> Pubkey {
    orca_whirlpool::ID
  }
}

impl anchor_lang::AccountSerialize for Whirlpool {}

impl anchor_lang::AccountDeserialize for Whirlpool {
  fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
    Ok(WhirlpoolState::unpack(buf).map(Whirlpool)?)
  }
}

impl Deref for Whirlpool {
  type Target = WhirlpoolState;

  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default, Copy)]
pub struct OpenPositionBumps {
  pub position_bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default, Copy)]
pub struct OpenPositionWithMetadataBumps {
  pub position_bump: u8,
  pub metadata_bump: u8,
}

#[derive(Copy, Clone, AnchorSerialize, AnchorDeserialize, Default, Debug, PartialEq)]
pub struct PositionRewardInfo {
  pub growth_inside_checkpoint: u128,
  pub amount_owed: u64,
}

#[repr(C)]
#[derive(Clone, Copy, Debug, Default, PartialEq)]
pub struct PositionState {
  pub whirlpool: Pubkey,
  pub position_mint: Pubkey,
  pub liquidity: u128,
  pub tick_lower_index: i32,
  pub tick_upper_index: i32,
  pub fee_growth_checkpoint_a: u128,
  pub fee_owed_a: u64,
  pub fee_growth_checkpoint_b: u128,
  pub fee_owed_b: u64,
  pub reward_infos: [PositionRewardInfo; 3],
}

impl IsInitialized for PositionState {
  fn is_initialized(&self) -> bool {
    let non_zero = self.tick_lower_index != 0 && self.tick_upper_index != 0;
    let sanity_check = self.tick_upper_index > self.tick_lower_index;
    non_zero && sanity_check
  }
}

#[derive(Clone)]
pub struct Position(PositionState);

impl Sealed for PositionState {}

impl Pack for PositionState {
  const LEN: usize = 216;

  fn pack_into_slice(&self, _dst: &mut [u8]) {
    unimplemented!()
  }

  fn unpack_from_slice(input: &[u8]) -> std::result::Result<Self, ProgramError> {
    if input.len() < PositionState::LEN {
      return Err(ProgramError::AccountDataTooSmall)
    }

    let input = array_ref![input, 8, PositionState::LEN - 8];
    #[allow(clippy::ptr_offset_with_cast)]
      let (
      whirlpool,
      position_mint,
      liquidity,
      tick_lower_index,
      tick_upper_index,
      fee_growth_checkpoint_a,
      fee_owed_a,
      fee_growth_checkpoint_b,
      fee_owed_b,
      growth_inside_checkpoint_0,
      amount_owed_0,
      growth_inside_checkpoint_1,
      amount_owed_1,
      growth_inside_checkpoint_2,
      amount_owed_2,
    ) = array_refs![input, 32, 32, 16, 4, 4, 16, 8, 16, 8, 16, 8, 16, 8, 16, 8];

    Ok(Self {
      whirlpool: Pubkey::new_from_array(*whirlpool),
      position_mint: Pubkey::new_from_array(*position_mint),
      liquidity: u128::from_le_bytes(*liquidity),
      tick_lower_index: i32::from_le_bytes(*tick_lower_index),
      tick_upper_index: i32::from_le_bytes(*tick_upper_index),
      fee_growth_checkpoint_a: u128::from_le_bytes(*fee_growth_checkpoint_a),
      fee_owed_a: u64::from_le_bytes(*fee_owed_a),
      fee_growth_checkpoint_b: u128::from_le_bytes(*fee_growth_checkpoint_b),
      fee_owed_b: u64::from_le_bytes(*fee_owed_b),
      reward_infos: [
        PositionRewardInfo {
          growth_inside_checkpoint: u128::from_le_bytes(*growth_inside_checkpoint_0),
          amount_owed: u64::from_le_bytes(*amount_owed_0),
        },
        PositionRewardInfo {
          growth_inside_checkpoint: u128::from_le_bytes(*growth_inside_checkpoint_1),
          amount_owed: u64::from_le_bytes(*amount_owed_1),
        },
        PositionRewardInfo {
          growth_inside_checkpoint: u128::from_le_bytes(*growth_inside_checkpoint_2),
          amount_owed: u64::from_le_bytes(*amount_owed_2),
        },
      ],
    })
  }
}

impl anchor_lang::Owner for Position {
  fn owner() -> Pubkey {
    orca_whirlpool::ID
  }
}

impl anchor_lang::AccountSerialize for Position {}

impl anchor_lang::AccountDeserialize for Position {
  fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
    Ok(PositionState::unpack(buf).map(Position)?)
  }
}

impl Deref for Position {
  type Target = PositionState;

  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

