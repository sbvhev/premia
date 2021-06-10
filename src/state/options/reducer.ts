import { createReducer } from '@reduxjs/toolkit';
import { ChainId } from '@uniswap/sdk';
import moment from 'moment';

import { DAI, WETH } from '../../constants';
import { Token } from 'web3/tokens';
import { OptionType } from 'web3/options';
import {
  updateBase,
  updateUnderlying,
  updateMaturityDate,
  updateSize,
  updateOptionType,
  updateStrikePrice,
  updatePricePerUnit,
  updateTotalCost,
  updateFee,
} from './actions';

export interface OptionsState {
  base: Token;
  underlying: Token;
  optionType: OptionType;
  maturityDate: string;
  strikePrice: number;
  size: number;
  pricePerUnit: number;
  totalCost: number;
  fee: number;
}

export const initialState: OptionsState = {
  base: DAI[ChainId.MAINNET],
  underlying: WETH[ChainId.MAINNET],
  optionType: OptionType.Call,
  maturityDate: moment(new Date()).add(14, 'days').format('YYYY-MM-DD'),
  strikePrice: 0,
  size: 0,
  pricePerUnit: 0,
  totalCost: 0,
  fee: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBase, (state, { payload }) => {
      state.base = payload;
    })
    .addCase(updateUnderlying, (state, { payload }) => {
      state.underlying = payload;
    })
    .addCase(updateOptionType, (state, { payload }) => {
      state.optionType = payload;
    })
    .addCase(updateMaturityDate, (state, { payload }) => {
      state.maturityDate = payload;
    })
    .addCase(updateStrikePrice, (state, { payload }) => {
      state.strikePrice = payload;
    })
    .addCase(updateSize, (state, { payload }) => {
      state.size = payload;
    })
    .addCase(updatePricePerUnit, (state, { payload }) => {
      state.pricePerUnit = payload;
    })
    .addCase(updateTotalCost, (state, { payload }) => {
      state.totalCost = payload;
    })
    .addCase(updateFee, (state, { payload }) => {
      state.fee = payload;
    }),
);
