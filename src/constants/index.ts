import { ChainId, Token, Currency, WETH as _WETH } from '@uniswap/sdk';

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

export const WBNB = new Token(
  56,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  18,
  'WBNB',
  'Wrapped BNB',
);

export const BUSD = new Token(
  56,
  '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  18,
  'BUSD',
  'Binance USD',
);

export const DAI: { [chainId in ChainId | 56]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.MAINNET,
    '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
  [ChainId.GÖRLI]: new Token(
    ChainId.GÖRLI,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
  56: BUSD,
};

export const WETH: { [chainId in ChainId | 56]: Token } = {
  [ChainId.MAINNET]: _WETH[ChainId.MAINNET],
  [ChainId.ROPSTEN]: _WETH[ChainId.ROPSTEN],
  [ChainId.RINKEBY]: _WETH[ChainId.RINKEBY],
  [ChainId.GÖRLI]: _WETH[ChainId.GÖRLI],
  [ChainId.KOVAN]: _WETH[ChainId.KOVAN],
  56: WBNB,
};

export const WBTC: { [chainId in ChainId | 56]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0x577d296678535e4903d59a4c929b718e1d575e0a',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
  [ChainId.GÖRLI]: new Token(
    ChainId.GÖRLI,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
  56: new Token(
    56,
    '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    8,
    'BTCB',
    'Binance-Peg BTC',
  ),
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
