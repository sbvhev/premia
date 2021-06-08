import { createReducer } from '@reduxjs/toolkit';
import { ChainId } from '@uniswap/sdk';
import moment from 'moment';

import { DAI, WETH } from '../../constants';
import { Pool as PoolContract } from 'contracts';
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
  updatePoolContract
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
  poolContract?: PoolContract;
}

export const initialState: OptionsState = {
  base: DAI[ChainId.MAINNET],
  underlying: WETH[ChainId.MAINNET],
  optionType: OptionType.Call,
  maturityDate: moment(new Date()).add(27, 'days').format('YYYY-MM-DD'),
  strikePrice: 0,
  size: 0,
  pricePerUnit: 0,
  totalCost: 0,
  poolContract: undefined,
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
    .addCase(updatePoolContract, (state, { payload }) => {
      state.poolContract = payload as any;
    }),
);
