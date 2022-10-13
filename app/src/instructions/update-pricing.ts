import {Signer, TransactionInstruction} from "@solana/web3.js";
import {ZETA_PROGRAM_ID} from "../pubkeys";
import {ZetaGroup} from "../structs/zeta-markets";
import {getState} from "../pda/zeta-markets";

export async function createUpdatePricingIx(
  expiryIndex: number,
  authority: Signer,
  group: ZetaGroup,
  programId = ZETA_PROGRAM_ID,
): Promise<TransactionInstruction> {
  const [state] = await getState();
  const keys = [
    {pubkey: state, isSigner: false, isWritable: false},
    {pubkey: group.publicKey, isSigner: false, isWritable: false},
    {pubkey: group.greeks, isSigner: false, isWritable: true},
    {pubkey: group.oracle, isSigner: false, isWritable: false},
  ];

  return new TransactionInstruction({
    keys,
    programId,
    data: Buffer.from([157, 225, 208, 150, 23, 153, 253, 18, expiryIndex]),
  });
}
