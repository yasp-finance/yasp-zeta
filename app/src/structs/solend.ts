import {BeetStruct, bignum, bool, u128, u64, u8, uniformFixedSizeArray} from "@metaplex-foundation/beet";
import {publicKey} from '@metaplex-foundation/beet-solana';
import {PublicKey} from "@solana/web3.js";
import BN from "bn.js";


export interface LastUpdate {
  slot: bignum;
  stale: boolean;
}

export const LastUpdateLayout = new BeetStruct<LastUpdate>(
  [
    ["slot", u64],
    ["stale", bool]
  ],
  (args) => args as LastUpdate,
  "LastUpdate"
)

export interface Reserve {
  publicKey: PublicKey;
  version: number;
  lastUpdate: LastUpdate;
  lendingMarket: PublicKey;
  liquidity: ReserveLiquidity;
  collateral: ReserveCollateral;
  config: ReserveConfig;
}

export interface ReserveLiquidity {
  mintPubkey: PublicKey;
  mintDecimals: number;
  supplyPubkey: PublicKey;
  oracleOption: number;
  pythOracle: PublicKey;
  switchboardOracle: PublicKey;
  availableAmount: BN;
  borrowedAmountWads: BN;
  cumulativeBorrowRateWads: BN;
  marketPrice: BN;
}

export interface ReserveCollateral {
  mintPubkey: PublicKey;
  mintTotalSupply: bignum;
  supplyPubkey: PublicKey;
}

export interface ReserveFees {
  borrowFeeWad: BN;
  flashLoanFeeWad: BN;
  hostFeePercentage: number;
}

export interface ReserveConfig {
  optimalUtilizationRate: number;
  loanToValueRatio: number;
  liquidationBonus: number;
  liquidationThreshold: number;
  minBorrowRate: number;
  optimalBorrowRate: number;
  maxBorrowRate: number;
  fees: ReserveFees;
  depositLimit: BN;
  borrowLimit: BN;
  feeReceiver?: PublicKey;
  protocolLiquidationFee: number;
  protocolTakeRate: number;
}

export const ReserveFeesLayout = new BeetStruct<ReserveFees>(
  [
    ["borrowFeeWad", u64],
    ["flashLoanFeeWad", u64],
    ["hostFeePercentage", u8],
  ],
  (args) => args as ReserveFees,
  "ReserveFees"
)

export const ReserveConfigLayout = new BeetStruct<ReserveConfig>(
  [
    ["optimalUtilizationRate", u8],
    ["loanToValueRatio", u8],
    ["liquidationBonus", u8],
    ["liquidationThreshold", u8],
    ["minBorrowRate", u8],
    ["optimalBorrowRate", u8],
    ["maxBorrowRate", u8],
    ["fees", ReserveFeesLayout],
    ["depositLimit", u64],
    ["borrowLimit", u64],
    ["feeReceiver", publicKey],
    ["protocolLiquidationFee", u8],
    ["protocolTakeRate", u8],
  ],
  (args) => args as ReserveConfig,
  "ReserveConfig"
);

export const ReserveLiquidityLayout = new BeetStruct<ReserveLiquidity>(
  [
    ["mintPubkey", publicKey],
    ["mintDecimals", u8],
    ["supplyPubkey", publicKey],
    ["pythOracle", publicKey],
    ["switchboardOracle", publicKey],
    ["availableAmount", u64],
    ["borrowedAmountWads", u128],
    ["cumulativeBorrowRateWads", u128],
    ["marketPrice", u128],
  ],
  (args) => args as ReserveLiquidity,
  "ReserveLiquidity"
);

export const ReserveCollateralLayout = new BeetStruct<ReserveCollateral>(
  [
    ["mintPubkey", publicKey],
    ["mintTotalSupply", u64],
    ["supplyPubkey", publicKey]
  ],
  (args) => args as ReserveCollateral,
  "ReserveCollateral"
);

export const ReserveLayout = new BeetStruct<Reserve>(
  [
    ["version", u8],
    ['lastUpdate', LastUpdateLayout],
    ["lendingMarket", publicKey],
    ["liquidity", ReserveLiquidityLayout],
    ["collateral", ReserveCollateralLayout],
    ["config", ReserveConfigLayout],
  ],
  (args) => args as Reserve,
  "Reserve"
);

// export const RESERVE_REAL_SIZE = 1300;
// export const RESERVE_REAL_SIZE = 290;
export const RESERVE_REAL_SIZE = 619;
// export const RESERVE_REAL_SIZE = 627;