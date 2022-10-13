import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {CLOCK_PROGRAM_ID, TOKEN_PROGRAM_ID, SOLEND_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {Reserve} from "../structs/solend";
import {getLendingMarketAuthority} from "../pda/solend";


export const createHarvestYieldIx = async (
  authority: PublicKey,
  vault: PublicKey,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const data = await program.account.vault.fetch(vault);
  const {executor} = await getVaultInfo(vault);
  const lendingMarketAuthority = await getLendingMarketAuthority(reserve.lendingMarket);
  return await program.methods
    .harvestYield()
    .accountsStrict({
      vault,
      executor,
      collateralVault: data.collateralVault,
      reserve: reserve.publicKey,
      authority: authority,
      reserveLiquiditySupply: reserve.liquidity.supplyPubkey,
      reserveCollateralMint: reserve.collateral.mintPubkey,
      lendingMarket: reserve.lendingMarket,
      lendingMarketAuthority: lendingMarketAuthority,
      underlyingVault: data.underlyingVault,
      lendingProgram: SOLEND_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();
}