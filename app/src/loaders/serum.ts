import {Loader} from "./base";
import {MarketLayout, SerumMarket} from "../structs/serum";
import {SERUM_PROGRAM_ID_V3} from "../pubkeys";

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
    return mapper
  }

  async forMarkets(): Promise<SerumMarket[]> {
    const accounts = await this.forProgramAccounts(
      SERUM_PROGRAM_ID_V3, {
        filters: [
          {dataSize: MarketLayout.byteSize}
        ]
      }
    );

    return this.deserialize(accounts, MarketLayout);
  }
}