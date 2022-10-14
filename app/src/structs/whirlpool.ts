import {
  bignum,
  i32,
  u128,
  u16,
  uniformFixedSizeArray,
  BeetStruct,
  u64,
  u8,
} from '@metaplex-foundation/beet'
import { PublicKey } from '@solana/web3.js'
import { publicKey } from '@metaplex-foundation/beet-solana'

export type WhirlpoolRewardInfo = {
  mint: PublicKey
  vault: PublicKey
  authority: PublicKey
  emissionsPerSecondX64: bignum
  growthGlobalX64: bignum
}

export type Whirlpool = {
  publicKey: PublicKey,
  padding: number[]
  whirlpoolsConfig: PublicKey
  whirlpoolBump: number[]
  feeRate: number
  tickSpacing: number
  tickSpacingSeed: number[]
  protocolFeeRate: number
  liquidity: bignum
  sqrtPrice: bignum
  tickCurrentIndex: number
  protocolFeeOwedA: bignum
  protocolFeeOwedB: bignum
  tokenMintA: PublicKey
  tokenVaultA: PublicKey
  feeGrowthGlobalA: bignum
  tokenMintB: PublicKey
  tokenVaultB: PublicKey
  feeGrowthGlobalB: bignum
  rewardLastUpdatedTimestamp: bignum
  rewardInfos: WhirlpoolRewardInfo[]
}

export const WhirlpoolRewardInfoLayout =
  new BeetStruct<WhirlpoolRewardInfo>(
    [
      ['mint', publicKey],
      ['vault', publicKey],
      ['authority', publicKey],
      ['emissionsPerSecondX64', u128],
      ['growthGlobalX64', u128],
    ],
    (args) => args as WhirlpoolRewardInfo,
    'WhirlpoolRewardInfo'
  )

export const WhirlpoolLayout = new BeetStruct<Whirlpool>(
  [
    ['padding', uniformFixedSizeArray(u8, 8)],
    ['whirlpoolsConfig', publicKey],
    ['whirlpoolBump', uniformFixedSizeArray(u8, 1)],
    ['tickSpacing', u16],
    ['tickSpacingSeed', uniformFixedSizeArray(u8, 2)],
    ['feeRate', u16],
    ['protocolFeeRate', u16],
    ['liquidity', u128],
    ['sqrtPrice', u128],
    ['tickCurrentIndex', i32],
    ['protocolFeeOwedA', u64],
    ['protocolFeeOwedB', u64],
    ['tokenMintA', publicKey],
    ['tokenVaultA', publicKey],
    ['feeGrowthGlobalA', u128],
    ['tokenMintB', publicKey],
    ['tokenVaultB', publicKey],
    ['feeGrowthGlobalB', u128],
    ['rewardLastUpdatedTimestamp', u64],
    ['rewardInfos', uniformFixedSizeArray(WhirlpoolRewardInfoLayout, 3)],
  ],
  (args) => args as Whirlpool,
  'Whirlpool'
)
