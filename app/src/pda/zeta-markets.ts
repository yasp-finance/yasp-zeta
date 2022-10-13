import {PublicKey} from "@solana/web3.js";
import {ZETA_SERUM_PROGRAM_ID, ZETA_PROGRAM_ID} from "../pubkeys";

export async function getState(
  programId = ZETA_PROGRAM_ID
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [Buffer.from("state")],
    programId
  );
}


export async function getMarginAccount(
  zetaGroup: PublicKey,
  userKey: PublicKey,
  programId = ZETA_PROGRAM_ID
): Promise<PublicKey> {
  const [pda] = await PublicKey.findProgramAddress(
    [
      Buffer.from("margin"),
      zetaGroup.toBuffer(),
      userKey.toBuffer(),
    ],
    programId
  );
  return pda;
}

export async function getMarketNode(
  zetaGroup: PublicKey,
  marketIndex: number,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("market-node"),
      zetaGroup.toBuffer(),
      Buffer.from([marketIndex]),
    ],
    programId
  );
}


export async function getOpenOrders(
  market: PublicKey,
  userKey: PublicKey,
  dexId = ZETA_SERUM_PROGRAM_ID,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("open-orders"),
      dexId.toBuffer(),
      market.toBuffer(),
      userKey.toBuffer(),
    ],
    programId
  );
}

export async function getOpenOrdersMap(
  openOrders: PublicKey,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [openOrders.toBuffer()],
    programId
  );
}

export async function getSerumAuthority(
  programId = ZETA_SERUM_PROGRAM_ID
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [Buffer.from("serum")],
    programId
  );
}

export async function getMintAuthority(
  programId = ZETA_PROGRAM_ID
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [Buffer.from("mint-auth")],
    programId
  );
}

export async function getSocializedLossAccount(
  zetaGroup: PublicKey,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("socialized-loss"),
      zetaGroup.toBuffer(),
    ],
    programId
  );
}

export async function getZetaVault(
  zetaGroup: PublicKey,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("vault"),
      zetaGroup.toBuffer(),
    ],
    programId
  );
}

export async function getSerumVault(
  programId = ZETA_PROGRAM_ID,
  mint: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("serum-vault"),
      mint.toBuffer(),
    ],
    programId
  );
}

export async function getZetaTokenVault(
  mint: PublicKey,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("zeta-vault"),
      mint.toBuffer(),
    ],
    programId
  );
}

export async function getZetaInsuranceVault(
  programId = ZETA_PROGRAM_ID,
  zetaGroup: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("zeta-insurance-vault"),
      zetaGroup.toBuffer(),
    ],
    programId
  );
}

export async function getUserInsuranceDepositAccount(
  zetaGroup: PublicKey,
  userKey: PublicKey,
  programId = ZETA_PROGRAM_ID
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("user-insurance-deposit"),
      zetaGroup.toBuffer(),
      userKey.toBuffer(),
    ],
    programId
  );
}

export async function getUserWhitelistDepositAccount(
  programId = ZETA_PROGRAM_ID,
  userKey: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("whitelist-deposit"),
      userKey.toBuffer(),
    ],
    programId
  );
}

export async function getUserWhitelistInsuranceAccount(
  programId = ZETA_PROGRAM_ID,
  userKey: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("whitelist-insurance"),
      userKey.toBuffer(),
    ],
    programId
  );
}

export async function getUserWhitelistTradingFeesAccount(
  programId = ZETA_PROGRAM_ID,
  userKey: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("whitelist-trading-fees"),
      userKey.toBuffer(),
    ],
    programId
  );
}

export async function getZetaGroup(
  programId = ZETA_PROGRAM_ID,
  mint: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("zeta-group"),
      mint.toBuffer(),
    ],
    programId
  );
}

export async function getUnderlying(
  programId = ZETA_PROGRAM_ID,
  underlyingIndex: number
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("underlying"),
      Buffer.from([underlyingIndex]),
    ],
    programId
  );
}

export async function getGreeks(
  programId = ZETA_PROGRAM_ID,
  zetaGroup: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("greeks"),
      zetaGroup.toBuffer(),
    ],
    programId
  );
}

export async function getMarketIndexes(
  programId = ZETA_PROGRAM_ID,
  zetaGroup: PublicKey
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("market-indexes"),
      zetaGroup.toBuffer(),
    ],
    programId
  );
}

export async function getBaseMint(
  market: PublicKey,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("base-mint"),
      market.toBuffer(),
    ],
    programId
  );
}

export async function getQuoteMint(
  market: PublicKey,
  programId = ZETA_PROGRAM_ID,
): Promise<[PublicKey, number]> {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("quote-mint"),
      market.toBuffer(),
    ],
    programId
  );
}