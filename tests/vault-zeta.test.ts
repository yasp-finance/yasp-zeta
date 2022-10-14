/* eslint-disable @typescript-eslint/no-var-requires */
import {getProgramFromFile} from '../app/src/utils/get-program-from-file';
import {Manager} from '../app/src/manager';
import {VaultZeta} from '../target/types/vault_zeta';
import {
  Keypair,
  PublicKey, Signer,
} from '@solana/web3.js';
import BN from "bn.js";
import {getVault, getVaultInfo} from "../app/src/pda/vault";
import {getOrCreateATA} from "./util";
import {SOL_MINT, USDC_MINT} from "../app/src/pubkeys";
import {mintTo, syncNative} from "@solana/spl-token";
import {Vault} from "../app/src/structs/vault";

const anchor = require('@project-serum/anchor');
const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

describe('Vault Zeta Markets + Solend', function () {
  const program = getProgramFromFile<VaultZeta>(
    'vault_zeta',
    new PublicKey('CXeQdAb6PZHSEwtHQNQafDSxpSfVhG9JWhebsrwzP1Q8'),
    provider,
  );
  // @ts-ignore
  const authority = program.provider.wallet.payer as Signer;
  const user = Keypair.generate();
  const evil = Keypair.generate();
  const manager = new Manager("http://localhost:8899/", program);
  let vaultUSDC, vaultSOL;

  before(async () => {
    await manager.preload();
    await manager.devnetAirdrop(10, authority.publicKey);
    await manager.devnetAirdrop(10, user.publicKey);
    await manager.devnetAirdrop(10, evil.publicKey);
    vaultUSDC = await getVault(
      new PublicKey("BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw"),
      new PublicKey("HPnqfiRSVvuBjfHN9ah4Kecb6J9et2UTnNgUwtAJdV26"),
      authority.publicKey
    );
    vaultSOL = await getVault(
      new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36"),
      new PublicKey("HPnqfiRSVvuBjfHN9ah4Kecb6J9et2UTnNgUwtAJdV26"),
      authority.publicKey
    );
  });

  describe("cUSDC vault", () => {
    it('should initialize cUSDC vault', async () => {
      const data = await manager.createVault(
        new BN(10 ** 13),
        new BN(1000),
        authority,
        new PublicKey("BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw"),
        new PublicKey("HPnqfiRSVvuBjfHN9ah4Kecb6J9et2UTnNgUwtAJdV26"),
      );
      console.log(data);
    });
    it('should deposit to cUSDC vault', async () => {
      const {sharesMint} = await getVaultInfo(vaultUSDC);
      const userAccount = await getOrCreateATA(
        USDC_MINT,
        provider,
        user.publicKey
      );
      const userShares = await getOrCreateATA(
        sharesMint,
        provider,
        user.publicKey
      );
      await mintTo(
        provider.connection,
        authority,
        USDC_MINT,
        userAccount.address,
        authority,
        10 ** 12,
        [],
        {commitment: "confirmed"}
      );
      await manager.updateVaults();
      const data = await manager.deposit(
        new BN(10 ** 12),
        user,
        userAccount.address,
        userShares.address,
        vaultUSDC,
      );
      console.log(data);
    });
    it('should withdraw from cUSDC vault', async () => {
      const {sharesMint} = await getVaultInfo(vaultUSDC);
      const userAccount = await getOrCreateATA(
        USDC_MINT,
        provider,
        user.publicKey
      );
      const userShares = await getOrCreateATA(
        sharesMint,
        provider,
        user.publicKey
      );
      const data = await manager.withdraw(
        new BN(userShares.amount.toString()).muln(9).divn(10),
        user,
        userAccount.address,
        userShares.address,
        vaultUSDC,
      );
      console.log(data);
    });
    it('should harvest yield from cUSDC vault', async () => {
      const data = await manager.harvestYield(
        authority,
        vaultUSDC,
      );
      console.log(data);
    });
    it('should reinvest zeta from cUSDC vault', async () => {
      const vaultData = await manager.validate<Vault>(vaultUSDC);

      await mintTo(
        provider.connection,
        authority,
        USDC_MINT,
        vaultData.usdcVault,
        authority,
        10 ** 9
      );
      const data = await manager.reinvestZeta(
        authority,
        vaultUSDC
      );
      console.log(data);
    });
    it('should place bets on Zeta Markets', async () => {
      const data = await manager.bidOrder(
        new BN(1300 * 10 ** 6), // 1 ETH -> 1300 usd
        "call",
        authority,
        vaultUSDC
      );
      console.log(data);
    });
    it('should redeem from Zeta Markets', async () => {
      const data = await manager.redeemZeta(
        new BN(100000),
        authority,
        vaultUSDC
      );
      console.log(data);
    });
    it('should reinvest to cUSDC vault', async () => {
      const vaultData = await manager.validate<Vault>(vaultUSDC);

      await mintTo(
        provider.connection,
        authority,
        USDC_MINT,
        vaultData.underlyingVault,
        authority,
        10 ** 9
      );
      const data = await manager.reinvestSolend(
        new BN(10 ** 9),
        authority,
        vaultUSDC
      );
      console.log(data);
    });
  });

  describe("cSOL vault", () => {
    it('should initialize cSOL vault', async () => {
      const data = await manager.createVault(
        new BN(10 ** 13),
        new BN(1000),
        authority,
        new PublicKey("8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36"),
        new PublicKey("HPnqfiRSVvuBjfHN9ah4Kecb6J9et2UTnNgUwtAJdV26"),
      );
      console.log(data);
    });
    it('should deposit to cSOL vault', async () => {
      const {sharesMint} = await getVaultInfo(vaultSOL);
      const userAccount = await getOrCreateATA(
        SOL_MINT,
        provider,
        user.publicKey
      );
      const userShares = await getOrCreateATA(
        sharesMint,
        provider,
        user.publicKey
      );
      await manager.devnetAirdrop(10000, userAccount.address);
      await syncNative(
        provider.connection,
        authority,
        userAccount.address,
        {commitment: "confirmed"}
      )
      await manager.updateVaults();
      const data = await manager.deposit(
        new BN(10 ** 12),
        user,
        userAccount.address,
        userShares.address,
        vaultSOL,
      );
      console.log(data);
    });
    it('should withdraw from cSOL vault', async () => {
      const {sharesMint} = await getVaultInfo(vaultSOL);
      const userAccount = await getOrCreateATA(
        SOL_MINT,
        provider,
        user.publicKey
      );
      const userShares = await getOrCreateATA(
        sharesMint,
        provider,
        user.publicKey
      );
      const data = await manager.withdraw(
        new BN(userShares.amount.toString()).muln(9).divn(10),
        user,
        userAccount.address,
        userShares.address,
        vaultSOL,
      );
      console.log(data);
    });
    it('should harvest yield from cSOL vault', async () => {
      const data = await manager.harvestYield(
        authority,
        vaultSOL,
      );
      console.log(data);
    });
    it('should swap usdc to underlying', async () => {
      const vaultData = await manager.validate<Vault>(vaultSOL);
      await mintTo(
        provider.connection,
        authority,
        USDC_MINT,
        vaultData.usdcVault,
        authority,
        10 ** 6
      );

      const data = await manager.swapToUnderlying(
        authority,
        vaultSOL,
        new PublicKey("HJPjoWUrhoZzkNfRpHuieeFk9WcZWjwy6PBjZ81ngndJ")
      );
      console.log(data);
    });

    it('should swap underlying to usdc', async () => {
      const data = await manager.swapToUsdc(
        authority,
        vaultSOL,
        new PublicKey("HJPjoWUrhoZzkNfRpHuieeFk9WcZWjwy6PBjZ81ngndJ")
      );
      console.log(data);
    });

    it('should reinvest zeta from cSOL vault', async () => {
      const vaultData = await manager.validate<Vault>(vaultSOL);

      await mintTo(
        provider.connection,
        authority,
        USDC_MINT,
        vaultData.usdcVault,
        authority,
        10 ** 9
      );
      const data = await manager.reinvestZeta(
        authority,
        vaultSOL
      );
      console.log(data);
    });
    it('should place bets on Zeta Markets', async () => {
      const data = await manager.bidOrder(
        new BN(1300 * 10 ** 6), // 1 ETH -> 1300 usd
        "call",
        authority,
        vaultSOL
      );
      console.log(data);
    });
    it('should redeem from Zeta Markets', async () => {
      const data = await manager.redeemZeta(
        new BN(100000),
        authority,
        vaultSOL
      );
      console.log(data);

    });
    it('should reinvest to cSOL vault', async () => {
      const vaultData = await manager.validate<Vault>(vaultSOL);

      await manager.devnetAirdrop(10, vaultData.underlyingVault);
      await syncNative(
        provider.connection,
        authority,
        vaultData.underlyingVault,
        {commitment: "confirmed"}
      )
      const data = await manager.reinvestSolend(
        new BN(10 ** 9),
        authority,
        vaultSOL
      );
      console.log(data);
    });
  });
});
