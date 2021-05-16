import { createReducer } from '@reduxjs/toolkit';

import { setCurrentTx, setTxStateMsg, setTxOption } from './actions';

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
}

export const initialState: PBCState = {
  currentTx: undefined,
  txStateMsg: '',
  txOption: null,
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
    }),
);
