import {Loader} from "./base";
import {MarketLayout, SerumMarket} from "../structs/serum";
import {ZETA_SERUM_PROGRAM_ID} from "../pubkeys";
import {VaultZeta} from "../artifacts/types/vault_zeta";
import {Program} from "@project-serum/anchor";


export class VaultLoader extends Loader {
  constructor(url: string, program: Program<VaultZeta>) {
    super(url);
  }

  async preload() {
    const mapper = new Map();
    const markets = await this.forMarkets();
    markets.forEach(m => {
      mapper.set(m.publicKey.toString(), m)
    });
    return mapper
  }

  async forMarkets(): Promise<SerumMarket[]> {
    const accounts = await this.forProgramAccounts(
      ZETA_SERUM_PROGRAM_ID, {
        filters: [
          {dataSize: MarketLayout.byteSize}
        ]
      }
    );

    return this.deserialize(accounts, MarketLayout);
  }

  // forLendingMarkets(): Promise<LendingMarket[]> {
  //
  // }
  //
  // forLendingMarket(address: PublicKey): Promise<LendingMarket> {
  //
  // }
}