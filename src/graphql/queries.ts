import gql from 'graphql-tag';

import { Token, TokenPair } from './fragments';

export const getToken = gql`
  ${Token}

  query Token($tokenAddress: String!) {
    token(id: $tokenAddress) {
      ...Token
    }
  }
`;

export const getTokenPair = gql`
  ${TokenPair}

  query TokenPair($id: String!) {
    tokenPair(id: $id) {
      ...TokenPair
    }
  }
`;

export const getTokenPairs = gql`
  ${TokenPair}

  query TokenPairs(
    $denominatorAddress: String!
    $first: Int = 100
    $skip: Int = 0
  ) {
    tokenPairs(
      where: { denominator: $denominatorAddress }
      first: $first
      skip: $skip
    ) {
      ...TokenPair
    }
  }
`;
