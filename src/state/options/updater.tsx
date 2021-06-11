import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useUnderlyingPrice, useOnChainOptionData } from 'state/options/hooks';
import { AppDispatch, AppState } from 'state';
import {
  updatePricePerUnit,
  updateTotalCost,
  updateFee,
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

        const fee = floatFromFixed(response.feeCost64x64) * underlyingPrice;
        const baseCost =
          floatFromFixed(response.baseCost64x64) * underlyingPrice;
        const totalCost = fee + baseCost;
        const pricePerUnit = totalCost / size;
        const priceImpact = floatFromFixed(response.slippageCoefficient64x64);

        return { fee, totalCost, pricePerUnit, priceImpact };
      } catch (err) {
        console.log('Error fetching price per unit: ', err);
      }

      return null;
    }

    fetchPricePerUnit().then((response) => {
      if (response == null) return;

      const { totalCost, fee, pricePerUnit, priceImpact } = response;

      dispatch(updatePricePerUnit(pricePerUnit));
      dispatch(updateTotalCost(totalCost));
      dispatch(updateFee(fee));
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
    optionType,
    optionPoolContract,
  ]);

  return null;
}
