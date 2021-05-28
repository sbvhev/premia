import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState, AppDispatch } from 'state';
import {
  updateOptionType,
  updateMaturityDate,
  updateStrikePrice,
  updateOptionSize,
} from './actions';

export function useOptionType() {
  const dispatch = useDispatch<AppDispatch>();
  const { optionType } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setOptionType = useCallback(
    (optionType: string) => {
      dispatch(updateOptionType(optionType));
    },
    [dispatch],
  );

  return { optionType, setOptionType };
}

export function useMaturityDate() {
  const dispatch = useDispatch<AppDispatch>();
  const { maturityDate } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setMaturityDate = useCallback(
    (maturityDate: string | null) => {
      dispatch(updateMaturityDate(maturityDate));
    },
    [dispatch],
  );

  return { maturityDate, setMaturityDate };
}

export function useStrikePrice() {
  const dispatch = useDispatch<AppDispatch>();
  const { strikePrice } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setStrikePrice = useCallback(
    (strikePrice: number | number[]) => {
      dispatch(updateStrikePrice(strikePrice));
    },
    [dispatch],
  );

  return { strikePrice, setStrikePrice };
}

export function useOptionSize() {
  const dispatch = useDispatch<AppDispatch>();
  const { optionSize } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setOptionSize = useCallback(
    (optionSize: number) => {
      dispatch(updateOptionSize(optionSize));
    },
    [dispatch],
  );

  return { optionSize, setOptionSize };
}
