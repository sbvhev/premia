import { useCallback } from 'react';

import {
  useOnChainOptionData,
  useUnderlying,
  useSize,
  useOptionType,
} from 'state/options/hooks';
import { useTransact, usePools } from 'hooks';
import { OptionType } from 'web3/options';
import { calculateFloatGasMargin } from 'utils';

export function usePurchaseOption() {
  const { optionPoolContract } = usePools();
  const { size } = useSize();
  const { underlying } = useUnderlying();
  const { optionType } = useOptionType();
  const { maturity, strike64x64, optionSize, maxCost } = useOnChainOptionData();
  const transact = useTransact();

  const onPurchaseOption = useCallback(async () => {
    if (!optionPoolContract) return;

    const gasEstimate = await optionPoolContract.estimateGas[
      'purchase((uint64,int128,uint256,uint256,bool))'
    ]({
      maturity,
      strike64x64,
      amount: optionSize,
      maxCost,
      isCall: optionType === OptionType.Call,
    });

    return transact(
      optionPoolContract.purchase(
        {
          maturity,
          strike64x64,
          amount: optionSize,
          maxCost,
          isCall: optionType === OptionType.Call,
        },
        {
          gasLimit: calculateFloatGasMargin(Number(gasEstimate)),
        },
      ),
      {
        description: `Purchase ${size} ${underlying.symbol} ${optionType} options`,
      },
    );
  }, [
    transact,
    optionPoolContract,
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
