import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {TOKEN_PROGRAM_ID, ZETA_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {ZetaGroup} from "../structs/zeta-markets";
import {SerumMarket} from "../structs/serum";
import {getMarginAccount, getSocializedLossAccount, getState, getZetaVault} from "../pda/zeta-markets";

export const createReinvestZetaIx = async (
  authority: PublicKey,
  vault: PublicKey,
  usdcVault: PublicKey,
  group: ZetaGroup,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault);
  const [state] = await getState();
  const marginAccount = await getMarginAccount(group.publicKey, executor);
  const [socializedLossAccount] = await getSocializedLossAccount(group.publicKey);
  const [zetaVault] = await getZetaVault(group.underlyingMint);
  return await program.methods
    .reinvestZeta()
    .accountsStrict({
      vault,
      executor,
      authority,
      usdcVault,
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