import gql from 'graphql-tag';

import {
  Token,
  TokenPair,
  Pool,
  UserOwnedOption,
  UserOwnedPool,
} from './fragments';

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

  query TokenPairs($baseAddress: String!, $first: Int = 100, $skip: Int = 0) {
    tokenPairs(where: { base: $baseAddress }, first: $first, skip: $skip) {
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

export const getUserOwnedOptions = gql`
  ${UserOwnedOption}

  query UserOwnedOptions($account: String!, $first: Int = 100, $skip: Int = 0) {
    userOwnedOptions(first: $first, skip: $skip, where: { user: $account }) {
      ...UserOwnedOption
    }
  }
`;

export const getUserOwnedPoolsForPair = gql`
  ${UserOwnedPool}

  query UserOwnedPools(
    $account: String!
    $pairId: String!
    $first: Int = 100
    $skip: Int = 0
  ) {
    userOwnedPools(
      first: $first
      skip: $skip
      where: { user: $account, pair: $pairId }
    ) {
      ...UserOwnedPool
    }
  }
`;

export const getUserOwnedPools = gql`
  ${UserOwnedPool}

  query UserOwnedPools($account: String!, $first: Int = 100, $skip: Int = 0) {
    userOwnedPools(first: $first, skip: $skip, where: { user: $account }) {
      ...UserOwnedPool
    }
  }
`;

export const getPools = gql`
  ${Pool}

  query Pools($pairId: String!, $first: Int = 100, $skip: Int = 0) {
    pools(first: $first, skip: $skip, where: { pair: $pairId }) {
      ...Pool
    }
  }
`;
