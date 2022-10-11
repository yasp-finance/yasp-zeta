import {Program} from "@project-serum/anchor";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {getVaultInfo} from "../pda/vault";
import {PublicKey, SYSVAR_RENT_PUBKEY, TransactionInstruction} from "@solana/web3.js";
import {
  getMarginAccount,
  getMarketNode,
  getMintAuthority,
  getOpenOrders,
  getSocializedLossAccount,
  getState,
  getZetaVault
} from "../pda/zeta-markets";
import {ZetaGroup} from "../structs/zeta-markets";
import {SERUM_PROGRAM_ID_V3, TOKEN_PROGRAM_ID, ZETA_PROGRAM_ID} from "../pubkeys";
import {SerumMarket} from "../structs/serum";
import BN from "bn.js";


const createBidOrderIx = async (
  price: BN,
  size: BN,
  authority: PublicKey,
  vault: PublicKey,
  baseWallet: PublicKey,
  quoteWallet: PublicKey,
  market: SerumMarket,
  group: ZetaGroup,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault);
  const [openOrders] = await getOpenOrders(market.publicKey, executor);
  const [state] = await getState();
  const marginAccount = await getMarginAccount(group.publicKey, executor);
  const [marketNode] = await getMarketNode(group.publicKey, 0);
  const [mintAuthority] = await getMintAuthority();
  const [socializedLossAccount] = await getSocializedLossAccount(group.publicKey);
  const [zetaVault] = await getZetaVault(group.underlyingMint);
  return await program.methods
    .bidOrder(price, size)
    .accountsStrict({
      vault,
      executor,
      authority,
      marginAccount,
      zetaGroup: group.publicKey,
      state,
      openOrders: openOrders,
      market: market.publicKey,
      serumAuthority: market.authority,
      oracle: group.oracle,
      zetaVault,
      socializedLossAccount,
      greeks: group.greeks,
      requestQueue: market.requestQueue,
      eventQueue: market.eventQueue,
      bids: market.bids,
      asks: market.asks,
      coinVault: market.baseVault,
      pcVault: market.quoteVault,
      coinWallet: market.baseVault,
      pcWallet: market.quoteVault,
      marketNode: marketNode,
      marketMint: market.quoteMint,
      mintAuthority: mintAuthority,
      zetaProgram: ZETA_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      tokenProgram: TOKEN_PROGRAM_ID,
      dexProgram: SERUM_PROGRAM_ID_V3,
    })
    .instruction();
}