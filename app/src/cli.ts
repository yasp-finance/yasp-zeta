import inquirer from 'inquirer';
import arg from 'arg';

import {Manager} from "./manager";
import {PublicKey, Signer} from "@solana/web3.js";
import {Reserve, Vault, ZetaGroup} from "./structs";
import {getProgramFromFile} from "./utils/get-program-from-file";
import {VaultZeta} from "./artifacts/types/vault_zeta";
import {getVault, getVaultInfo} from "./pda/vault";
import BN from "bn.js";
import {getOrCreateATA} from "../../tests/util";
const anchor = require('@project-serum/anchor');


const createVault = async (
  authority: Signer, manager: Manager, simulate: boolean
): Promise<string> => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'reserve',
      message: 'Reserve:',
      validate: async (input) => {
        manager.validate<Reserve>(new PublicKey(input));
        return true;
      }
    },
    {
      type: 'input',
      name: 'zeta',
      message: 'Zeta Group:',
      validate: async (input) => {
        manager.validate<ZetaGroup>(new PublicKey(input));
        return true;
      }
    },
    {
      type: 'input',
      name: 'limit',
      message: 'Deposit limit:',
      validate: async (input) => {
        return parseInt(input) > 0;
      }
    },
    {
      type: 'input',
      name: 'managementFeeBps',
      message: 'Management fee:',
      validate: async (input) => {
        const val = parseFloat(input);
        return val > 0 && val <= 1;
      }
    }
  ]);
  const vault = await getVault(
    new PublicKey(answers.reserve),
    new PublicKey(answers.zeta),
    authority.publicKey
  );
  try {
    manager.validate(vault);
    console.log("That vault is already exists");
    return ""
  } catch {
    const {sharesMint, executor} = await getVaultInfo(vault);
    console.table({
      reserve: answers.reserve,
      zeta: answers.zeta,
      authority: authority.publicKey.toString(),
      newVault: vault.toString(),
      depositLimit: answers.limit,
      fee: answers.managementFeeBps,
      executor: executor.toString(),
      sharesMint: sharesMint.toString()
    });
  }
  const correct = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isCorrect',
      message: 'Correct?',
    }
  ]);
  if (!correct.isCorrect) {
    return "";
  }
  console.log("[*] Creating new Vault..");
  const reserve = manager.validate<Reserve>(new PublicKey(answers.reserve));
  const response = await manager.createVault(
    new BN(+answers.limit * 10 ** reserve.liquidity.mintDecimals),
    new BN(+answers.managementFeeBps * 10000),
    authority,
    new PublicKey(answers.reserve),
    new PublicKey(answers.zeta),
    simulate
  );
  console.log(`[+] Vault "${vault.toString()}" was created!`);
  return response;
}

const deposit = async (
  authority: Signer, manager: Manager, simulate: boolean
) => {
  const vaults = await manager.updateVaults();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vault',
      message: 'Vault:',
      choices: [...vaults.keys()]
    },
    {
      type: 'input',
      name: 'deposit',
      message: 'Deposit amount:',
      validate: async (input) => {
        return parseFloat(input) > 0;
      }
    }
  ]);
    console.table({
      vault: answers.vault.toString(),
      deposit: answers.deposit,
    });
  const correct = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isCorrect',
      message: 'Correct?',
    }
  ]);
  if (!correct.isCorrect) {
    return "";
  }
  console.log("[*] Depositing..");
  const vault = manager.validate<Vault>(new PublicKey(answers.vault));
  const {sharesMint} = await getVaultInfo(vault.publicKey);
  const reserve = manager.validate<Reserve>(vault.reserve);
  const userAccount = await getOrCreateATA(
    reserve.liquidity.mintPubkey,
    manager.program.provider,
    authority.publicKey
  );
  const userShares = await getOrCreateATA(
    sharesMint,
    manager.program.provider,
    authority.publicKey
  );
  return manager.deposit(
    new BN(+answers.deposit * 10 ** reserve.liquidity.mintDecimals),
    authority,
    userAccount.address,
    userShares.address,
    new PublicKey(answers.vault),
    simulate
  );
}

const withdraw = async (authority: Signer, manager: Manager, simulate: boolean) => {
  const vaults = await manager.updateVaults();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vault',
      message: 'Vault:',
      choices: [...vaults.keys()]
    },
    {
      type: 'input',
      name: 'withdraw',
      message: 'Withdraw amount:',
      validate: async (input) => {
        return parseFloat(input) > 0;
      }
    }
  ]);
  console.table({
    vault: answers.vault.toString(),
    withdraw: answers.withdraw,
  });
  const correct = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isCorrect',
      message: 'Correct?',
    }
  ]);
  if (!correct.isCorrect) {
    return "";
  }
  console.log("[*] Withdrawing..");
  const vault = manager.validate<Vault>(new PublicKey(answers.vault));
  const {sharesMint} = await getVaultInfo(vault.publicKey);
  const reserve = manager.validate<Reserve>(vault.reserve);
  const userAccount = await getOrCreateATA(
    reserve.liquidity.mintPubkey,
    manager.program.provider,
    authority.publicKey
  );
  const userShares = await getOrCreateATA(
    sharesMint,
    manager.program.provider,
    authority.publicKey
  );
  return manager.withdraw(
    new BN(answers.withdraw * 10 ** 9),
    authority,
    userAccount.address,
    userShares.address,
    new PublicKey(answers.vault),
    simulate
  );
}

const harvestYield = async (authority: Signer, manager: Manager, simulate: boolean) => {
  const vaults = await manager.updateVaults();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vault',
      message: 'Vault:',
      choices: [...vaults.keys()]
    }
  ]);
  return manager.harvestYield(
    authority,
    new PublicKey(answers.vault)
  );
}

const reinvestZeta = async (authority: Signer, manager: Manager, simulate: boolean) => {
  const vaults = await manager.updateVaults();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vault',
      message: 'Vault:',
      choices: [...vaults.keys()]
    }
  ]);
  return manager.reinvestZeta(
    authority,
    new PublicKey(answers.vault)
  );
}

const reinvestSolend = async (authority: Signer, manager: Manager, simulate: boolean) => {
  const vaults = await manager.updateVaults();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vault',
      message: 'Vault:',
      choices: [...vaults.keys()]
    }
  ]);
  return manager.reinvestSolend(
    authority,
    new PublicKey(answers.vault)
  );
}

const redeemZeta = async (authority: Signer, manager: Manager, simulate: boolean) => {
  const vaults = await manager.updateVaults();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vault',
      message: 'Vault:',
      choices: [...vaults.keys()]
    }
  ]);
  return manager.harvestYield(
    authority,
    new PublicKey(answers.vault)
  );
}

const bidOrder = async (authority: Signer, manager: Manager, simulate: boolean) => {
  const vaults = await manager.updateVaults();
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'vault',
      message: 'Vault:',
      choices: [...vaults.keys()]
    },
    {
      type: 'input',
      name: 'strike',
      message: 'Strike price:',
      validate: async (input) => {
        return parseInt(input) > 0;
      },
    },
    {
      type: 'list',
      name: 'kind',
      message: 'Kind:',
      choices: ["put", "call"]
    }
  ]);
  return await manager.bidOrder(
    new BN(answers.strike),
    answers.kind,
    authority,
    new PublicKey(answers.vault)
  );
}


const parseArguments = () => {
  const args = arg(
    {
      '--simulate': Boolean,
      '--url': String,
      '-s': '--simulate',
      '-u': '--url'
    }
  );
  return {
    simulate: args['--simulate'] || false,
    rpcUrl: args['--url'] || "http://127.0.0.1:8899",
    action: args._[0],
  };
}

const main = async () => {
  const options = parseArguments();
  const provider = anchor.AnchorProvider.local(options.rpcUrl);
  anchor.setProvider(provider);
  const program = getProgramFromFile<VaultZeta>(
    'vault_zeta',
    new PublicKey('CXeQdAb6PZHSEwtHQNQafDSxpSfVhG9JWhebsrwzP1Q8'),
    provider,
  );
  await provider.connection.getLatestBlockhash();
  const manager = new Manager(options.rpcUrl, program);
  await manager.preload();
  const authority = provider.wallet.payer;
  const actionFn = {
    "create-vault": createVault,
    "deposit": deposit,
    "withdraw": withdraw,
    "harvest-yield": harvestYield,
    "reinvest-zeta": reinvestZeta,
    "redeem-zeta": redeemZeta,
    "reinvest-solend": reinvestSolend,
    "bid-order": bidOrder,
  }[options.action];
  if (!actionFn) {
    console.log(`command "${options.action}" not found`);
    return;
  }
  const response = await actionFn(authority, manager, options.simulate);
  console.log(response);
}

(main)()