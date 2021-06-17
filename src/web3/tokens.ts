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

const PremiaETHToken: Token = {
  address: '0x6399C842dD2bE3dE30BF99Bc7D1bBF6Fa3650E70',
  id: '0x6399C842dD2bE3dE30BF99Bc7D1bBF6Fa3650E70',
  name: 'Premia',
  symbol: 'PREMIA',
  decimals: 18,
  logoURI:
    'https://tokens.1inch.exchange/0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70.png',
};

const PremiaBSCToken: Token = {
  address: '0xc417b45e6090bd4201D9400b48F84c9f34f4d0a5',
  id: '0xc417b45e6090bd4201D9400b48F84c9f34f4d0a5',
  name: 'Premia',
  symbol: 'PREMIA',
  decimals: 18,
  logoURI:
    'https://tokens.1inch.exchange/0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70.png',
};

export interface TokenPair {
  id: string;
  name: string;
  base: Token;
  underlying: Token;

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
  uniqueDeposits: BigNumber;
  uniqueWithdrawals: BigNumber;
}

export { PremiaETHToken, PremiaBSCToken };
