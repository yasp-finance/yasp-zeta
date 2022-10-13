import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import BN from "bn.js";
import {TOKEN_PROGRAM_ID, ZETA_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {
  getMarginAccount,
  getSocializedLossAccount,
  getState, getZetaVault
} from "../pda/zeta-markets";
import {ZetaGroup} from "../structs/zeta-markets";


export const createRedeemZetaIx = async (
  amountIn: BN,
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
  const [zetaVault] = await getZetaVault(group.publicKey);
  return await program.methods
    .redeemZeta(amountIn)
    .accountsStrict({
      vault,
      executor,
      authority,
      usdcVault: usdcVault,
      marginAccount,
      zetaGroup: group.publicKey,
      state: state,
      oracle: group.oracle,
      zetaVault,
      socializedLossAccount,
      greeks: group.greeks,
      zetaProgram: ZETA_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();
}