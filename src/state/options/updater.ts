import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getPool } from 'graphql/queries';
import { getPoolId } from 'graphql/utils';
import { Pool } from 'web3/pools';
import { useUnderlyingPrice, usePoolContract, useOnChainOptionData } from 'state/options/hooks';
import { AppDispatch, AppState } from 'state';
import { updatePricePerUnit, updateTotalCost } from './actions';
import { floatFromFixed } from 'utils/floatFromFixed';
import { usePoolContract as usePoolContractHook, useDebounce } from 'hooks'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>();
  const { setPoolContract } = usePoolContract();
  const onChainOptionData = useOnChainOptionData();
  const { maturity, strike64x64, spot64x64, optionSize } = useDebounce(onChainOptionData, 100);
  const { base, underlying, optionType, size, poolContract } = useSelector<
    AppState,
    AppState['options']
    >((state) => state.options);
  const underlyingPrice = useUnderlyingPrice();
  
  const { data: poolData } = useQuery(getPool, {
    variables: {
      id: getPoolId(base, underlying, optionType),
    },
  });

  const pool: Pool | null = useMemo(
    () => get(poolData, 'pool') || null,
    [poolData],
  );

  const contract = usePoolContractHook(pool?.address)

  useEffect(() => {
    if (!poolContract && contract) {
      setPoolContract(contract);
    }
  }, [contract, poolContract, setPoolContract]);

  useEffect(() => {
    if (!poolContract || !maturity || !strike64x64 || !spot64x64 || !optionSize) return;

    async function fetchPricePerUnit() {
      console.log('maturity', maturity);
      console.log('strike64x64', strike64x64);
      console.log('spot64x64', spot64x64);
      console.log('optionSize', optionSize);

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

      dispatch(updatePricePerUnit(pricePerUnit))
      dispatch(updateTotalCost(totalCost))
    })
  }, [
    dispatch,
    maturity,
    strike64x64,
    spot64x64,
    optionSize,
    size,
    underlying,
    underlyingPrice,
    poolContract,
  ]);

  return null;
}
