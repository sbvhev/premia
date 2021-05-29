import { createReducer } from '@reduxjs/toolkit';

// import { Token } from 'web3/tokens';
import LINK from 'assets/svg/LINK-icon.svg';

import { SetSwapSettings, setSwapSettings } from './actions';

export interface SwapTokenTest {
  symbol?: string;
  name?: string;
  icon?: string;
  balance?: Number;
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
      symbol: 'LINK',
      name: 'Chainlink',
      icon: LINK,
      balance: 876,
    },
    toToken: null,
    fromAmount: '0',
    toAmount: '0',
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
