import { createAction } from '@reduxjs/toolkit';

export const updateOptionType = createAction<string>(
  'options/updateOptionType',
);

export const updateMaturityDate = createAction<string | null>(
  'options/updateMaturityDate',
);

export const updateStrikePrice = createAction<number | number[]>(
  'options/updateStrikePrice',
);

export const updateOptionSize = createAction<number>(
  'options/updateOptionSize',
);

