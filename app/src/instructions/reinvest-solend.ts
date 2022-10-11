import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import BN from "bn.js";
import {CLOCK_PROGRAM_ID, TOKEN_PROGRAM_ID, SOLEND_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {Reserve} from "../structs/solend";
import {getLendingMarketAuthority} from "../pda/solend";


export const createReinvestSolendIx = async (
  amountIn: BN,
  authority: PublicKey,
  vault: PublicKey,
  collateralVault: PublicKey,
  underlyingVault: PublicKey,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault);
  const lendingMarketAuthority = await getLendingMarketAuthority(reserve.lendingMarket);
  return await program.methods
    .reinvestSolend()
    .accountsStrict({
      vault,
      executor,
      reserve: reserve.publicKey,
      collateralVault: collateralVault,
      underlyingVault: underlyingVault,
      reserveLiquiditySupply: reserve.liquidity.supplyPubkey,
      reserveCollateralMint: reserve.collateral.mintPubkey,
      lendingMarket: reserve.lendingMarket,
      lendingMarketAuthority,
      clock: CLOCK_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      lendingProgram: SOLEND_PROGRAM_ID,
      authority: authority,
    })
    .instruction();
}