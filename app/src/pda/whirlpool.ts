import {PublicKey} from "@solana/web3.js";
import {Whirlpool} from "../structs/whirlpool";
import {WHIRLPOOL_PROGRAM_ID} from "../pubkeys";

export const MAX_TICK_INDEX = 443636;
export const MIN_TICK_INDEX = -443636;
export const TICK_ARRAY_SIZE = 88;


export const getStartTickIndex = (tickIndex: number, tickSpacing: number, offset = 0): number => {
  const realIndex = Math.floor(tickIndex / tickSpacing / TICK_ARRAY_SIZE);
  const startTickIndex = (realIndex + offset) * tickSpacing * TICK_ARRAY_SIZE;

  const ticksInArray = TICK_ARRAY_SIZE * tickSpacing;
  const minTickIndex = MIN_TICK_INDEX - ((MIN_TICK_INDEX % ticksInArray) + ticksInArray);
  if (startTickIndex < minTickIndex) {
    throw new Error("startTickIndex is too small");
  }
  if (startTickIndex > MAX_TICK_INDEX) {
    throw new Error("startTickIndex is too large");
  }
  return startTickIndex;
}

export const getTickArray = (programId: PublicKey, whirlpoolAddress: PublicKey, startTick: number) => {
  return PublicKey.findProgramAddress(
    [
      Buffer.from("tick_array"),
      whirlpoolAddress.toBuffer(),
      Buffer.from(startTick.toString()),
    ],
    programId
  );
}

export const getTickArrayFromTickIndex = (
  tickIndex: number,
  tickSpacing: number,
  whirlpool: PublicKey,
  tickArrayOffset = 0,
  programId = WHIRLPOOL_PROGRAM_ID,
) => {
  const startIndex = getStartTickIndex(tickIndex, tickSpacing, tickArrayOffset);
  return getTickArray(
    programId,
    whirlpool,
    startIndex
  );
}

export const getTickArrayFromWhirlpool = (
  whirlpool: Whirlpool,
  tickArrayOffset = 0,
  programId = WHIRLPOOL_PROGRAM_ID,
) => {
  return getTickArrayFromTickIndex(
    whirlpool.tickCurrentIndex,
    whirlpool.tickSpacing,
    whirlpool.publicKey,
    tickArrayOffset,
    programId,
  )
}

export const getOracle = (
  whirlpoolAddress: PublicKey,
  programId = WHIRLPOOL_PROGRAM_ID,
  ) => {
  return PublicKey.findProgramAddress(
    [Buffer.from("oracle"), whirlpoolAddress.toBuffer()],
    programId
  );
}