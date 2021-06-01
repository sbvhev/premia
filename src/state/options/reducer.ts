import { createReducer } from '@reduxjs/toolkit';

import {
  updateMaturityDate,
  updateOptionSize,
  updateOptionType,
  updateStrikePrice,
} from './actions';

export interface OptionsState {
  optionType: string;
  maturityDate: string;
  strikePrice: number | number[];
  optionSize: number;
}

export const initialState: OptionsState = {
  optionType: 'call',
  maturityDate: '',
  strikePrice: 50,
  optionSize: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateOptionType, (state, { payload }) => {
      state.optionType = payload;
    })
    .addCase(updateMaturityDate, (state, { payload }) => {
      state.maturityDate = payload;
    })
    .addCase(updateStrikePrice, (state, { payload }) => {
      state.strikePrice = payload;
    })
    .addCase(updateOptionSize, (state, { payload }) => {
      state.optionSize = payload;
    }),
);
