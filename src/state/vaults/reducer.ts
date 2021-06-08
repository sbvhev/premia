import { createReducer } from '@reduxjs/toolkit';

import { updateVaultType } from './actions';

export interface VaultState {
  vaultType: string;
}

export const initialState: VaultState = {
  vaultType: 'pro',
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateVaultType, (state, { payload }) => {
    state.vaultType = payload;
  }),
);
