import {Program} from "@project-serum/anchor";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {getVaultInfo} from "../pda/vault";
import {PublicKey, SYSVAR_RENT_PUBKEY, TransactionInstruction} from "@solana/web3.js";
import {
  getBaseMint,
  getMarginAccount,
  getMarketNode,
  getMintAuthority,
  getOpenOrders, getOpenOrdersMap, getQuoteMint,
  getSocializedLossAccount,
  getState, getZetaTokenVault,
} from "../pda/zeta-markets";
import {ZetaGroup} from "../structs/zeta-markets";
import {ZETA_SERUM_PROGRAM_ID, TOKEN_PROGRAM_ID, ZETA_PROGRAM_ID, SYSTEM_PROGRAM_ID} from "../pubkeys";
import {SerumMarket} from "../structs/serum";
import {Vault} from "../structs/vault";


export const createBidOrderIx = async (
  marketIndex: number,
  authority: PublicKey,
  vault: Vault,
  market: SerumMarket,
  group: ZetaGroup,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault.publicKey);
  const [openOrders] = await getOpenOrders(market.publicKey, executor);
  const [state] = await getState();
  const marginAccount = await getMarginAccount(group.publicKey, executor);
  const [marketNode] = await getMarketNode(group.publicKey, marketIndex);
  const [mintAuthority] = await getMintAuthority();
  const [socializedLossAccount] = await getSocializedLossAccount(group.publicKey);
  const [baseMint] = await getBaseMint(market.publicKey);
  const [quoteMint] = await getQuoteMint(market.publicKey);
  const [zetaBaseVault] = await getZetaTokenVault(baseMint);
  const [zetaQuoteVault] = await getZetaTokenVault(quoteMint);
  const [openOrdersMap] = await getOpenOrdersMap(openOrders);
  return program.methods
    .bidOrder()
    .accountsStrict({
      vault: vault.publicKey,
      executor,
      authority,
      marginAccount,
      zetaGroup: group.publicKey,
      state,
      openOrders: openOrders,
      market: market.publicKey,
      serumAuthority: market.authority,
      oracle: group.oracle,
      openOrdersMap,
      socializedLossAccount,
      greeks: group.greeks,
      requestQueue: market.requestQueue,
      eventQueue: market.eventQueue,
      bids: market.bids,
      asks: market.asks,
      coinVault: market.baseVault,
      pcVault: market.quoteVault,
      coinWallet: zetaBaseVault,
      pcWallet: zetaQuoteVault,
      marketNode: marketNode,
      marketMint: market.quoteMint,
      mintAuthority: mintAuthority,
      zetaProgram: ZETA_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SYSTEM_PROGRAM_ID,
      dexProgram: ZETA_SERUM_PROGRAM_ID,
    }).instruction()
}