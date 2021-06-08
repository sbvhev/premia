import gql from 'graphql-tag';

import { Token, TokenPair, Pool } from './fragments';

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
    $baseAddress: String!
    $first: Int = 100
    $skip: Int = 0
  ) {
    tokenPairs(
      where: { base: $baseAddress }
      first: $first
      skip: $skip
    ) {
      ...TokenPair
    }
  }
`;

export const getPool = gql`
  ${Pool}

  query Pool($id: String!) {
    pool(id: $id) {
      ...Pool
    }
  }
`;