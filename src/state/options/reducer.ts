import { createReducer } from '@reduxjs/toolkit';
import { ChainId } from '@uniswap/sdk';

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
} from './actions';

export interface OptionsState {
  base: Token;
  underlying: Token;
  optionType: OptionType;
  maturityDate: string;
  strikePrice: number;
  size: number;
}

export const initialState: OptionsState = {
  base: DAI[ChainId.MAINNET],
  underlying: WETH[ChainId.MAINNET],
  optionType: OptionType.Call,
  maturityDate: '',
  strikePrice: 50,
  size: 0,
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
    }),
);
