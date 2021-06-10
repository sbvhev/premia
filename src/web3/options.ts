import { BigNumber, BytesLike } from 'ethers';
import { hexZeroPad, hexDataSlice, hexConcat } from '@ethersproject/bytes';

import { Pool } from './pools';
import { Token, TokenPair } from './tokens';

export enum OptionType {
  Call = 'CALL',
  Put = 'PUT',
}

export interface Option {
  id: string;
  pool: Pool;
  pair: TokenPair;
  base: Token;
  underlying: Token;
  optionType: OptionType;
  strike: string;
  strike64x64: string;
  maturity: string;

  lastTradePrice: BigNumber;
  lastTradeSize: BigNumber;
  lastTradeTimestamp: BigNumber;
  openInterest: BigNumber;
  totalVolume: BigNumber;
  totalExercised: BigNumber;
  uniqueTrades: BigNumber;
  uniqueExercises: BigNumber;
}

export interface UserOwnedOption {
  id: string;
  user: string;
  option: Option;
  size: BigNumber;

  lastTradePrice: BigNumber;
  lastTradeSize: BigNumber;
  lastTradeTimestamp: BigNumber;
  totalExercised: BigNumber;
}

export enum OptionTokenType {
  FreeLiquidity = 0,
  LongCall = 1,
  ShortCall = 2,
}

export interface OptionTokenIdParams {
  tokenType: OptionTokenType;
  maturity: BigNumber;
  strikePrice: BigNumber;
}

export function getOptionTokenIdFor({
  tokenType,
  maturity,
  strikePrice,
}: OptionTokenIdParams) {
  return hexConcat([
    hexZeroPad(BigNumber.from(tokenType).toHexString(), 1),
    hexZeroPad('0x0', 7),
    hexZeroPad(maturity.toHexString(), 8),
    hexZeroPad(strikePrice.toHexString(), 16),
  ]);
}

export function getOptionParametersFor(
  tokenId: BytesLike,
): OptionTokenIdParams {
  return {
    tokenType: Number(hexDataSlice(tokenId, 0, 1)),
    maturity: BigNumber.from(hexDataSlice(tokenId, 8, 16)),
    strikePrice: BigNumber.from(hexDataSlice(tokenId, 16, 32)),
  };
}
