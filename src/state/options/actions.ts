import { createAction } from '@reduxjs/toolkit';
import { Moment } from 'moment';

export const updateOptionType = createAction<string>(
  'options/updateOptionType',
);

export const updateMaturityDate = createAction<Moment | null>(
  'options/updateMaturityDate',
);

export const updateStrikePrice = createAction<number | number[]>(
  'options/updateStrikePrice',
);

export const updateOptionSize = createAction<number>(
  'options/updateOptionSize',
);

