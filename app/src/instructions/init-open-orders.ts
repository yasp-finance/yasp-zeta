import {Program} from "@project-serum/anchor";
import {PublicKey, SYSVAR_RENT_PUBKEY, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {
  ZETA_PROGRAM_ID,
  SYSTEM_PROGRAM_ID,
  ZETA_SERUM_PROGRAM_ID
} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {ZetaGroup} from "../structs/zeta-markets";
import {
  getMarginAccount,
  getOpenOrders, getOpenOrdersMap, getSerumAuthority,
  getState,
} from "../pda/zeta-markets";
import {SerumMarket} from "../structs/serum";


export const createInitOpenOrdersIx = async (
  authority: PublicKey,
  vault: PublicKey,
  market: SerumMarket,
  group: ZetaGroup,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault);
  const [openOrders] = await getOpenOrders(market.publicKey, executor);
  const [state] = await getState();
  const marginAccount = await getMarginAccount(group.publicKey, executor);
  const [serumAuthority] = await getSerumAuthority();
  const [openOrdersMap] = await getOpenOrdersMap(openOrders);
  return await program.methods
    .initOpenOrders()
    .accountsStrict({
      vault,
      executor,
      authority,
      marginAccount,
      zetaGroup: group.publicKey,
      state,
      openOrders: openOrders,
      market: market.publicKey,
      serumAuthority,
      openOrdersMap,
      dexProgram: ZETA_SERUM_PROGRAM_ID,
      systemProgram: SYSTEM_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      zetaProgram: ZETA_PROGRAM_ID,
    })
    .instruction();
}