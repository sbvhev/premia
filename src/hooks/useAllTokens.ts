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
      baseAddress:
        base && base.address
          ? base.address.toLowerCase()
          : DAI[ChainId.MAINNET].address.toLowerCase(),
    },
  });

  const tokenPairs: TokenPair[] = useMemo(
    () => get(tokenPairsData, 'tokenPairs') || [],
    [tokenPairsData],
  );

  const allTokens: Token[] = useMemo(() => {
    return tokenPairs.map(({ underlying }) => underlying);
  }, [tokenPairs]);

  return [base, ...allTokens];
}
