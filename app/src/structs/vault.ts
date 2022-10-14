import {
  bignum,
  i32,
  u128,
  u16,
  uniformFixedSizeArray,
  BeetStruct,
  u64,
  u8, i64,
} from '@metaplex-foundation/beet'
import {PublicKey} from '@solana/web3.js'
import {publicKey} from '@metaplex-foundation/beet-solana'

export type Vault = {
  publicKey: PublicKey,
  padding: number[],
  bump: number,
  // bump for share mint
  mintBump: number,
  // bump for the executor account
  executorBump: number,

  usdcVault: PublicKey,
  collateralVault: PublicKey,
  underlyingVault: PublicKey,

  marginAccount: PublicKey,

  reserve: PublicKey,
  zetaGroup: PublicKey,
  authority: PublicKey,

  depositLimit: bignum,
  totalDeposit: bignum,
  totalWithdraw: bignum,
  totalGain: bignum,
  totalHarvest: bignum, // total amount of token, that was harvested on Solend

  lockedProfitDegradation: bignum,
  lockedProfit: bignum,
  managementFeeBps: bignum,
  harvestInterval: bignum,

  lastHarvest: bignum,
  lastGain: bignum,
  createdAt: bignum
}


export const VaultLayout = new BeetStruct<Vault>(
  [
    ["padding", uniformFixedSizeArray(u8, 8)],
    ["bump", u8],
    ["mintBump", u8],
    ["executorBump", u8],
    ["usdcVault", publicKey],
    ["collateralVault", publicKey],
    ["underlyingVault", publicKey],
    ["marginAccount", publicKey],
    ["reserve", publicKey],
    ["zetaGroup", publicKey],
    ["authority", publicKey],
    ["depositLimit", u64],
    ["totalDeposit", u64],
    ["totalWithdraw", u64],
    ["totalGain", u64],
    ["totalHarvest", u64],
    ["lockedProfitDegradation", u64],
    ["lockedProfit", u64],
    ["managementFeeBps", u64],
    ["harvestInterval", i64],
    ["lastHarvest", i64],
    ["lastGain", i64],
    ["createdAt", i64]
  ],
  (args) => args as Vault,
  'Vault'
)
