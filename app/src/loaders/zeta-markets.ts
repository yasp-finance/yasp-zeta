import {Loader} from "./base";
import {ZETA_PROGRAM_ID} from "../pubkeys";
import {ZetaGroup, ZetaGroupLayout} from "../structs/zeta-markets";

export class ZetaMarketsLoader extends Loader {
  constructor(url: string) {
    super(url);
  }

  async preload() {
    const mapper = new Map();
    const groups = await this.forGroups();
    groups.forEach(g => {
      mapper.set(g.publicKey.toString(), g)
    });
    return mapper
  }

  async forGroups(): Promise<ZetaGroup[]> {
    const accounts = await this.forProgramAccounts(
      ZETA_PROGRAM_ID, {
        filters: [
          {dataSize: ZetaGroupLayout.byteSize}
        ]
      }
    );
    return this.deserialize(accounts, ZetaGroupLayout);
  }
}