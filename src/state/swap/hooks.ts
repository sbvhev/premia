import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from 'state';

import {
  SetSwapSettings,
  setSwapSettings as _setSwapSettings,
} from './actions';

export const useSwapSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector<AppState, AppState['swap']>(
    (state) => state.swap,
  );

  const setSwapSettings = (swapSettings: SetSwapSettings) =>
    dispatch(_setSwapSettings(swapSettings));

  return { ...state.swapSettings, setSwapSettings };
};
