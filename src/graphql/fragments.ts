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
    totalWithdrawn
    totalLocked
    totalAvailable
    totalVolume
    totalExercised
    totalCharged
    totalFeesEarned
    openInterest
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
    totalWithdrawn
    totalLocked
    totalAvailable
    totalVolume
    totalExercised
    totalCharged
    totalFeesEarned
    openInterest
    uniqueTrades
    uniqueOptions
    uniqueExercises
    uniqueReassignments
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
    longTokenId

    lastTradePrice
    lastTradeFee
    lastTradeSize
    lastTradeTimestamp
    totalVolume
    totalExerciseReturn
    totalExercised
    totalCharged
    totalFeesEarned
    openInterest
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
    lastTradeFee
    lastTradeSize
    lastTradeTimestamp
    totalExerciseReturn
    totalExercised
    totalSpent
    totalFeesPaid
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
    totalLocked
    totalAvailable
    totalVolume
    totalAssigned
    totalPremiumsEarned
    totalReassignmentFees
    openInterest
    uniqueUnderwrites
    uniqueAssignments
    uniqueReassignments
    uniqueDeposits
    uniqueWithdrawals
  }
`;

export const CLevelChartItem = gql`
  ${Pool}

  fragment CLevelChartItem on CLevelChartItem {
    id
    pool {
      ...Pool
    }
    cLevel64x64
    cLevel
    timestamp
  }
`;
