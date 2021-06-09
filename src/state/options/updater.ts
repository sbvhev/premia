import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getPool } from 'graphql/queries';
import { getPoolId } from 'graphql/utils';
import { Pool } from 'web3/pools';
import {
  useUnderlyingPrice,
  useCallPoolContract,
  usePutPoolContract,
  useOnChainOptionData,
} from 'state/options/hooks';
import { AppDispatch, AppState } from 'state';
import { updatePricePerUnit, updateTotalCost } from './actions';
import { floatFromFixed } from 'utils/floatFromFixed';
import { usePoolContract as usePoolContractHook, useDebounce } from 'hooks';
import { OptionType } from 'web3/options';

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();
  const { setCallPoolContract } = useCallPoolContract();
  const { setPutPoolContract } = usePutPoolContract();
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
    callPoolContract,
    putPoolContract,
  } = useSelector<AppState, AppState['options']>((state) => state.options);
  const underlyingPrice = useUnderlyingPrice();

  const { data: callPoolData } = useQuery(getPool, {
    variables: {
      id: getPoolId(base, underlying, OptionType.Call),
    },
  });

  const { data: putPoolData } = useQuery(getPool, {
    variables: {
      id: getPoolId(base, underlying, OptionType.Put),
    },
  });

  const callPool: Pool | null = useMemo(
    () => get(callPoolData, 'pool') || null,
    [callPoolData],
  );

  const putPool: Pool | null = useMemo(
    () => get(putPoolData, 'pool') || null,
    [putPoolData],
  );

  const callContract = usePoolContractHook(callPool?.address);
  const putContract = usePoolContractHook(putPool?.address);

  useEffect(() => {
    if (!callPoolContract && callContract) {
      setCallPoolContract(callContract);
    }
  }, [callPoolContract, callContract, setCallPoolContract]);

  useEffect(() => {
    if (!putPoolContract && putContract) {
      setPutPoolContract(putContract);
    }
  }, [putContract, putPoolContract, setPutPoolContract]);

  useEffect(() => {
    const poolContract =
      optionType === OptionType.Call ? callPoolContract : putPoolContract;

    if (!poolContract || !maturity || !strike64x64 || !spot64x64 || !optionSize)
      return;

    async function fetchPricePerUnit() {
      try {
        const response = await poolContract!.quote(
          maturity,
          strike64x64,
          spot64x64,
          optionSize,
        );

        const totalCost = floatFromFixed(response.cost64x64) * underlyingPrice;
        const pricePerUnit = totalCost / size;

        return { totalCost, pricePerUnit };
      } catch (err) {
        console.log('Error fetching price per unit: ', err);
      }

      return null;
    }

    fetchPricePerUnit().then((response) => {
      if (response == null) return;

      const { totalCost, pricePerUnit } = response;

      dispatch(updatePricePerUnit(pricePerUnit));
      dispatch(updateTotalCost(totalCost));
    });
  }, [
    dispatch,
    maturity,
    strike64x64,
    spot64x64,
    optionSize,
    size,
    underlying,
    underlyingPrice,
    optionType,
    callPoolContract,
    putPoolContract,
  ]);

  return null;
}
