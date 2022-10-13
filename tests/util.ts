import {Connection, PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js";
import {
  Account,
  getAccount,
} from '@solana/spl-token';
import {Provider} from "@project-serum/anchor";
import {createAssociatedTokenAccountInstruction} from "../app/src/utils/create-associated-account-ix";
import {ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID} from "../app/src/pubkeys";



async function findATA(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey,
): Promise<PublicKey> {
  const pda = await PublicKey.findProgramAddress(
    [
      walletAddress.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      tokenMintAddress.toBuffer(),
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  return pda[0];
}

const getBlockHash = async (connection: Connection): Promise<string> => {
  const version = await connection.getVersion();
  if (version['solana-core'].startsWith('1.8')) {
    const { blockhash } = await connection.getRecentBlockhash('processed');
    return blockhash;
  }
  const { blockhash } = await connection.getLatestBlockhash('processed');
  return blockhash;
};

const executeTxs = async (
  txs: Transaction[] | TransactionInstruction[],
  provider: Provider,
): Promise<ReturnType<typeof provider.connection.confirmTransaction>> => {
  const transaction = new Transaction().add(...txs);
  transaction.feePayer = provider.wallet.publicKey;
  transaction.recentBlockhash = await getBlockHash(provider.connection);

  const signedTx = await provider.wallet.signTransaction(transaction);
  const txId = await provider.connection.sendRawTransaction(
    signedTx.serialize(),
  );
  return await provider.connection.confirmTransaction(txId);
};

export const getOrCreateATA = async (
  mint: PublicKey,
  provider: Provider,
  recipient?: PublicKey,
): Promise<Account> => {
  //@ts-ignore
  const { wallet: owner, connection } = provider;
  recipient ||= owner.publicKey;
  const ata = await findATA(recipient, mint);
  let account = await getAccount(connection, ata).catch(() => null);
  if (account !== null) return account;
  await executeTxs(
    [
      createAssociatedTokenAccountInstruction(
        owner.publicKey,
        ata,
        recipient,
        mint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      ),
    ],
    provider,
  );
  account = await getAccount(connection, ata).catch(() => null);
  if (!account) throw new Error("Account isn't created");
  if (!account.mint.equals(mint)) throw new Error('Invalid mint');
  if (!account.owner.equals(recipient)) throw new Error('Invalid owner');

  return account;
};