import {
  Connection,
  GetMultipleAccountsConfig,
  GetProgramAccountsConfig,
  KeyedAccountInfo, Message,
  PublicKey, Signer, Transaction, TransactionInstruction, VersionedTransaction
} from "@solana/web3.js";
import {BeetStruct} from "@metaplex-foundation/beet";

export class Loader {
  private readonly connection: Connection;

  constructor(url: string) {
    this.connection = new Connection(url);
  }

  async preload<T>(): Promise<Map<string, T>> {
    return new Map();
  }

  deserialize<T>(accounts: KeyedAccountInfo[], struct: BeetStruct<T>): T[] {
    return accounts.map(account => {
      return {
        publicKey: account.accountId,
        ...struct.deserialize(account.accountInfo.data)[0]
      };
    });
  }

  async forProgramAccounts(
    program: PublicKey,
    config: GetProgramAccountsConfig = {}
  ): Promise<KeyedAccountInfo[]> {
    const cfg = Object.assign(
      {encoding: 'base64', commitment: 'single'},
      config
    )
    const response = await this.connection.getProgramAccounts(
      program,
      cfg
    );
    return response.map((account) => {
      return {accountId: account.pubkey, accountInfo: account.account}
    });
  }

  async forMultipleAccountInfos(
    accounts: PublicKey[],
    config: GetMultipleAccountsConfig = {}
  ): Promise<KeyedAccountInfo[]> {
    if (accounts.length > 100) {
      throw new Error(`Maximum batch size: 100 accounts per request`)
    }
    const cfg = Object.assign(
      {encoding: 'base64', commitment: 'single'},
      config
    )
    const response = await this.connection.getMultipleAccountsInfoAndContext(
      accounts,
      cfg
    );
    return accounts.map((account, i) => {
      return {accountId: account, accountInfo: response.value[i]}
    });
  }

  async forAccountInfo(address: PublicKey) {
    return this.connection.getAccountInfo(address, "single");
  }
}