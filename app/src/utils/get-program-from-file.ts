import {Idl, Program, Provider} from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";
import {join} from "path";
import {readFileSync} from "fs";

export const getProgramFromFile = <T extends Idl>(
  filename: string,
  programId: PublicKey,
  provider?: Provider,
): Program<T> => {
  const idlFilePath = join(__dirname, `../artifacts/idl/${filename}.json`);
  const idlFile = readFileSync(idlFilePath, 'utf8');
  const idl = JSON.parse(idlFile);
  return new Program(idl, programId, provider);
};