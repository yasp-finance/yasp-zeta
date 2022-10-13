import BN from "bn.js";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {Program} from "@project-serum/anchor";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {getVaultInfo} from "../pda/vault";
import {CLOCK_PROGRAM_ID, SOLEND_PROGRAM_ID, TOKEN_PROGRAM_ID} from "../pubkeys";
import {Reserve} from "../structs/solend";
import {getLendingMarketAuthority} from "../pda/solend";



export const createWithdrawIx = async (
  amountIn: BN,
  authority: PublicKey,
  userTokenAccount: PublicKey,
  userSharesAccount: PublicKey,
  vault: PublicKey,
  collateralVault: PublicKey,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {sharesMint, executor} = await getVaultInfo(vault);
  const lendingMarketAuthority = await getLendingMarketAuthority(reserve.lendingMarket);
  return await program.methods
    .withdraw(amountIn)
    .accountsStrict({
      vault,
      sharesMint,
      executor,
      reserve: reserve.publicKey,
      userShares: userSharesAccount,
      userTokenAccount,
      userAccount: authority,
      collateralVault: collateralVault,
      reserveLiquiditySupply: reserve.liquidity.supplyPubkey,
      reserveCollateralMint: reserve.collateral.mintPubkey,
      lendingMarket: reserve.lendingMarket,
      lendingMarketAuthority,
      tokenProgram: TOKEN_PROGRAM_ID,
      lendingProgram: SOLEND_PROGRAM_ID
    })
    .instruction();
}