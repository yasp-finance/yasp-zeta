import inquirer from 'inquirer';
import arg from 'arg';

import {Manager} from "./manager";
import {PublicKey, Signer} from "@solana/web3.js";
import {Reserve, ZetaGroup} from "./structs";
import {getProgramFromFile} from "./utils/get-program-from-file";
import {VaultZeta} from "./artifacts/types/vault_zeta";
import {getVault} from "./pda/vault";
import BN from "bn.js";
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
    console.table({
      reserve: answers.reserve,
      zeta: answers.zeta,
      authority: authority.publicKey.toString(),
      newVault: vault.toString(),
      depositLimit: answers.limit,
      fee: answers.managementFeeBps
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
  const response = await manager.createVault(
    new BN(answers.limit),
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
        return parseInt(input) > 0;
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
  return manager.deposit(
    new BN(answers.deposit),
    authority,
    new PublicKey(answers.vault),
    new PublicKey(answers.vault),
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
        return parseInt(input) > 0;
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
  console.log("[*] Withdrawing..");
  return manager.withdraw(
    new BN(answers.withdraw),
    authority,
    new PublicKey(answers.vault),
    new PublicKey(answers.vault),
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
    },
    {
      type: 'input',
      name: 'amount',
      message: 'Reinvest amount:',
      validate: async (input) => {
        return parseInt(input) > 0;
      }
    }
  ]);
  return manager.reinvestSolend(
    new BN(answers.amount),
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
      }
    }
  ]);
  const put = await manager.bidOrder(
    answers.strike,
    "put",
    authority,
    new PublicKey(answers.vault)
  );
  const call = await manager.bidOrder(
    answers.strike,
    "call",
    authority,
    new PublicKey(answers.vault)
  );
  return {call, put};
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