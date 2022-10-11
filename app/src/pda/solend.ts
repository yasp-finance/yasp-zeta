import {PublicKey} from "@solana/web3.js";
import {SOLEND_PROGRAM_ID} from "../pubkeys";

export const getLendingMarketAuthority = async (
  lendingMarket: PublicKey,
): Promise<PublicKey> => {
  const pda = await PublicKey.findProgramAddress(
    [lendingMarket.toBuffer()],
    SOLEND_PROGRAM_ID,
  );
  return pda[0];
}