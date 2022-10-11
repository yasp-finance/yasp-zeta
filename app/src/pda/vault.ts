import {PublicKey} from "@solana/web3.js";
import {VAULT_ZETA_PROGRAM_ID} from "../pubkeys";

export const getVault = async (reserve: PublicKey, group: PublicKey, admin: PublicKey, programId = VAULT_ZETA_PROGRAM_ID) => {
  const [vault] = await PublicKey.findProgramAddress(
    [
      Buffer.from('vault'),
      reserve.toBuffer(),
      group.toBuffer(),
      admin.toBuffer(),
    ],
    programId
  );

  return vault;
}

export const getVaultInfo = async (vault: PublicKey, programId = VAULT_ZETA_PROGRAM_ID) => {
  const [sharesMint] = await PublicKey.findProgramAddress(
    [Buffer.from('shares'), vault.toBuffer()],
    programId
  );

  const [executor] = await PublicKey.findProgramAddress(
    [Buffer.from('executor'), vault.toBuffer()],
    programId
  );

  return {vault, sharesMint, executor};
}