import gql from 'graphql-tag';

export const Token = gql`
  fragment Token on Token {
    id
    name
    symbol
    decimals
    address
  }
`;

export const TokenPair = gql`
  ${Token}

  fragment TokenPair on TokenPair {
    id
    name
    token {
      ...Token
    }
    denominator {
      ...Token
    }
    strikePriceIncrement
    openInterest
    totalVolume
  }
`;
