import { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getUserOwnedPools, getPools } from 'graphql/queries';
import { UserOwnedPool } from 'web3/pools';
import { useWeb3 } from 'state/application/hooks';

export function useAllUserOwnedPools(
  userOwned: boolean = false,
  withPollInterval: boolean = true,
): UserOwnedPool[] {
  const { account } = useWeb3();

  const query = useMemo(
    () => (userOwned ? getUserOwnedPools : getPools),
    [userOwned],
  );

  const { data: poolsData } = useQuery(query, {
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
