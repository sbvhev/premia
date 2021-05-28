import { createAction } from '@reduxjs/toolkit';

// import { Token } from 'web3/tokens';
import { SwapTokenTest } from './reducer';
// export interface SetSwapSettings {
//   fromToken?: Token | null;
//   toToken?: Token | null;
//   fromAmount?: string | null;
//   toAmount?: string | null;
// }

export interface SetSwapSettings {
  fromToken?: SwapTokenTest | null;
  toToken?: SwapTokenTest | null;
  fromAmount?: string | null;
  toAmount?: string | null;
}

export const setSwapSettings = createAction<SetSwapSettings>(
  'swap/setSwapSettings',
);
