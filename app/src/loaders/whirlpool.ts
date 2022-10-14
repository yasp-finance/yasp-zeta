import {Loader} from "./base";
import {WHIRLPOOL_PROGRAM_ID} from "../pubkeys";
import {Whirlpool, WhirlpoolLayout} from "../structs/whirlpool";


export class WhirlpoolLoader extends Loader {
  constructor(url: string) {
    super(url);
  }

  async preload() {
    const mapper = new Map();
    const pools = await this.forWhirlpools();
    pools.forEach(m => {
      mapper.set(m.publicKey.toString(), m)
    });
    return mapper
  }

  async forWhirlpools(): Promise<Whirlpool[]> {
    const accounts = await this.forProgramAccounts(
      WHIRLPOOL_PROGRAM_ID, {
        filters: [
          {dataSize: WhirlpoolLayout.byteSize}
        ]
      }
    );

    return this.deserialize(accounts, WhirlpoolLayout);
  }
}