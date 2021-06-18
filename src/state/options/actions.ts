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

export const updateSize = createAction<string>('options/updateSize');

export const updatePricePerUnit = createAction<number>(
  'options/updatePricePerUnit',
);

export const updatePricePerUnitInUsd = createAction<number>(
  'options/updatePricePerUnitInUsd',
);

export const updateTotalCost = createAction<number>('options/updateTotalCost');

export const updateTotalCostInUsd = createAction<number>(
  'options/updateTotalCostInUsd',
);

export const updateFee = createAction<number>('options/updateFee');

export const updateFeeInUsd = createAction<number>('options/updateFeeInUsd');

export const updatePriceImpact = createAction<number>(
  'options/updatePriceImpact',
);

export const updateSlippagePercentage = createAction<number>(
  'options/updateSlippagePercentage',
);
