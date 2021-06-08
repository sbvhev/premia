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
      symbol: 'LINK',
      name: 'Chainlink',
      logoURI:
        'https://tokens.1inch.exchange/0x514910771af9ca656af840dff83e8264ecf986ca.png',
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      chainId: 1,
      decimals: 18,
    },
    toToken: null,
    fromAmount: '0',
    toAmount: '0',
    inputType: false,
    slippagePercentage: 0.5,
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
