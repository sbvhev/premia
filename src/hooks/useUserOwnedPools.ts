import { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getUserOwnedPools } from 'graphql/queries';
import { getPairId } from 'graphql/utils';
import { UserOwnedPool } from 'web3/pools';
import { useWeb3 } from 'state/application/hooks';
import { useBase, useUnderlying } from 'state/options/hooks';

export function useUserOwnedPools(
  withPollInterval: boolean = true,
): UserOwnedPool[] {
  const { account } = useWeb3();
  const { base } = useBase();
  const { underlying } = useUnderlying();

  const { data: poolsData } = useQuery(getUserOwnedPools, {
    ...(withPollInterval ? { pollInterval: 5000 } : {}),
    variables: {
      account: account.toLowerCase(),
      pairId: getPairId(base, underlying),
    },
  });

  const pools: UserOwnedPool[] = useMemo(
    () => get(poolsData, 'userOwnedPools') || ([] as UserOwnedPool[]),
    [poolsData],
  );

  return pools;
}
