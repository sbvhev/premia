import { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getUserOwnedPools } from 'graphql/queries';
import { UserOwnedPool } from 'web3/pools';
import { useWeb3 } from 'state/application/hooks';

export function useAllUserOwnedPools(
  withPollInterval: boolean = true,
): UserOwnedPool[] {
  const { account } = useWeb3();

  const { data: poolsData } = useQuery(getUserOwnedPools, {
    ...(withPollInterval ? { pollInterval: 5000 } : {}),
    variables: {
      account: account.toLowerCase(),
    },
  });

  const pools: UserOwnedPool[] = useMemo(
    () => get(poolsData, 'userOwnedPools') || ([] as UserOwnedPool[]),
    [poolsData],
  );

  return pools;
}
