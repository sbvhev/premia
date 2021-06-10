import { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getUserOwnedOptions } from 'graphql/queries';
import { UserOwnedOption } from 'web3/options';
import { useWeb3 } from 'state/application/hooks';

export function useUserOwnedOptions(
  withPollInterval: boolean = true,
): UserOwnedOption[] {
  const { account } = useWeb3();

  const { data: optionsData } = useQuery(getUserOwnedOptions, {
    ...(withPollInterval ? { pollInterval: 5000 } : {}),
    variables: {
      account: account.toLowerCase(),
    },
  });

  const options: UserOwnedOption[] = useMemo(
    () => get(optionsData, 'userOwnedOptions') || ([] as UserOwnedOption[]),
    [optionsData],
  );

  return options;
}
