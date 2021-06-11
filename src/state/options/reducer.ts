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
  updatePricePerUnitInUsd,
  updateTotalCost,
  updateTotalCostInUsd,
  updateFee,
  updateFeeInUsd,
  updatePriceImpact,
} from './actions';

export interface OptionsState {
  base: Token;
  underlying: Token;
  optionType: OptionType;
  maturityDate: string;
  strikePrice: number;
  size: number;
  pricePerUnit: number;
  pricePerUnitInUsd: number;
  totalCost: number;
  totalCostInUsd: number;
  fee: number;
  feeInUsd: number;
  priceImpact: number;
}

export const initialState: OptionsState = {
  base: DAI[ChainId.MAINNET],
  underlying: WETH[ChainId.MAINNET],
  optionType: OptionType.Call,
  maturityDate: moment(new Date()).add(14, 'days').format('YYYY-MM-DD'),
  strikePrice: 0,
  size: 0,
  pricePerUnit: 0,
  pricePerUnitInUsd: 0,
  totalCost: 0,
  totalCostInUsd: 0,
  fee: 0,
  feeInUsd: 0,
  priceImpact: 0,
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
    .addCase(updatePricePerUnitInUsd, (state, { payload }) => {
      state.pricePerUnitInUsd = payload;
    })
    .addCase(updateTotalCost, (state, { payload }) => {
      state.totalCost = payload;
    })
    .addCase(updateTotalCostInUsd, (state, { payload }) => {
      state.totalCostInUsd = payload;
    })
    .addCase(updateFee, (state, { payload }) => {
      state.fee = payload;
    })
    .addCase(updateFeeInUsd, (state, { payload }) => {
      state.feeInUsd = payload;
    })
    .addCase(updatePriceImpact, (state, { payload }) => {
      state.priceImpact = payload;
    }),
);
