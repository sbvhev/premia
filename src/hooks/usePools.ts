import { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getUserOwnedPoolsForPair, getPools } from 'graphql/queries';
import { getPairId } from 'graphql/utils';
import { OptionType } from 'web3/options';
import { Pool as PoolContract } from 'contracts';
import { Pool, UserOwnedPool } from 'web3/pools';
import { useWeb3 } from 'state/application/hooks';
import { useBase, useOptionType, useUnderlying } from 'state/options/hooks';
import { usePoolContract } from 'hooks';

export function usePools(
  userOwned: boolean = false,
  withPollInterval: boolean = true,
): {
  callPool: Pool | UserOwnedPool | undefined;
  putPool: Pool | UserOwnedPool | undefined;
  optionPool: Pool | UserOwnedPool | undefined;
  callPoolContract: PoolContract | undefined;
  putPoolContract: PoolContract | undefined;
  optionPoolContract: PoolContract | undefined;
} {
  const { account } = useWeb3();
  const { base } = useBase();
  const { underlying } = useUnderlying();
  const { optionType } = useOptionType();

  const query = useMemo(
    () => (userOwned ? getUserOwnedPoolsForPair : getPools),
    [userOwned],
  );

  const { data: poolsData } = useQuery(query, {
    ...(withPollInterval ? { pollInterval: 5000 } : {}),
    variables: {
      ...(userOwned ? { account: account.toLowerCase() } : {}),
      pairId: getPairId(base, underlying),
    },
  });

  const pools: Pool[] = useMemo(
    () =>
      get(poolsData, userOwned ? 'userOwnedPools' : 'pools') || ([] as Pool[]),
    [poolsData, userOwned],
  );

  const callPool = useMemo(
    () => pools.find((pool) => pool.optionType === OptionType.Call),
    [pools],
  );
  const putPool = useMemo(
    () => pools.find((pool) => pool.optionType === OptionType.Put),
    [pools],
  );
  const optionPool = useMemo(
    () => (optionType === OptionType.Call ? callPool : putPool),
    [optionType, callPool, putPool],
  );

  const callPoolContract = usePoolContract(callPool?.address) || undefined;
  const putPoolContract = usePoolContract(putPool?.address) || undefined;

  return {
    callPool,
    putPool,
    optionPool,
    callPoolContract: callPoolContract,
    putPoolContract: putPoolContract,
    optionPoolContract:
      optionType === OptionType.Call ? callPoolContract : putPoolContract,
  };
}
