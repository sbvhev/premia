import { useCallback } from 'react';

import {
  useOnChainOptionData,
  useOptionsPoolContract,
} from 'state/options/hooks';
import { useTransact } from 'hooks';

export function usePurchaseOption() {
  const poolContract = useOptionsPoolContract();
  const { maturity, strike64x64, optionSize, maxCost } = useOnChainOptionData();
  const transact = useTransact();

  const onPurchaseOption = useCallback(async () => {
    if (!poolContract) return;

    console.log('maturity', maturity);
    console.log('strike64x64', strike64x64);
    console.log('optionSize', optionSize);
    console.log('maxCost', maxCost);

    return transact(
      poolContract.purchase(maturity, strike64x64, optionSize, maxCost),
      { description: `Purchase ${optionSize} options` },
    );
  }, [transact, poolContract, maturity, strike64x64, optionSize, maxCost]);

  return onPurchaseOption;
}

export default usePurchaseOption;
