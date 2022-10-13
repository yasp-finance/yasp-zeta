import {Loader} from "./base";
import {MarketLayout, SerumMarket} from "../structs/serum";
import {ZETA_SERUM_PROGRAM_ID} from "../pubkeys";

export class SerumLoader extends Loader {
  constructor(url: string) {
    super(url);
  }

  async preload() {
    const mapper = new Map();
    const markets = await this.forMarkets();
    markets.forEach(m => {
      mapper.set(m.publicKey.toString(), m)
    });
    console.log(markets[0].baseMint.toString());
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
    console.log("expect", MarketLayout.byteSize);
    console.log("all", new Set(accounts.map(a => a.accountInfo.data.length)));

    return this.deserialize(accounts, MarketLayout);
  }
}