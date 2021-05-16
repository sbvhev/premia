import { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { getTokenPairs } from 'graphql/queries';
import { Token, TokenPair } from 'web3/tokens';
import { useDenominatorAddress } from 'hooks';
import { contracts } from 'web3/contracts';

export function useAllTokens() {
  const denominatorAddress = useDenominatorAddress();

  const { data: tokenPairsData } = useQuery(getTokenPairs, {
    variables: { denominatorAddress: denominatorAddress || contracts.DAI[1] },
  });

  const tokenPairs: TokenPair[] = useMemo(
    () => get(tokenPairsData, 'tokenPairs') || [],
    [tokenPairsData],
  );

  const allTokens: Token[] = useMemo(() => {
    return tokenPairs.map(({ token }) => token);
  }, [tokenPairs]);

  return allTokens;
}
