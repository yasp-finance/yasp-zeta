import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {TOKEN_PROGRAM_ID, WHIRLPOOL_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {Vault} from "../structs/vault";
import {Whirlpool} from "../structs/whirlpool";
import {getOracle, getTickArrayFromWhirlpool} from "../pda/whirlpool";


export const createSwapToUSDCIx = async (
  authority: PublicKey,
  vault: Vault,
  whirlpool: Whirlpool,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault.publicKey);
  const [tickArray0] = await getTickArrayFromWhirlpool(whirlpool, 0);
  const [tickArray1] = await getTickArrayFromWhirlpool(whirlpool, 1);
  const [tickArray2] = await getTickArrayFromWhirlpool(whirlpool, 2);
  const [oracle] = await getOracle(whirlpool.publicKey);
  return program.methods
    .swapToUsdc()
    .accountsStrict({
      vault: vault.publicKey,
      executor,
      tokenProgram: TOKEN_PROGRAM_ID,
      authority: authority,
      underlyingVault: vault.underlyingVault,
      whirlpool: whirlpool.publicKey,
      usdcVault: vault.usdcVault,
      tokenVaultA: whirlpool.tokenVaultA,
      tokenVaultB: whirlpool.tokenVaultB,
      tickArray0,
      tickArray1,
      tickArray2,
      oracle,
      poolProgramId: WHIRLPOOL_PROGRAM_ID
    }).instruction();
}