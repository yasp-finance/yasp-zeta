use anchor_lang::prelude::*;
use num_traits::{ToPrimitive};
use crate::{ratio, VaultError};
use crate::cpi_calls::solend::Reserve;

pub const DEGRADATION_COEFFICIENT: u64 = 1000000000000000000;


#[derive(AnchorDeserialize, AnchorSerialize, Default, Copy, Clone)]
pub struct Statistic {
  pub total_deposit: u64,
  pub total_withdraw: u64,
  pub total_gain: u64,
  pub locked_profit_degradation: u64,
  pub locked_profit: u64,
  pub last_gain: i64,
}


#[account]
#[derive(Default)]
pub struct Vault {
  pub bump: u8,
  // bump for share mint
  pub mint_bump: u8,
  // bump for the executor account
  pub executor_bump: u8,

  pub usdc_vault: Pubkey,
  pub collateral_vault: Pubkey,
  pub underlying_vault: Pubkey,

  pub margin_account: Pubkey,

  pub reserve: Pubkey,
  pub zeta_group: Pubkey,
  pub authority: Pubkey,

  pub statistic: Statistic,

  pub deposit_limit: u64,
  // pub total_deposit: u64,
  // pub total_withdraw: u64,
  // pub total_gain: u64,

  // pub locked_profit_degradation: u64,
  // pub locked_profit: u64,
  pub management_fee_bps: u64,
  pub harvest_interval: i64,

  pub total_harvest: u64, // total amount of token, that was harvested on Solend
  pub last_harvest: i64,

  pub created_at: i64,
}

impl Vault {
  pub const MAXIMUM_SIZE: usize = 1 * 3 + 32 * 7 + 8 * 12;

  pub fn for_collateral(
    &self,
    underlying_value: u64,
    reserve: &Reserve,
  ) -> Option<u64> {
    let total_supply = reserve.liquidity.total_supply().unwrap();
    let rate = reserve.collateral
      .exchange_rate(total_supply).unwrap();
    Some(rate.liquidity_to_collateral(underlying_value).unwrap())
  }


  pub fn for_underlying(
    &self,
    collateral_value: u64,
    reserve: &Reserve
  ) -> Option<u64> {
    let total_supply = reserve.liquidity.total_supply().unwrap();
    let rate = reserve.collateral
      .exchange_rate(total_supply).unwrap();
    Some(rate.collateral_to_liquidity(collateral_value).unwrap())
  }

  pub fn current_locked_profit(&self, now: i64) -> Option<u64> {
    if self.statistic.last_gain == 0 {
      return Some(0);
    }
    let time_diff = now
      .checked_sub(self.statistic.last_gain).unwrap();
    if time_diff < 0 {
      return Some(self.statistic.locked_profit);
    }
    msg!("time diff: {}", time_diff);
    let degradation = (time_diff as u64)
      .checked_mul(self.statistic.locked_profit_degradation).unwrap();
    if degradation < DEGRADATION_COEFFICIENT {
      ratio!(self.statistic.locked_profit, degradation, DEGRADATION_COEFFICIENT)
    } else {
      Some(0)
    }
  }


  pub fn total_assets(&self) -> Option<u64> {
    self.statistic.total_deposit
      .checked_add(self.statistic.total_gain)?
      .checked_sub(self.statistic.total_withdraw)
  }

  pub fn free_funds(&self, now: i64) -> Option<u64> {
    let locked_profit = self.current_locked_profit(now).unwrap();
    self.total_assets().unwrap().checked_sub(locked_profit)
  }

  pub fn share_value(
    &self,
    share_amount: u64,
    total_underlying: u64,
    total_share_supply: u64,
  ) -> Option<u64> {
    if share_amount == 0 || total_share_supply == 0 {
      Some(0)
    } else {
      ratio!(total_underlying, share_amount, total_share_supply)
    }
  }

  pub fn shares_for_amount(
    &self,
    underlying_amount: u64,
    total_underlying: u64,
    total_share_supply: u64,
  ) -> Option<u64> {
    if underlying_amount > 0 {
      ratio!(total_share_supply, underlying_amount, total_underlying)
    } else {
      Some(0)
    }
  }

  pub fn initialize(
    &mut self,
    now: i64,
    bump: u8,
    mint_bump: u8,
    executor_bump: u8,
    authority: Pubkey,
    reserve: Pubkey,
    zeta_group: Pubkey,
    collateral_vault: Pubkey,
    underlying_vault: Pubkey,
    usdc_vault: Pubkey,
    margin_account: Pubkey,
    deposit_limit: u64,
    management_fee_bps: u64,
  ) -> Result<()> {
    self.bump = bump;
    self.mint_bump = mint_bump;
    self.executor_bump = executor_bump;
    self.authority = authority;
    self.reserve = reserve;
    self.zeta_group = zeta_group;
    self.collateral_vault = collateral_vault;
    self.underlying_vault = underlying_vault;
    self.usdc_vault = usdc_vault;
    self.margin_account = margin_account;
    self.deposit_limit = deposit_limit;
    // 6 hours lock
    self.statistic.locked_profit_degradation = ratio!(
      DEGRADATION_COEFFICIENT, 46_u64, 1000000_u64
    ).unwrap();
    // 7 days in ms
    self.harvest_interval = 604800000;
    self.management_fee_bps = management_fee_bps;
    self.created_at = now;
    Ok(())
  }

  pub fn after_deposit(&mut self, amount: u64) -> Result<()> {
    self.statistic.total_deposit = self.statistic.total_deposit
      .checked_add(amount).unwrap();
    Ok(())
  }

  pub fn after_withdraw(&mut self, amount: u64) -> Result<()> {
    self.statistic.total_withdraw = self.statistic.total_withdraw
      .checked_add(amount).unwrap();
    Ok(())
  }

  pub fn after_harvest(&mut self, amount: u64, now: i64) -> Result<()> {
    let next_harvest = self.last_harvest
      .checked_add(self.harvest_interval).unwrap();
    if now < next_harvest {
      return err!(VaultError::HarvestDenied)
    }
    self.total_harvest = self.total_harvest
      .checked_add(amount).unwrap();
    self.last_harvest = now;
    Ok(())
  }

  pub fn after_gain(&mut self, amount: u64, now: i64) -> Result<()> {
    self.statistic.total_gain = self.statistic.total_gain
      .checked_add(amount).unwrap();
    self.statistic.locked_profit = self
      .current_locked_profit(now).unwrap()
      .checked_add(amount).unwrap();
    self.statistic.last_gain = now;
    Ok(())
  }
}
