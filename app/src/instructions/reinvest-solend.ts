import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import BN from "bn.js";
import {CLOCK_PROGRAM_ID, TOKEN_PROGRAM_ID, SOLEND_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {Reserve} from "../structs/solend";
import {getLendingMarketAuthority} from "../pda/solend";
import {Vault} from "../structs/vault";


export const createReinvestSolendIx = async (
  amountIn: BN,
  authority: PublicKey,
  vault: Vault,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault.publicKey);
  const lendingMarketAuthority = await getLendingMarketAuthority(reserve.lendingMarket);
  return await program.methods
    .reinvestSolend()
    .accountsStrict({
      vault: vault.publicKey,
      executor,
      reserve: reserve.publicKey,
      collateralVault: vault.collateralVault,
      underlyingVault: vault.underlyingVault,
      reserveLiquiditySupply: reserve.liquidity.supplyPubkey,
      reserveCollateralMint: reserve.collateral.mintPubkey,
      lendingMarket: reserve.lendingMarket,
      lendingMarketAuthority,
      tokenProgram: TOKEN_PROGRAM_ID,
      lendingProgram: SOLEND_PROGRAM_ID,
      authority: authority,
    })
    .instruction();
}