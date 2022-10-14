import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {TOKEN_PROGRAM_ID, ZETA_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {ZetaGroup} from "../structs/zeta-markets";
import {getMarginAccount, getSocializedLossAccount, getState, getZetaVault} from "../pda/zeta-markets";
import {Vault} from "../structs/vault";

export const createReinvestZetaIx = async (
  authority: PublicKey,
  vault: Vault,
  group: ZetaGroup,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault.publicKey);
  const [state] = await getState();
  const marginAccount = await getMarginAccount(group.publicKey, executor);
  const [socializedLossAccount] = await getSocializedLossAccount(group.publicKey);
  const [zetaVault] = await getZetaVault(group.publicKey);
  return await program.methods
    .reinvestZeta()
    .accountsStrict({
      vault: vault.publicKey,
      executor,
      authority,
      usdcVault: vault.usdcVault,
      marginAccount,
      zetaGroup: group.publicKey,
      state: state,
      zetaVault,
      socializedLossAccount,
      greeks: group.greeks,
      zetaProgram: ZETA_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();
}