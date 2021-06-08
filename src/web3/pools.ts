import { BigNumber } from 'ethers';

import { Token, TokenPair } from './tokens';
import { OptionType } from './options';

export interface Pool {
  id: string;
  address: string;
  name: string;
  pair: TokenPair;
  base: Token;
  underlying: Token;
  optionType: OptionType;
  cLevel: BigNumber;
  cLevel64x64: BigNumber;

  totalDeposited: BigNumber;
  totalLocked: BigNumber;
  totalAvailable: BigNumber;
  openInterest: BigNumber;
  totalVolume: BigNumber;
  totalExercised: BigNumber;
  uniqueTrades: BigNumber;
  uniqueOptions: BigNumber;
  uniqueExercises: BigNumber;
  uniqueDeposits: BigNumber;
  uniqueWithdrawals: BigNumber;
}

export interface UserOwnedPool {
  id: string;
  address: string;
  user: string;
  pair: TokenPair;
  base: Token;
  underlying: Token;
  optionType: OptionType;
  size: BigNumber;

  lastDepositSize: BigNumber;
  lastDepositTimestamp: BigNumber;
  lastWithdrawalSize: BigNumber;
  lastWithdrawalTimestamp: BigNumber;
  totalDeposited: BigNumber;
  totalWithdrawn: BigNumber;
}
