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
  totalWithdrawn: BigNumber;
  totalLocked: BigNumber;
  totalAvailable: BigNumber;
  totalVolume: BigNumber;
  totalExercised: BigNumber;
  totalCharged: BigNumber;
  totalFeesEarned: BigNumber;
  openInterest: BigNumber;
  uniqueTrades: BigNumber;
  uniqueOptions: BigNumber;
  uniqueExercises: BigNumber;
  uniqueReassignments: BigNumber;
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
  lastWithdrawalSize?: BigNumber;
  lastWithdrawalTimestamp?: BigNumber;
  totalDeposited: BigNumber;
  totalWithdrawn: BigNumber;
  totalLocked: BigNumber;
  totalAvailable: BigNumber;
  totalVolume: BigNumber;
  totalAssigned: BigNumber;
  totalPremiumsEarned: BigNumber;
  totalReassignmentFees: BigNumber;
  openInterest: BigNumber;
  uniqueUnderwrites: BigNumber;
  uniqueAssignments: BigNumber;
  uniqueReassignments: BigNumber;
  uniqueDeposits: BigNumber;
  uniqueWithdrawals: BigNumber;
}
