import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BigNumber } from 'ethers';
import moment from 'moment';

import { Pool as PoolContract } from 'contracts';
import { Token } from 'web3/tokens';
import { OptionType } from 'web3/options';
import { fixedFromFloat } from 'utils/fixedFromFloat';
import { floatToBigNumber } from 'utils/floatToBigNumber';
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
  updateTotalCost,
  updatePoolContract,
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

export function useOnChainOptionData() {
  const underlyingPrice = useUnderlyingPrice();
  const { underlying, strikePrice, size, maturityDate, totalCost } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const getMaturity = (days: number) => {
    const ONE_DAY = 3600 * 24;
    return BigNumber.from(
      Math.floor(new Date(maturityDate).getTime() / 1000 / ONE_DAY) *
        ONE_DAY +
        days * ONE_DAY,
    );
  };

  const daysToMaturity = moment(maturityDate).diff(moment(), 'days');
  const maturity = getMaturity(daysToMaturity).toHexString();
  const strike64x64 = fixedFromFloat(strikePrice || 1).toHexString();
  const spot64x64 = fixedFromFloat(underlyingPrice || 1).toHexString();
  const optionSize = floatToBigNumber(size, underlying.decimals);
  const maxCost = floatToBigNumber(totalCost, underlying.decimals);

  return {
    maturity,
    strike64x64,
    spot64x64,
    optionSize,
    maxCost,
  }
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

export function useTotalCost() {
  const dispatch = useDispatch<AppDispatch>();
  const { totalCost } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setTotalCost = useCallback(
    (totalCost: number) => dispatch(updateTotalCost(totalCost)),
    [dispatch],
  );

  return { totalCost, setTotalCost };
}

export function usePoolContract() {
  const dispatch = useDispatch<AppDispatch>();
  const { poolContract } = useSelector<AppState, AppState['options']>(
    (state: AppState) => state.options,
  );

  const setPoolContract = useCallback(
    (poolContract: PoolContract) => dispatch(updatePoolContract(poolContract)),
    [dispatch],
  );

  return { poolContract, setPoolContract };
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
