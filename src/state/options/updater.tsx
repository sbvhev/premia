import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  useBasePrice,
  useUnderlyingPrice,
  useOnChainOptionData,
} from 'state/options/hooks';
import { AppDispatch, AppState } from 'state';
import {
  updatePricePerUnit,
  updatePricePerUnitInUsd,
  updateTotalCost,
  updateTotalCostInUsd,
  updateFee,
  updateFeeInUsd,
  updatePriceImpact,
} from './actions';
import { useDebounce, usePools } from 'hooks';
import { OptionType } from 'web3/options';
import { floatFromFixed } from 'utils/floatFromFixed';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();
  const onChainOptionData = useOnChainOptionData();
  const { maturity, strike64x64, spot64x64, optionSize } = useDebounce(
    onChainOptionData,
    100,
  );
  const { underlying, optionType, size } = useSelector<
    AppState,
    AppState['options']
  >((state) => state.options);
  const { optionPoolContract } = usePools();
  const underlyingPrice = useUnderlyingPrice();
  const basePrice = useBasePrice();
  const location = useLocation();

  useEffect(() => {
    if (
      !optionPoolContract ||
      !maturity ||
      !strike64x64 ||
      !spot64x64 ||
      !optionSize ||
      !size
    )
      return;

    if (!location.pathname.startsWith('/options')) return;

    async function fetchPricePerUnit() {
      const isCall = optionType === OptionType.Call;

      try {
        const response = await optionPoolContract!.quote({
          maturity,
          strike64x64,
          spot64x64,
          amount: optionSize,
          isCall,
        });

        const activePrice = isCall ? underlyingPrice : basePrice;
        const fee = floatFromFixed(response.feeCost64x64);
        const feeInUsd = fee * activePrice;
        const baseCost = floatFromFixed(response.baseCost64x64);
        const baseCostInUsd = baseCost * activePrice;
        const totalCost = fee + baseCost;
        const totalCostInUsd = feeInUsd + baseCostInUsd;
        const pricePerUnit = totalCost / size;
        const pricePerUnitInUsd = totalCostInUsd / size;
        const priceImpact = floatFromFixed(response.slippageCoefficient64x64);

        return {
          fee,
          feeInUsd,
          baseCost,
          baseCostInUsd,
          totalCost,
          totalCostInUsd,
          pricePerUnit,
          pricePerUnitInUsd,
          priceImpact,
        };
      } catch (err) {
        console.log('Error fetching price per unit: ', err);
      }

      return null;
    }

    fetchPricePerUnit().then((response) => {
      if (response == null) return;

      const {
        totalCost,
        totalCostInUsd,
        fee,
        feeInUsd,
        pricePerUnit,
        pricePerUnitInUsd,
        priceImpact,
      } = response;

      dispatch(updatePricePerUnit(pricePerUnit));
      dispatch(updatePricePerUnitInUsd(pricePerUnitInUsd));
      dispatch(updateTotalCost(totalCost));
      dispatch(updateTotalCostInUsd(totalCostInUsd));
      dispatch(updateFee(fee));
      dispatch(updateFeeInUsd(feeInUsd));
      dispatch(updatePriceImpact(priceImpact));
    });
  }, [
    dispatch,
    maturity,
    strike64x64,
    spot64x64,
    optionSize,
    size,
    location.pathname,
    underlying,
    underlyingPrice,
    basePrice,
    optionType,
    optionPoolContract,
  ]);

  return null;
}
