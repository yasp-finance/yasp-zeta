import {PublicKey} from "@solana/web3.js";
import {Reserve, RESERVE_REAL_SIZE, ReserveLayout} from "../structs/solend";
import {SOLEND_PROGRAM_ID} from "../pubkeys";
import {Loader} from "./base";

export class SolendLoader extends Loader {
  constructor(url: string) {
    super(url);
  }

  async preload() {
    const mapper = new Map();
    const reserves = await this.forReserves();
    reserves.forEach(r => {
      mapper.set(r.publicKey.toString(), r)
    });
    return mapper
  }

  async forReserves(lendingMarket?: PublicKey): Promise<Reserve[]> {
    let filters: any = [{dataSize: RESERVE_REAL_SIZE}];
    if (lendingMarket) {
      filters.push({
        memcmp: {offset: 1 + 9, bytes: lendingMarket.toString()}
      });
    }
    const accounts = await this.forProgramAccounts(
      SOLEND_PROGRAM_ID,
      {filters}
    );

    return this.deserialize(accounts, ReserveLayout);
  }

  // forLendingMarkets(): Promise<LendingMarket[]> {
  //
  // }
  //
  // forLendingMarket(address: PublicKey): Promise<LendingMarket> {
  //
  // }
}