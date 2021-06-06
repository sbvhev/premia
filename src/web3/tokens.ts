import { Currency } from '@uniswap/sdk';
import { BigNumber } from 'ethers';
import { isObject } from 'lodash';

export enum TokenDenominator {
  DAI = 'DAI',
  BUSD = 'BUSD',
}

export interface Token extends Currency {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
}

export function isToken(object: any): object is Token {
  return isObject(object) && 'address' in object;
}

export interface TokenPair {
  name: string;
  token: Token;
  denominator: Token;

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
