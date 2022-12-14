import {Program} from "@project-serum/anchor";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import BN from "bn.js";
import {TOKEN_PROGRAM_ID, SOLEND_PROGRAM_ID} from "../pubkeys";
import {getVaultInfo} from "../pda/vault";
import {Reserve} from "../structs/solend";
import {getLendingMarketAuthority} from "../pda/solend";
import {Vault} from "../structs/vault";


export const createDepositIx = async (
  amountIn: BN,
  authority: PublicKey,
  userTokenAccount: PublicKey,
  userShares: PublicKey,
  vault: Vault,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const {sharesMint, executor} = await getVaultInfo(vault.publicKey);
  const lendingMarketAuthority = await getLendingMarketAuthority(reserve.lendingMarket);
  return await program.methods
    .deposit(amountIn)
    .accountsStrict({
      vault: vault.publicKey,
      sharesMint,
      executor,
      reserve: reserve.publicKey,
      userShares,
      userTokenAccount,
      userAccount: authority,
      collateralVault: vault.collateralVault,
      reserveLiquiditySupply: reserve.liquidity.supplyPubkey,
      reserveCollateralMint: reserve.collateral.mintPubkey,
      lendingMarket: reserve.lendingMarket,
      lendingMarketAuthority,
      tokenProgram: TOKEN_PROGRAM_ID,
      lendingProgram: SOLEND_PROGRAM_ID
    })
    .instruction();
}