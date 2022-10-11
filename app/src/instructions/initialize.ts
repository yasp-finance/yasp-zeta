import {Program} from "@project-serum/anchor";
import {PublicKey, SYSVAR_RENT_PUBKEY, TransactionInstruction} from "@solana/web3.js";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import BN from "bn.js";
import {TOKEN_PROGRAM_ID, SYSTEM_PROGRAM_ID, ZETA_PROGRAM_ID} from "../pubkeys";
import {getVault, getVaultInfo} from "../pda/vault";
import {getATA} from "../pda/token";
import {Reserve} from "../structs/solend";
import {ZetaGroup} from "../structs/zeta-markets";
import {getMarginAccount} from "../pda/zeta-markets";


export const createInitializeIx = async (
  depositLimit: BN,
  managementFeeBps: BN,
  authority: PublicKey,
  group: ZetaGroup,
  reserve: Reserve,
  program: Program<VaultZeta>
): Promise<TransactionInstruction> => {
  const vault = await getVault(reserve.publicKey, group.publicKey, authority);
  const {sharesMint, executor} = await getVaultInfo(vault);
  const collateralVault = await getATA(executor, reserve.collateral.mintPubkey);
  const rewardVault = await getATA(executor, reserve.liquidity.mintPubkey);
  const marginAccount = await getMarginAccount(
    group.publicKey,
    vault
  );
  return await program.methods
    .initialize(depositLimit, managementFeeBps)
    .accountsStrict({
      vault,
      sharesMint,
      executor,
      collateralVault,
      rewardVault,
      reserve: reserve.publicKey,
      authority,
      marginAccount,
      zetaGroup: group.publicKey,
      zetaProgram: ZETA_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SYSTEM_PROGRAM_ID
    })
    .instruction();
}