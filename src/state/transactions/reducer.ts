import { createReducer } from '@reduxjs/toolkit';

import {
  setCurrentTx,
  setTxHistory,
  clearTxHistory,
  setTxStateMsg,
  setTxOption,
  setGasType,
  setGasPrices,
} from './actions';

export const GAS_MODE_LOCALSTORAGE_KEY = 'transactions/gas_mode';

export interface CurrentTransaction {
  hash: string;
}

export interface SetCurrentTransaction {
  hash: string;
}

export interface Transaction {
  hash: string;
  timestamp?: number;
  complete?: boolean;
}

export interface GasNowData {
  fast: Number;
  rapid: Number;
  slow: Number;
  standard: Number;
  timestamp: Number;
}

export interface PBCState {
  currentTx?: CurrentTransaction | null;
  txHistory: Transaction[];
  txStateMsg?: string | null;
  txOption: any | null | undefined;
  gasValue: number;
  gasType?: keyof GasNowData;
  gasPrices?: GasNowData;
}

export const initialState: PBCState = {
  currentTx: undefined,
  txStateMsg: '',
  txHistory: [],
  txOption: null,
  gasValue: 1,
  gasType: (localStorage.getItem(GAS_MODE_LOCALSTORAGE_KEY) ||
    'fast') as keyof GasNowData,
  gasPrices: undefined,
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
      state.gasValue = Number(state.gasPrices?.[payload] ?? state.gasValue);
      localStorage.setItem(GAS_MODE_LOCALSTORAGE_KEY, payload);
    })
    .addCase(setGasPrices, (state, { payload }) => {
      state.gasPrices = payload;
      state.gasValue = Number(
        payload[state.gasType as keyof GasNowData] ?? state.gasValue,
      );
    })
    .addCase(setTxHistory, (state, { payload }: { payload: Transaction }) => {
      state.txHistory = [payload, ...(state.txHistory || [])];
    })
    .addCase(clearTxHistory, (state) => {
      state.txHistory = [];
    }),
);
