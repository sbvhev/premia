import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import { updateVersion } from './user/actions';
import application from './application/reducer';
import user from './user/reducer';
import multicall from './multicall/reducer';
import transactions from './transactions/reducer';
import options from './options/reducer';
import swap from './swap/reducer';

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'options'];

const store = configureStore({
  reducer: {
    application,
    multicall,
    user,
    transactions,
    options,
    swap,
  },
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion());

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
