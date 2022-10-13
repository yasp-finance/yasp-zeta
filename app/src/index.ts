import {
  PublicKey, Signer
} from "@solana/web3.js";
import {Manager} from "./manager";
import {getProgramFromFile} from "./utils/get-program-from-file";
import {VAULT_ZETA_PROGRAM_ID, ZETA_PROGRAM_ID} from "./pubkeys";
import {VaultZeta} from "./artifacts/types/vault_zeta";
import BN from "bn.js";

const rpcUrl = "https://api.devnet.solana.com";

const anchor = require('@project-serum/anchor');
const provider = anchor.AnchorProvider.local(rpcUrl);
anchor.setProvider(provider);



const main = async () => {
  const program = getProgramFromFile<VaultZeta>(
    "vault_zeta",
    VAULT_ZETA_PROGRAM_ID,
    provider
  );
  const manager = new Manager(rpcUrl, program);
  await manager.preload();
  const authority = provider.wallet.payer as Signer;
  // await manager.devnetAirdrop(2, authority.publicKey);
  // USDC reserve?
  const reserve = new PublicKey("EjUgEaPpKMg2nqex9obb46gZQ6Ar9mWSdVKbw9A6PyXA");
  const group = new PublicKey("HPnqfiRSVvuBjfHN9ah4Kecb6J9et2UTnNgUwtAJdV26");

  // console.log(await manager.createVault(
  //   new BN(10 ** 10), new BN(100),
  //   authority, reserve, group, true
  // ));
  // console.log(await manager.deposit(
  //   new BN(10 ** 10), new BN(100),
  //   authority, reserve, group, true
  // ));
  // console.log(await manager.withdraw(
  //   new BN(10 ** 10), new BN(100),
  //   authority, reserve, group, true
  // ));
  // const program = getProgramFromFile<VaultZeta>(
  //   'vault_zeta',
  //   new PublicKey('GSNE8nVJ4WYCryAbugFZW7Jiw1VdeDvV1MG2VNqK4S3V'),
  //   provider,
  // );
  // // @ts-ignore
  // const payer = program.provider.wallet.payer;
  // const resp = await program.methods
  //   .bidOrder(new BN(0), new BN(0))
  //   .accountsStrict({
  //     vault: payer.publicKey,
  //     executor: payer.publicKey,
  //     authority: payer.publicKey,
  //     marginAccount: payer.publicKey,
  //     zetaGroup: payer.publicKey,
  //     zetaProgram: payer.publicKey,
  //     rent: payer.publicKey,
  //     tokenProgram: payer.publicKey,
  //     userTokenAccount: payer.publicKey,
  //     state: payer.publicKey,
  //     dexProgram: payer.publicKey,
  //     openOrders: payer.publicKey,
  //     market: payer.publicKey,
  //     serumAuthority: payer.publicKey,
  //     oracle: payer.publicKey,
  //     zetaVault: payer.publicKey,
  //     socializedLossAccount: payer.publicKey,
  //     greeks: payer.publicKey,
  //     requestQueue: payer.publicKey,
  //     eventQueue: payer.publicKey,
  //     bids: payer.publicKey,
  //     asks: payer.publicKey,
  //     coinVault: payer.publicKey,
  //     pcVault: payer.publicKey,
  //     coinWallet: payer.publicKey,
  //     pcWallet: payer.publicKey,
  //     marketNode: payer.publicKey,
  //     marketMint: payer.publicKey,
  //     mintAuthority: payer.publicKey
  //   }).signers([payer]).simulate();
  // console.log(resp)
}

(main)();