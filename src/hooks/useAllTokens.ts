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

  const { data: rinkebyTokenPairsData } = useQuery(getTokenPairs, {
    variables: {
      baseAddress: DAI[ChainId.RINKEBY].address.toLowerCase(),
    },
  });

  const tokenPairs: TokenPair[] = useMemo(
    () => get(tokenPairsData, 'tokenPairs') || [],
    [tokenPairsData],
  );

  const rinkebyTokenPairs: TokenPair[] = useMemo(
    () => get(rinkebyTokenPairsData, 'tokenPairs') || [],
    [rinkebyTokenPairsData],
  );

  const allTokens: Token[] = useMemo(() => {
    return (tokenPairs.length ? tokenPairs : rinkebyTokenPairs).map(
      ({ underlying }) => underlying,
    );
  }, [tokenPairs, rinkebyTokenPairs]);

  return [base, ...allTokens];
}
