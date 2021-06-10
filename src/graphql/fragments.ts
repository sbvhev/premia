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
    base {
      ...Token
    }
    underlying {
      ...Token
    }

    totalDeposited
    totalLocked
    totalAvailable
    openInterest
    totalVolume
    totalExercised
    uniqueTrades
    uniqueOptions
    uniqueExercises
    uniqueDeposits
    uniqueWithdrawals
  }
`;

export const Pool = gql`
  ${Token}
  ${TokenPair}

  fragment Pool on Pool {
    id
    address
    name
    pair {
      ...TokenPair
    }
    base {
      ...Token
    }
    underlying {
      ...Token
    }
    optionType
    cLevel
    cLevel64x64

    totalDeposited
    totalLocked
    totalAvailable
    openInterest
    totalVolume
    totalExercised
    uniqueTrades
    uniqueOptions
    uniqueExercises
    uniqueDeposits
    uniqueWithdrawals
  }
`;

export const Option = gql`
  ${Token}
  ${TokenPair}
  ${Pool}

  fragment Option on Option {
    id
    pool {
      ...Pool
    }
    pair {
      ...TokenPair
    }
    base {
      ...Token
    }
    underlying {
      ...Token
    }
    optionType
    strike
    strike64x64
    maturity

    lastTradePrice
    lastTradeSize
    lastTradeTimestamp
    openInterest
    totalVolume
    totalExercised
    uniqueTrades
    uniqueExercises
  }
`;

export const UserOwnedOption = gql`
  ${Option}

  fragment UserOwnedOption on UserOwnedOption {
    id
    user
    option {
      ...Option
    }
    size

    lastTradePrice
    lastTradeSize
    lastTradeTimestamp
    totalExercised
  }
`;

export const UserOwnedPool = gql`
  ${Token}
  ${TokenPair}
  ${Pool}

  fragment UserOwnedPool on UserOwnedPool {
    id
    address
    user
    pool {
      ...Pool
    }
    pair {
      ...TokenPair
    }
    base {
      ...Token
    }
    underlying {
      ...Token
    }
    optionType
    size

    lastDepositSize
    lastDepositTimestamp
    lastWithdrawalSize
    lastWithdrawalTimestamp
    totalDeposited
    totalWithdrawn
  }
`;
