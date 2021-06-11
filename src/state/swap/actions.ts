import { createAction } from '@reduxjs/toolkit';
import { CurrencyWithLogoUri } from 'hooks';
import { Token } from 'web3/tokens';
export interface SetSwapSettings {
  fromToken?: Token | CurrencyWithLogoUri | null;
  toToken?: Token | CurrencyWithLogoUri | null;
  fromAmount?: string | null | undefined;
  toAmount?: string | null | undefined;
  slippagePercentage?: number | null;
  inputType?: boolean | undefined;
}
export interface SetToggleExchange {
  index: number;
}

export const setSwapSettings = createAction<SetSwapSettings>(
  'swap/setSwapSettings',
);

export const setToggleExchange = createAction<SetToggleExchange>(
  'swap/setLiquidityProvider',
);
