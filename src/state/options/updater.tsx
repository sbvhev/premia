import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-apollo';
import { useLocation } from 'react-router-dom';
import { get, isEqual } from 'lodash';

import { getPool } from 'graphql/queries';
import { getPoolId } from 'graphql/utils';
import { Pool } from 'web3/pools';
import {
  useUnderlyingPrice,
  useCallPool,
  usePutPool,
  useCallPoolContract,
  usePutPoolContract,
  useOnChainOptionData,
} from 'state/options/hooks';
import { AppDispatch, AppState } from 'state';
import { updatePricePerUnit, updateTotalCost, updateFee } from './actions';
import { floatFromFixed } from 'utils/floatFromFixed';
import { usePoolContract as usePoolContractHook, useDebounce } from 'hooks';
import { OptionType } from 'web3/options';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();
  const { setCallPoolContract } = useCallPoolContract();
  const { setPutPoolContract } = usePutPoolContract();
  const { setCallPool } = useCallPool();
  const { setPutPool } = usePutPool();
  const onChainOptionData = useOnChainOptionData();
  const { maturity, strike64x64, spot64x64, optionSize } = useDebounce(
    onChainOptionData,
    100,
  );
  const {
    base,
    underlying,
    optionType,
    size,
    callPool,
    putPool,
    callPoolContract,
    putPoolContract,
  } = useSelector<AppState, AppState['options']>((state) => state.options);
  const underlyingPrice = useUnderlyingPrice();
  const location = useLocation();

  const { data: callPoolData } = useQuery(getPool, {
    pollInterval: 5000,
    variables: {
      id: getPoolId(base, underlying, OptionType.Call),
    },
  });

  const { data: putPoolData } = useQuery(getPool, {
    pollInterval: 5000,
    variables: {
      id: getPoolId(base, underlying, OptionType.Put),
    },
  });

  const callP: Pool | null = useMemo(
    () => get(callPoolData, 'pool') || null,
    [callPoolData],
  );

  const putP: Pool | null = useMemo(
    () => get(putPoolData, 'pool') || null,
    [putPoolData],
  );

  const callContract = usePoolContractHook(callP?.address);
  const putContract = usePoolContractHook(putP?.address);

  useEffect(() => {
    if (callP && !isEqual(callP, callPool)) {
      dispatch(setCallPool(callP));
    }
  }, [dispatch, callPool, callP, setCallPool]);

  useEffect(() => {
    if (putP && !isEqual(putP, putPool)) {
      dispatch(setPutPool(putP));
    }
  }, [dispatch, putP, putPool, setPutPool]);

  useEffect(() => {
    if (callContract && !isEqual(callContract, callPoolContract)) {
      dispatch(setCallPoolContract(callContract));
    }
  }, [dispatch, callPoolContract, callContract, setCallPoolContract]);

  useEffect(() => {
    if (putContract && !isEqual(putContract, putPoolContract)) {
      dispatch(setPutPoolContract(putContract));
    }
  }, [dispatch, putContract, putPoolContract, setPutPoolContract]);

  useEffect(() => {
    const poolContract =
      optionType === OptionType.Call ? callPoolContract : putPoolContract;

    if (!poolContract || !maturity || !strike64x64 || !spot64x64 || !optionSize)
      return;

    if (!location.pathname.startsWith('/options')) return;

    async function fetchPricePerUnit() {
      try {
        const response = await poolContract!.quote(
          maturity,
          strike64x64,
          spot64x64,
          optionSize,
        );

        const fee = floatFromFixed(response.feeCost64x64) * underlyingPrice;
        const baseCost =
          floatFromFixed(response.baseCost64x64) * underlyingPrice;
        const totalCost = fee + baseCost;
        const pricePerUnit = totalCost / size;

        return { fee, totalCost, pricePerUnit };
      } catch (err) {
        console.log('Error fetching price per unit: ', err);
      }

      return null;
    }

    fetchPricePerUnit().then((response) => {
      if (response == null) return;

      const { totalCost, fee, pricePerUnit } = response;

      dispatch(updatePricePerUnit(pricePerUnit));
      dispatch(updateTotalCost(totalCost));
      dispatch(updateFee(fee));
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
    callPoolContract,
    putPoolContract,
  ]);

  return null;
}
