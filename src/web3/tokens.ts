import { Currency } from '@uniswap/sdk';
import { BigNumber } from 'ethers';
import { isObject } from 'lodash';

export enum TokenDenominator {
  DAI = 'DAI',
  BUSD = 'BUSD',
}

export const ETH: Currency = {
  decimals: 18,
  symbol: 'BNB',
  name: 'Binance Coin',
};

export const BNB: Currency = {
  decimals: 18,
  symbol: 'BNB',
  name: 'Ether',
};

export interface Token extends Currency {
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
  name: string;
  token: Token;
  denominator: Token;
  strikePriceIncrement: BigNumber;
  openInterest: BigNumber;
  totalVolume: BigNumber;
}
