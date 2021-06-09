import { createAction } from '@reduxjs/toolkit';

import { Pool as PoolContract } from 'contracts';
import { Token } from 'web3/tokens';
import { Pool } from 'web3/pools';
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

export const updatePricePerUnit = createAction<number>(
  'options/updatePricePerUnit',
);

export const updateTotalCost = createAction<number>('options/updateTotalCost');

export const updateCallPool = createAction<Pool>('options/updateCallPool');

export const updatePutPool = createAction<Pool>('options/updatePutPool');

export const updateCallPoolContract = createAction<PoolContract>(
  'options/updateCallPoolContract',
);

export const updatePutPoolContract = createAction<PoolContract>(
  'options/updatePutPoolContract',
);
