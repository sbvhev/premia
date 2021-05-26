import { createReducer } from '@reduxjs/toolkit';

// import { Token } from 'web3/tokens';
import LINK from 'assets/svg/LINK-icon.svg';

import {
  SetSwapSettings,
  setSwapSettings,
} from './actions';

export interface SwapTokenTest {
  ticker?: string;
  name?: string;
  icon?: string;
  number?: Number;
}

export interface SwapSettings {
  fromToken?: SwapTokenTest | null;
  toToken?: SwapTokenTest | null;
  fromAmount?: string | null;
  toAmount?: string | null;
}

// export interface SwapSettings {
//   fromToken?: Token | null;
//   toToken?: Token | null;
//   fromAmount?: string | null;
//   toAmount?: string | null;
// }

export interface SwapState {
  swapSettings: SwapSettings;
}

export const initialState: SwapState = {
  swapSettings: {
    fromToken: {
      ticker: 'LINK',
      name: 'Chainlink',
      icon: LINK,
      number: 876,
    },
    toToken: null,
    fromAmount: '0',
    toAmount: '0',
  },
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      setSwapSettings,
      (state, { payload: swapSettings }: { payload: SetSwapSettings }) => {
        state.swapSettings = { ...state.swapSettings, ...swapSettings };
      },
    ),
);