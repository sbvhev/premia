import { createReducer } from '@reduxjs/toolkit';

import { setCurrentTx, setTxStateMsg, setTxOption, setGasType, setGasValue, setGasPrices } from './actions';

export interface CurrentTransaction {
  hash: string;
}

export interface SetCurrentTransaction {
  hash: string;
}

export interface PBCState {
  currentTx?: CurrentTransaction | null;
  txStateMsg?: string | null;
  txOption: any | null | undefined;
  gasType?: string;
  gasValue?: number;
  gasPrices?: any;
}

export const initialState: PBCState = {
  currentTx: undefined,
  txStateMsg: '',
  txOption: null,
  gasType: 'standard',
  gasValue: 0,
  gasPrices: null
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      setCurrentTx,
      (
        state,
        { payload }: { payload: SetCurrentTransaction | undefined | null },
      ) => {
        state.currentTx = payload
          ? { ...state.currentTx, ...payload }
          : payload;
      },
    )
    .addCase(setTxStateMsg, (state, { payload }) => {
      state.txStateMsg = payload;
    })
    .addCase(setTxOption, (state, { payload }) => {
      state.txOption = payload;
    })
    .addCase(setGasType, (state, { payload }) => {
      state.gasType = payload;
    })
    .addCase(setGasValue, (state, { payload }) => {
      state.gasValue = payload;
    })
    .addCase(setGasPrices, (state, { payload }) => {
      state.gasPrices = payload;
    }),
);
