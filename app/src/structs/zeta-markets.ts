import {PublicKey} from "@solana/web3.js";
import {BeetStruct, bignum, bool, i64, u32, u64, u8, uniformFixedSizeArray} from "@metaplex-foundation/beet";
import {publicKey} from "@metaplex-foundation/beet-solana";

export interface Strike {
  isSet: boolean,
  value: bignum
}


export interface AnchorDecimal {
  flags: bignum,
  hi: bignum,
  lo: bignum,
  mid: bignum
}

export interface Product {
  market: PublicKey,
  strike: Strike,
  dirty: boolean,
  kind: number
}

export interface ExpirySeries {
  activeTs: bignum,
  expiryTs: bignum,
  dirty: boolean,
  padding: number[]
}


export interface PricingParameters {
  optionTradeNormalizer: AnchorDecimal,
  futureTradeNormalizer: AnchorDecimal,
  maxVolatilityRetreat: AnchorDecimal,
  maxInterestRetreat: AnchorDecimal,
  maxDelta: bignum,
  minDelta: bignum,
  minVolatility: bignum,
  maxVolatility: bignum,
  minInterestRate: bignum,
  maxInterestRate: bignum,
}


export interface MarginParameters {
  futureMarginInitial: bignum,
  futureMarginMaintenance: bignum,
  optionMarkPercentageLongInitial: bignum,
  optionSpotPercentageLongInitial: bignum,
  optionSpotPercentageShortInitial: bignum,
  optionDynamicPercentageShortInitial: bignum,
  optionMarkPercentageLongMaintenance: bignum,
  optionSpotPercentageLongMaintenance: bignum,
  optionSpotPercentageShortMaintenance: bignum,
  optionDynamicPercentageShortMaintenance: bignum,
  optionShortPutCapPercentage: bignum,
  padding: number[]
}

export interface HaltState {
  halted: boolean;
  spotPrice: bignum;
  timestamp: bignum;
  markPricesSet: Array<boolean>;
  markPricesSetPadding: Array<boolean>;
  marketNodesCleaned: Array<boolean>;
  marketNodesCleanedPadding: Array<boolean>;
  marketCleaned: Array<boolean>;
  marketCleanedPadding: Array<boolean>;
}

export interface ZetaGroup {
  anchorType: number[],
  publicKey: PublicKey,
  nonce: number,
  vaultNonce: number,
  insuranceVaultNonce: number,
  frontExpiryIndex: number,
  haltState: HaltState,
  underlyingMint: PublicKey,
  oracle: PublicKey,
  greeks: PublicKey,
  pricingParameters: PricingParameters,
  marginParameters: MarginParameters,
  products: Product[],
  productsPadding: Product[],
  expirySeries: ExpirySeries[],
  expirySeriesPadding: ExpirySeries[],
  totalInsuranceVaultDeposits: bignum,
  asset: number,
  expiryIntervalSeconds: bignum,
  newExpiryThresholdSeconds: bignum,
  padding: number[]
}

const StrikeLayout = new BeetStruct<Strike>([
    ["isSet", bool],
    ["value", u64],
  ],
  args => args as Strike,
  "Strike"
);


const AnchorDecimalLayout = new BeetStruct<AnchorDecimal>([
    ["flags", u32],
    ["hi", u32],
    ["lo", u32],
    ["mid", u32],
  ],
  args => args as AnchorDecimal,
  "AnchorDecimal"
);

const ProductLayout = new BeetStruct<Product>([
    ["market", publicKey],
    ["strike", StrikeLayout],
    ["dirty", bool],
    ["kind", u8]
  ],
  args => args as Product,
  "Product"
);

const ExpirySeriesLayout = new BeetStruct<ExpirySeries>([
    ["activeTs", u64],
    ["expiryTs", u64],
    ["dirty", bool],
    ["padding", uniformFixedSizeArray(u8, 15)]
  ],
  args => args as ExpirySeries,
  "ExpirySeries"
);

const HaltStateLayout = new BeetStruct<HaltState>([
    ["halted", bool],
    ["spotPrice", u64],
    ["timestamp", u64],
    ["markPricesSet", uniformFixedSizeArray(bool, 2)],
    ["markPricesSetPadding", uniformFixedSizeArray(bool, 4)],
    ["marketNodesCleaned", uniformFixedSizeArray(bool, 2)],
    ["marketNodesCleanedPadding", uniformFixedSizeArray(bool, 4)],
    ["marketCleaned", uniformFixedSizeArray(bool, 46)],
    ["marketCleanedPadding", uniformFixedSizeArray(bool, 92)],
  ],
  args => args as HaltState,
  "HaltState"
);


export const PricingParametersLayout = new BeetStruct<PricingParameters>([
    ["optionTradeNormalizer", AnchorDecimalLayout],
    ["futureTradeNormalizer", AnchorDecimalLayout],
    ["maxVolatilityRetreat", AnchorDecimalLayout],
    ["maxInterestRetreat", AnchorDecimalLayout],
    ["maxDelta", u64],
    ["minDelta", u64],
    ["minVolatility", u64],
    ["maxVolatility", u64],
    ["minInterestRate", i64],
    ["maxInterestRate", i64],
  ],
  args => args as PricingParameters,
  "PricingParameters"
);

export const MarginParametersLayout = new BeetStruct<MarginParameters>([
    ["futureMarginInitial", u64],
    ["futureMarginMaintenance", u64],
    ["optionMarkPercentageLongInitial", u64],
    ["optionSpotPercentageLongInitial", u64],
    ["optionSpotPercentageShortInitial", u64],
    ["optionDynamicPercentageShortInitial", u64],
    ["optionMarkPercentageLongMaintenance", u64],
    ["optionSpotPercentageLongMaintenance", u64],
    ["optionSpotPercentageShortMaintenance", u64],
    ["optionDynamicPercentageShortMaintenance", u64],
    ["optionShortPutCapPercentage", u64],
    ["padding", uniformFixedSizeArray(u8, 32)]
  ],
  args => args as MarginParameters,
  "MarginParameters"
);


export const ZetaGroupLayout = new BeetStruct<ZetaGroup>([
    ["anchorType", uniformFixedSizeArray(u8, 8)],
    ["nonce", u8],
    ["vaultNonce", u8],
    ["insuranceVaultNonce", u8],
    ["frontExpiryIndex", u8],
    ["haltState", HaltStateLayout],
    ["underlyingMint", publicKey],
    ["oracle", publicKey],
    ["greeks", publicKey],
    ["pricingParameters", PricingParametersLayout],
    ["marginParameters", MarginParametersLayout],
    ["products", uniformFixedSizeArray(ProductLayout, 46)],
    ["productsPadding", uniformFixedSizeArray(ProductLayout, 92)],
    ["expirySeries", uniformFixedSizeArray(ExpirySeriesLayout, 2)],
    ["expirySeriesPadding", uniformFixedSizeArray(ExpirySeriesLayout, 4)],
    ["totalInsuranceVaultDeposits", u64],
    ["asset", u8],
    ["expiryIntervalSeconds", u32],
    ["newExpiryThresholdSeconds", u32],
    ["padding", uniformFixedSizeArray(u8, 1054)]
  ],
  args => args as ZetaGroup,
  "ZetaGroup"
)

