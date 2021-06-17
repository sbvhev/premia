import { useCallback, useMemo } from 'react';
import { ethers } from 'ethers';

import { useWeb3 } from 'state/application/hooks';
import { useTransact } from 'hooks';

export function useWrapEther() {
  const { chainId, contracts } = useWeb3();
  const transact = useTransact();

  const contract = useMemo(() => {
    if (!contracts) return {} as any;

    switch (chainId) {
      case 56:
        return contracts.WBNB;

      case 137:
        return contracts.WMATIC;

      default:
        return contracts.WETH;
    }
  }, [contracts, chainId]);

  const onWrapEther = useCallback(
    async (amount: number | string) => {
      if (!contract) return;

      return transact(
        contract.deposit({
          value: ethers.utils.parseEther(String(amount)).toString(),
        }),
        { description: `Wrap ${amount} ETH to WETH` },
      );
    },
    [transact, contract],
  );

  const onUnwrapEther = useCallback(
    async (amount: number | string) => {
      if (!contract) return;

      return transact(
        contract.withdraw(ethers.utils.parseEther(String(amount)).toString()),
        { description: `Unwrap ${amount} WETH to ETH` },
      );
    },
    [transact, contract],
  );

  return { onWrapEther, onUnwrapEther };
}

export default useWrapEther;
