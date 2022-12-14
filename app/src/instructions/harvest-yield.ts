import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {TOKEN_PROGRAM_ID, SOLEND_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {Reserve} from "../structs/solend";
import {getLendingMarketAuthority} from "../pda/solend";
import {Vault} from "../structs/vault";


export const createHarvestYieldIx = async (
  authority: PublicKey,
  vault: Vault,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {executor} = await getVaultInfo(vault.publicKey);
  const lendingMarketAuthority = await getLendingMarketAuthority(reserve.lendingMarket);
  return await program.methods
    .harvestYield()
    .accountsStrict({
      vault: vault.publicKey,
      executor,
      collateralVault: vault.collateralVault,
      reserve: reserve.publicKey,
      authority: authority,
      reserveLiquiditySupply: reserve.liquidity.supplyPubkey,
      reserveCollateralMint: reserve.collateral.mintPubkey,
      lendingMarket: reserve.lendingMarket,
      lendingMarketAuthority: lendingMarketAuthority,
      underlyingVault: vault.underlyingVault,
      lendingProgram: SOLEND_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();
}