import {PublicKey} from "@solana/web3.js";
import {ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID} from "../pubkeys";

export const getATA = async (
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey,
): Promise<PublicKey> => {
  const pda = await PublicKey.findProgramAddress(
    [
      walletAddress.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      tokenMintAddress.toBuffer(),
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  return pda[0];
}