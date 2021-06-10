import { useCallback } from 'react';

import {
  useOnChainOptionData,
  useOptionsPoolContract,
  useUnderlying,
  useSize,
  useOptionType,
} from 'state/options/hooks';
import { useTransact } from 'hooks';

export function usePurchaseOption() {
  const poolContract = useOptionsPoolContract();
  const { size } = useSize();
  const { underlying } = useUnderlying();
  const { optionType } = useOptionType();
  const { maturity, strike64x64, optionSize, maxCost } = useOnChainOptionData();
  const transact = useTransact();

  const onPurchaseOption = useCallback(async () => {
    if (!poolContract) return;

    return transact(
      poolContract.purchase(maturity, strike64x64, optionSize, maxCost),
      {
        description: `Purchase ${size} ${underlying.symbol} ${optionType} options`,
      },
    );
  }, [
    transact,
    poolContract,
    maturity,
    strike64x64,
    underlying,
    size,
    optionSize,
    optionType,
    maxCost,
  ]);

  return onPurchaseOption;
}

export default usePurchaseOption;
