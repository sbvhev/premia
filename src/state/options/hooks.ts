import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Token } from 'web3/tokens';
import { OptionType } from 'web3/options';
import { AppState, AppDispatch } from 'state';
import { usePrices } from 'state/application/hooks';
import {
  updateBase,
  updateUnderlying,
  updateOptionType,
  updateMaturityDate,
  updateStrikePrice,
  updateSize,
  updatePricePerUnit,
} from './actions';

export function useUnderlyingPrice(): number {
  const { underlying } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );
  const tokenPrices = usePrices();

  const underlyingPrice = useMemo(
    () => tokenPrices[underlying.symbol],
    [tokenPrices, underlying],
  );

  return underlyingPrice;
}

export function useBase() {
  const dispatch = useDispatch<AppDispatch>();
  const { base } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setBase = useCallback(
    (base: Token) => dispatch(updateBase(base)),
    [dispatch],
  );

  return { base, setBase };
}

export function useUnderlying() {
  const dispatch = useDispatch<AppDispatch>();
  const { underlying } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setUnderlying = useCallback(
    (underlying: Token) => dispatch(updateUnderlying(underlying)),
    [dispatch],
  );

  return { underlying, setUnderlying };
}

export function useOptionType() {
  const dispatch = useDispatch<AppDispatch>();
  const { optionType } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setOptionType = useCallback(
    (optionType: OptionType) => dispatch(updateOptionType(optionType)),
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
    (maturityDate: string) => dispatch(updateMaturityDate(maturityDate)),
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
    (strikePrice: number) => dispatch(updateStrikePrice(strikePrice)),
    [dispatch],
  );

  return { strikePrice, setStrikePrice };
}

export function useSize() {
  const dispatch = useDispatch<AppDispatch>();
  const { size } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setSize = useCallback(
    (size: number) => dispatch(updateSize(size)),
    [dispatch],
  );

  return { size, setSize };
}

export function usePricePerUnit() {
  const dispatch = useDispatch<AppDispatch>();
  const { pricePerUnit } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setPricePerUnit = useCallback(
    (pricePerUnit: number) => dispatch(updatePricePerUnit(pricePerUnit)),
    [dispatch],
  );

  return { pricePerUnit, setPricePerUnit };
}

export function useBreakEvenPrice() {
  const { optionType, pricePerUnit, strikePrice } = useSelector<
    AppState,
    AppState['options']
  >((state: AppState) => state.options);

  const breakEvenPrice =
    optionType === OptionType.Call
      ? strikePrice + pricePerUnit
      : strikePrice - pricePerUnit;

  return breakEvenPrice;
}
