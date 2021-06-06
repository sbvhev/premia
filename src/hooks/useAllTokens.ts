import { useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { ChainId } from '@uniswap/sdk';
import { get } from 'lodash';

import { DAI } from '../constants';
import { getTokenPairs } from 'graphql/queries';
import { useBase } from 'state/options/hooks';
import { Token, TokenPair } from 'web3/tokens';

export function useAllTokens() {
  const { base } = useBase();
  const { data: tokenPairsData } = useQuery(getTokenPairs, {
    variables: {
      denominatorAddress: base ? base.address : DAI[ChainId.MAINNET],
    },
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
