import { useCallback } from 'react';
import { BigNumber } from 'ethers';

import { Pool as PoolContract } from 'contracts';
import { PoolAbi } from 'constants/abi';
import { useWeb3 } from 'state/application/hooks';
import { useTransact } from 'hooks';
import { OptionType, UserOwnedOption } from 'web3/options';
import { calculateFloatGasMargin, getContract } from 'utils';
import { formatBigNumber } from 'utils/formatNumber';

export function useExerciseOption(onComplete: () => void = () => {}) {
  const transact = useTransact();
  const { web3, account } = useWeb3();

  const onExerciseOption = useCallback(
    async (userOwned: UserOwnedOption) => {
      if (!web3) return;

      const optionPoolContract: PoolContract = getContract(
        userOwned.option.pool.address,
        PoolAbi,
        web3,
        account && account !== '' ? account : undefined,
      ) as PoolContract;

      if (!optionPoolContract) return;

      const amount = BigNumber.from(userOwned.size).sub(
        BigNumber.from(userOwned.totalExercised),
      );
      const longTokenId = userOwned.option.longTokenId;

      const gasEstimate = await optionPoolContract.estimateGas[
        'exerciseFrom((address,uint256,uint256))'
      ]({
        holder: account,
        longTokenId,
        amount,
      });

      try {
        const tx = await transact(
          optionPoolContract.exerciseFrom(
            {
              holder: account,
              longTokenId,
              amount,
            },
            {
              gasLimit: calculateFloatGasMargin(Number(gasEstimate)),
            },
          ),
          {
            description: `Exercise ${formatBigNumber(amount)} ${
              userOwned.option.underlying.symbol
            } ${
              userOwned.option.optionType === OptionType.Call ? 'Call' : 'Put'
            } options`,
          },
        );

        await tx?.wait(1);

        onComplete();
      } catch (err: any) {
        console.error('Could not complete purchase: ', err);
      }
    },
    [transact, account, web3, onComplete],
  );

  return onExerciseOption;
}

export default useExerciseOption;
