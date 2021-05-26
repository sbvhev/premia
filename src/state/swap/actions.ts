import { createAction } from '@reduxjs/toolkit';

import { Token } from 'web3/tokens';

export interface SetSwapSettings {
  fromToken?: Token | null;
  toToken?: Token | null;
  fromAmount?: string | null;
  toAmount?: string | null;
}

export const setSwapSettings = createAction<SetSwapSettings>(
  'swap/setSwapSettings',
);