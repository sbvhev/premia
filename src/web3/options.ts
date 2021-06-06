import { BigNumber } from 'ethers';

import { Pool } from './pools';
import { Token, TokenPair } from './tokens';

export enum OptionType {
  Call = 'CALL',
  Put = 'PUT',
}

export interface Option {
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
  user: string;
  option: Option;
  size: BigNumber;

  lastTradePrice: BigNumber;
  lastTradeSize: BigNumber;
  lastTradeTimestamp: BigNumber;
  totalExercised: BigNumber;
}
