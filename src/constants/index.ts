import { ChainId, Currency, WETH as _WETH } from '@uniswap/sdk';

import { Token } from 'web3/tokens';

export { default as tokenIcons } from './tokenIcons';
export { default as wallets } from './wallets';

export const AVG_BLOCK_TIME = 13;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEFAULT_DECIMALS = 18;

export const UNISWAP_FACTORY: { [chainId in ChainId | 56]: string } = {
  [ChainId.MAINNET]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.RINKEBY]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.ROPSTEN]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.GÖRLI]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  [ChainId.KOVAN]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  56: '0xbcfccbde45ce874adcb698cc183debcf17952812',
};

export const BNB: Currency = {
  decimals: 18,
  symbol: 'BNB',
  name: 'Binance Coin',
};

export const WBNB: Token = {
  id: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  decimals: 18,
  symbol: 'WBNB',
  name: 'Wrapped BNB',
};

export const BUSD: Token = {
  id: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  decimals: 18,
  symbol: 'BUSD',
  name: 'Binance USD',
};

export const DAI: { [chainId in ChainId | 56]: Token } = {
  [ChainId.MAINNET]: {
    id: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
  },
  [ChainId.RINKEBY]: {
    id: '0x8e401d45e59555e95766b5fcb023b5f65cca37b2',
    address: '0x8e401d45e59555e95766b5fcb023b5f65cca37b2',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
  },
  [ChainId.ROPSTEN]: {
    id: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
  },
  [ChainId.GÖRLI]: {
    id: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
  },
  [ChainId.KOVAN]: {
    id: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
  },
  56: BUSD,
};

export const WETH: { [chainId in ChainId | 56]: Token } = {
  [ChainId.MAINNET]: {
    id: _WETH[ChainId.MAINNET].address,
    address: _WETH[ChainId.MAINNET].address,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  [ChainId.RINKEBY]: {
    id: _WETH[ChainId.RINKEBY].address,
    address: _WETH[ChainId.RINKEBY].address,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  [ChainId.ROPSTEN]: {
    id: _WETH[ChainId.ROPSTEN].address,
    address: _WETH[ChainId.ROPSTEN].address,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  [ChainId.GÖRLI]: {
    id: _WETH[ChainId.GÖRLI].address,
    address: _WETH[ChainId.GÖRLI].address,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  [ChainId.KOVAN]: {
    id: _WETH[ChainId.KOVAN].address,
    address: _WETH[ChainId.KOVAN].address,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  56: WBNB,
};

export const defaultSwapPath = (
  tokenAddress: string,
  chainId: ChainId,
): string[] => [tokenAddress, WETH[chainId].address];

export const swapPaths: { [tokenAddress: string]: string[] } = {
  // Mainnet
  // WETH
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': [
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ],
  // BADGER
  '0x3472A5A71965499acd81997a54BBA8D852C6E53d': [
    '0x3472A5A71965499acd81997a54BBA8D852C6E53d',
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ],

  // Rinkeby
  // WETH
  '0xc778417E063141139Fce010982780140Aa0cD5Ab': [
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  ],
  // ROPE
  '0xc427c5B9bE1dfd0FaB70ac42F8cE52Fe77A3c51E': [
    '0xc427c5B9bE1dfd0FaB70ac42F8cE52Fe77A3c51E',
    '0x577d296678535e4903d59a4c929b718e1d575e0a',
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  ],

  // Rinkeby
  // WBNB
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c': [
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  ],
};
