import {SerumLoader} from "./loaders/serum";
import {SolendLoader} from "./loaders/solend";
import {ZetaMarketsLoader} from "./loaders/zeta-markets";
import {LAMPORTS_PER_SOL, PublicKey, Signer, Transaction, TransactionInstruction} from "@solana/web3.js";
import {
  createDepositIx,
  createHarvestYieldIx,
  createInitializeIx,
  createInitOpenOrdersIx,
  createRedeemZetaIx,
  createReinvestSolendIx,
  createReinvestZetaIx,
  createSwapToUnderlyingIx,
  createSwapToUSDCIx,
  createWithdrawIx
} from "./instructions";
import {Reserve} from "./structs/solend";
import {ZetaGroup} from "./structs/zeta-markets";
import BN from "bn.js";
import {Program} from "@project-serum/anchor";
import {VaultZeta} from "./artifacts/types/vault_zeta";
import {SerumMarket} from "./structs/serum";

export class Manager {
  private readonly serumLoader: SerumLoader;
  private readonly solendLoader: SolendLoader;
  private readonly zetaMarketsLoader: ZetaMarketsLoader;
  private readonly program: Program<VaultZeta>;

  mapper = new Map();

  constructor(url: string, program: Program<VaultZeta>) {
    this.serumLoader = new SerumLoader(url);
    this.solendLoader = new SolendLoader(url);
    this.zetaMarketsLoader = new ZetaMarketsLoader(url);
    this.program = program;
  }

  validate<T>(account: PublicKey): T {
    const data = this.mapper.get(account.toString());
    if (!data) {
      throw new Error(`account ${account.toString()} not found`)
    }
    return data;
  }

  async preload() {
    const serumMapper = await this.serumLoader.preload();
    const solendMapper = await this.solendLoader.preload();
    const zetaMarketsMapper = await this.zetaMarketsLoader.preload();
    this.mapper = new Map([
      ...serumMapper.entries(),
      ...solendMapper.entries(),
      ...zetaMarketsMapper.entries(),
    ]);
    return this.mapper;
  }

  async exec(ixs: TransactionInstruction[], signers: Signer[], simulate = false) {
    const connection = this.program.provider.connection;
    const tx = new Transaction().add(...ixs);
    const {blockhash} = await connection
      .getLatestBlockhash("confirmed");
    tx.recentBlockhash = blockhash;
    tx.feePayer = signers[0].publicKey;
    tx.sign(...signers);

    if (simulate) {
      return await connection.simulateTransaction(tx, signers);
    } else {
      return await connection.sendTransaction(tx, signers);
    }
  }

  async devnetAirdrop(sol: number, address: PublicKey) {
    const connection = this.program.provider.connection;
    return connection.requestAirdrop(address, sol * LAMPORTS_PER_SOL);
  }

  async createVault(
    depositLimit: BN,
    managementFeeBps: BN,
    authority: Signer,
    reserveAddress: PublicKey,
    groupAddress: PublicKey,
    simulate = false
  ) {
    const reserve = this.validate<Reserve>(reserveAddress);
    const group = this.validate<ZetaGroup>(groupAddress);
    return this.exec([
      await createInitializeIx(
        depositLimit,
        managementFeeBps,
        authority.publicKey,
        group,
        reserve,
        this.program
      ),
    ], [authority], simulate);
  }


  async deposit(
    amountOut: BN,
    authority: Signer,
    userTokenAccount: PublicKey,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const reserve = this.validate<Reserve>(data.reserve);
    return this.exec([
      await createDepositIx(
        amountOut,
        authority.publicKey,
        userTokenAccount,
        vault,
        data.collateralVault,
        reserve,
        this.program
      ),
    ], [authority], simulate);
  }


  async withdraw(
    amountOut: BN,
    authority: Signer,
    userTokenAccount: PublicKey,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const reserve = this.validate<Reserve>(data.reserve);
    return this.exec([
      await createWithdrawIx(
        amountOut,
        authority.publicKey,
        userTokenAccount,
        vault,
        data.collateralVault,
        reserve,
        this.program
      ),
    ], [authority], simulate);
  }

  async initOpenOrders(
    authority: Signer,
    vault: PublicKey,
    marketAddress: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const group = this.validate<ZetaGroup>(data.zetaGroup);
    const market = this.validate<SerumMarket>(marketAddress);
    return this.exec([
      await createInitOpenOrdersIx(
        authority.publicKey,
        vault,
        market,
        group,
        this.program
      ),
    ], [authority], simulate);
  }

  async harvestYield(
    authority: Signer,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const reserve = this.validate<Reserve>(data.reserve);
    return this.exec([
      await createHarvestYieldIx(
        authority.publicKey,
        vault,
        reserve,
        this.program
      ),
    ], [authority], simulate);
  }

  async redeemZeta(
    amount: BN,
    authority: Signer,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const group = this.validate<ZetaGroup>(data.zetaGroup);
    return this.exec([
      await createRedeemZetaIx(
        amount,
        authority.publicKey,
        vault,
        data.usdcVault,
        group,
        this.program
      ),
    ], [authority], simulate);
  }

  async reinvestZeta(
    authority: Signer,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const group = this.validate<ZetaGroup>(data.zetaGroup);
    return this.exec([
      await createReinvestZetaIx(
        authority.publicKey,
        vault,
        data.usdcVault,
        group,
        this.program
      ),
    ], [authority], simulate);
  }

  async reinvestSolend(
    amount: BN,
    authority: Signer,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const reserve = this.validate<Reserve>(data.reserve);
    return this.exec([
      await createReinvestSolendIx(
        amount,
        authority.publicKey,
        vault,
        data.collateralVault,
        data.underlyingVault,
        reserve,
        this.program
      ),
    ], [authority], simulate);
  }

  async swapToUnderlying(
    authority: Signer,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    return this.exec([
      await createSwapToUnderlyingIx(
        authority.publicKey,
        vault,
        this.program
      ),
    ], [authority], simulate);
  }

  async swapToUsdc(
    authority: Signer,
    vault: PublicKey,
    simulate = false
  ) {
    const data = await this.program.account.vault.fetch(vault);
    const reserve = this.validate<Reserve>(data.reserve);
    return this.exec([
      await createSwapToUSDCIx(
        authority.publicKey,
        vault,
        this.program
      ),
    ], [authority], simulate);
  }
}