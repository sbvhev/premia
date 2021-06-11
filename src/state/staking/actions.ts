import { createAction } from '@reduxjs/toolkit';
import { SetStakingBalances } from './reducer';

export const setStakingBalances = createAction<SetStakingBalances>(
  'staking/setStakingBalances',
);
