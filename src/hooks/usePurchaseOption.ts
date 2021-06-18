import { useCallback, useMemo } from 'react';

import {
  useOnChainOptionData,
  useUnderlying,
  useBase,
  useSize,
  useOptionType,
} from 'state/options/hooks';
// import { useCurrencyBalance } from 'state/wallet/hooks';
// import { useWeb3 } from 'state/application/hooks';
import { useTransact, usePools } from 'hooks';
import { OptionType } from 'web3/options';
import { calculateFloatGasMargin } from 'utils';
import { floatToBigNumber } from 'utils/floatToBigNumber';

export function usePurchaseOption(onComplete: () => void = () => {}) {
  // const { account } = useWeb3();
  const { optionPoolContract } = usePools();
  const { size } = useSize();
  const { base } = useBase();
  const { underlying } = useUnderlying();
  const { optionType } = useOptionType();
  const { maturity, strike64x64, optionSize, maxCost } = useOnChainOptionData();
  const transact = useTransact();

  const activeToken = useMemo(
    () => (optionType === OptionType.Call ? underlying : base),
    [optionType, underlying, base],
  );
  // const activeTokenBalance = useCurrencyBalance(account, activeToken);

  const onPurchaseOption = useCallback(async () => {
    if (!optionPoolContract || !activeToken) return;

    const additionalEthNecessary = 0;
    /* disabled for trading competition
      ['WETH', 'WBNB'].includes(activeToken.symbol) &&
      size > Number(activeTokenBalance)
        ? size - Number(activeTokenBalance)
        : 0;
    */

    const gasEstimate = await optionPoolContract.estimateGas[
      'purchase((uint64,int128,uint256,uint256,bool))'
    ](
      {
        maturity,
        strike64x64,
        amount: optionSize,
        maxCost,
        isCall: optionType === OptionType.Call,
      },
      {
        ...(additionalEthNecessary
          ? {
              value: floatToBigNumber(
                additionalEthNecessary + 0.00005,
                activeToken.decimals,
              ),
            }
          : {}),
      },
    );

    try {
      const tx = await transact(
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
            ...(additionalEthNecessary
              ? {
                  value: floatToBigNumber(
                    additionalEthNecessary + 0.00005,
                    activeToken.decimals,
                  ),
                }
              : {}),
          },
        ),
        {
          description: `Purchase ${size} ${underlying.symbol} ${optionType} options`,
        },
      );

      await tx?.wait(1);

      onComplete();
    } catch (err: any) {
      console.error('Could not complete purchase: ', err);
    }
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
    activeToken,
    // activeTokenBalance,
    onComplete,
  ]);

  return onPurchaseOption;
}

export default usePurchaseOption;
