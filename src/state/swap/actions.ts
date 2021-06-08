import { createAction } from '@reduxjs/toolkit';

import { Token } from 'web3/tokens';
export interface SetSwapSettings {
  fromToken?: Token | null;
  toToken?: Token | null;
  fromAmount?: string | null | undefined;
  toAmount?: string | null | undefined;
  slippagePercentage?: number | null;
  inputType?: boolean | undefined;
}

export const setSwapSettings = createAction<SetSwapSettings>(
  'swap/setSwapSettings',
);
