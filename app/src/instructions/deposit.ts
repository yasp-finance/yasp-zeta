import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import BN from "bn.js";
import {CLOCK_PROGRAM_ID, TOKEN_PROGRAM_ID, SOLEND_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {getATA} from "../pda/token";
import {Reserve} from "../structs/solend";
import {getLendingMarketAuthority} from "../pda/solend";


export const createDepositIx = async (
  amountIn: BN,
  authority: PublicKey,
  userTokenAccount: PublicKey,
  vault: PublicKey,
  collateralVault: PublicKey,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {sharesMint, executor} = await getVaultInfo(vault);
  const userShares = await getATA(authority, sharesMint);
  const lendingMarketAuthority = await getLendingMarketAuthority(reserve.lendingMarket);
  return await program.methods
    .deposit(amountIn)
    .accountsStrict({
      vault,
      sharesMint,
      executor,
      reserve: reserve.publicKey,
      userShares,
      userTokenAccount,
      userAccount: authority,
      collateralVault: collateralVault,
      reserveLiquiditySupply: reserve.liquidity.supplyPubkey,
      reserveCollateralMint: reserve.collateral.mintPubkey,
      lendingMarket: reserve.lendingMarket,
      lendingMarketAuthority,
      clock: CLOCK_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      lendingProgram: SOLEND_PROGRAM_ID
    })
    .instruction();
}