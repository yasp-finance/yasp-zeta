import {Loader} from "./base";
import {VAULT_ZETA_PROGRAM_ID} from "../pubkeys";
import {Vault, VaultLayout} from "../structs/vault";



export class VaultLoader extends Loader {
  constructor(url: string) {
    super(url);
  }

  async preload() {
    const mapper = new Map();
    const vaults = await this.forVaults();
    vaults.forEach(m => {
      mapper.set(m.publicKey.toString(), m)
    });
    return mapper
  }

  async forVaults(): Promise<Vault[]> {
    const accounts = await this.forProgramAccounts(
      VAULT_ZETA_PROGRAM_ID, {
        filters: [
          {dataSize: VaultLayout.byteSize}
        ]
      }
    );
    return this.deserialize(accounts, VaultLayout);
  }
}