import { Currency } from '@uniswap/sdk';
import { BigNumber } from 'ethers';
import { isObject } from 'lodash';

export interface Token extends Currency {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  logoURI?: string;
  chainId?: number;
}

export function isToken(object: any): object is Token {
  return isObject(object) && 'address' in object;
}

export interface TokenPair {
  id: string;
  name: string;
  base: Token;
  underlying: Token;

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
