import { createReducer } from '@reduxjs/toolkit';

import { Token } from 'web3/tokens';

import { SetSwapSettings, setSwapSettings } from './actions';

export interface SwapSettings {
  fromToken?: Token | null;
  toToken?: Token | null;
  fromAmount?: string | null;
  toAmount?: string | null;
  inputType?: boolean | false;
  slippagePercentage?: number | null;
}

export interface SwapState {
  swapSettings: SwapSettings;
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
    slippagePercentage: 0.1,
  },
};

export default createReducer(initialState, (builder) =>
  builder.addCase(
    setSwapSettings,
    (state, { payload: swapSettings }: { payload: SetSwapSettings }) => {
      state.swapSettings = { ...state.swapSettings, ...swapSettings };
    },
  ),
);
