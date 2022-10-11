import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {TOKEN_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";


export const createSwapToUnderlyingIx = async (
  authority: PublicKey,
  vault: PublicKey,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault);
  return await program.methods
    .swapToUnderlying()
    .accountsStrict({
      vault,
      executor,
      tokenProgram: TOKEN_PROGRAM_ID,
      authority: "",
      underlyingVault: "",
      whirlpool: "",
      usdcVault: "",
      tokenVaultA: "",
      tokenVaultB: "",
      tickArray0: "",
      tickArray1: "",
      tickArray2: "",
      oracle: "",
      poolProgramId: ""
    })
    .instruction();
}