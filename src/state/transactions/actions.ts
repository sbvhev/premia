import { createAction } from '@reduxjs/toolkit';

import { SetCurrentTransaction, GasNowData, Transaction } from './reducer';

export const setCurrentTx = createAction<
  SetCurrentTransaction | null | undefined
>('transactions/setCurrentTx');

export const setTxHistory = createAction<Transaction>(
  'transactions/setTxHistory',
);

export const clearTxHistory = createAction<any | null | undefined>(
  'transactions/clearTxHistory',
);

export const setTxStateMsg = createAction<string | null | undefined>(
  'transactions/setTxStateMsg',
);

export const setTxOption = createAction<any | null | undefined>(
  'transactions/setTxOption',
);

export const setGasType = createAction<keyof GasNowData>(
  'transactions/setGasType',
);

export const setGasPrices = createAction<any>('transactions/setGasPrices');
