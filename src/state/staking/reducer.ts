import { createReducer } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { setStakingBalances } from './actions';

export interface StakingBalances {
  premiaBalance: BigNumber;
  unclaimedPremia: BigNumber;
  xPremiaBalance: BigNumber;
  xPremiaLocked: BigNumber;
  xPremiaFeeDiscount: BigNumber;
  xPremiaStakeWithBonus: BigNumber;
  xPremiaLockedUntil?: BigNumber | null;
  xPremiaSupply: BigNumber;
  underlyingPremia: BigNumber;

  totalPremiaStaked: BigNumber;
  premiaStaked: BigNumber;
}

export interface SetStakingBalances {
  premiaBalance?: BigNumber;
  unclaimedPremia?: BigNumber;
  xPremiaBalance?: BigNumber;
  xPremiaLocked?: BigNumber;
  xPremiaFeeDiscount?: BigNumber;
  xPremiaStakeWithBonus?: BigNumber;
  xPremiaLockedUntil?: BigNumber | null;
  xPremiaSupply?: BigNumber;
  underlyingPremia?: BigNumber;

  totalPremiaStaked?: BigNumber;
  premiaStaked?: BigNumber;
}

export interface StakingState {
  balances: StakingBalances;
}

export const initialState: StakingState = {
  balances: {
    premiaBalance: BigNumber.from(0),
    unclaimedPremia: BigNumber.from(0),
    xPremiaBalance: BigNumber.from(0),
    xPremiaLocked: BigNumber.from(0),
    xPremiaFeeDiscount: BigNumber.from(0),
    xPremiaStakeWithBonus: BigNumber.from(0),
    xPremiaLockedUntil: BigNumber.from(0),
    xPremiaSupply: BigNumber.from(0),
    underlyingPremia: BigNumber.from(0),

    totalPremiaStaked: BigNumber.from(0),
    premiaStaked: BigNumber.from(0),
  },
};

export default createReducer(initialState, (builder) =>
  builder.addCase(
    setStakingBalances,
    (state, { payload }: { payload: SetStakingBalances }) => {
      state.balances = { ...state.balances, ...payload };
    },
  ),
);
