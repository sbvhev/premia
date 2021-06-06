import { createAction } from '@reduxjs/toolkit';

import { Token } from 'web3/tokens';
import { OptionType } from 'web3/options';

export const updateBase = createAction<Token>('options/updateBase');

export const updateUnderlying = createAction<Token>('options/updateUnderlying');

export const updateOptionType = createAction<OptionType>(
  'options/updateOptionType',
);

export const updateMaturityDate = createAction<string>(
  'options/updateMaturityDate',
);

export const updateStrikePrice = createAction<number>(
  'options/updateStrikePrice',
);

export const updateSize = createAction<number>('options/updateSize');
