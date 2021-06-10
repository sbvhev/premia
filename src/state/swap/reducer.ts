import { createReducer } from '@reduxjs/toolkit';

import { Token } from 'web3/tokens';
import { CurrencyWithLogoUri } from 'hooks';

import {
  setToggleExchange,
  SetToggleExchange,
  SetSwapSettings,
  setSwapSettings,
} from './actions';

export interface SwapSettings {
  fromToken?: Token | CurrencyWithLogoUri | null;
  toToken?: Token | CurrencyWithLogoUri | null;
  fromAmount?: string | null;
  toAmount?: string | null;
  inputType?: boolean | false;
  slippagePercentage?: number | null;
}

interface LiquidityProvider {
  name: string;
  enabled: boolean;
}

export type LiquidityProviders = LiquidityProvider[];
export interface SwapState {
  swapSettings: SwapSettings;
  liquidityProviders: LiquidityProviders;
}

export const initialState: SwapState = {
  swapSettings: {
    fromToken: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainId: 1,
      name: 'WrappedEther',
      symbol: 'WETH',
      decimals: 18,
      logoURI:
        'https://tokens.1inch.exchange/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
    },
    toToken: null,
    fromAmount: '0',
    toAmount: '0',
    inputType: false,
    slippagePercentage: 0.5,
  },
  liquidityProviders: [
    {
      name: '0x',
      enabled: true,
    },
    {
      name: 'Uniswap',
      enabled: true,
    },
    {
      name: 'Uniswap_V2',
      enabled: true,
    },
    {
      name: 'Uniswap_V3',
      enabled: true,
    },
    {
      name: 'Eth2Dai',
      enabled: true,
    },
    {
      name: 'Kyber',
      enabled: true,
    },
    {
      name: 'Curve',
      enabled: true,
    },
    {
      name: 'LiquidityProvider',
      enabled: true,
    },
    {
      name: 'MultiBridge',
      enabled: true,
    },
    {
      name: 'Balancer',
      enabled: true,
    },
    {
      name: 'Balancer_V2',
      enabled: true,
    },
    {
      name: 'CREAM',
      enabled: true,
    },
    {
      name: 'Bancor',
      enabled: true,
    },
    {
      name: 'mStable',
      enabled: true,
    },
    {
      name: 'Mooniswap',
      enabled: true,
    },
    {
      name: 'MultiHop',
      enabled: true,
    },
    {
      name: 'Shell',
      enabled: true,
    },
    {
      name: 'Swerve',
      enabled: true,
    },
    {
      name: 'SnowSwap',
      enabled: true,
    },
    {
      name: 'xSigma',
      enabled: true,
    },
    {
      name: 'SushiSwap',
      enabled: true,
    },
    {
      name: 'SushiSwap_V2',
      enabled: true,
    },
    {
      name: 'DODO',
      enabled: true,
    },
    {
      name: 'DODO_V2',
      enabled: true,
    },
    {
      name: 'CryptoCom',
      enabled: true,
    },
    {
      name: 'LinkSwap',
      enabled: true,
    },
    {
      name: 'MakerPsm',
      enabled: true,
    },
    {
      name: 'Saddle',
      enabled: true,
    },
    {
      name: 'KyberDMM',
      enabled: true,
    },
  ],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      setSwapSettings,
      (state, { payload: swapSettings }: { payload: SetSwapSettings }) => {
        state.swapSettings = { ...state.swapSettings, ...swapSettings };
      },
    )
    .addCase(
      setToggleExchange,
      (state, { payload: toggleExchange }: { payload: SetToggleExchange }) => {
        const { index } = toggleExchange;
        const copy = [...state.liquidityProviders];
        copy[index].enabled = !copy[index].enabled;
        state.liquidityProviders = copy;
      },
    ),
);
