

import { Token } from 'web3/tokens';

export function getPairId(base: Token, underlyingToken: Token): string {
  if (['DAI', 'BUSD'].includes(base.symbol)) {
    return base.id.toLowerCase() + '/' + underlyingToken.id.toLowerCase()
  }
  return underlyingToken.id.toLowerCase() + '/' + base.id.toLowerCase()
}

export function getPoolId(
  base: Token,
  underlying: Token,
  optionType: string
): string {
  return getPairId(base, underlying) + '-' + optionType
}

export function getOptionId(
  base: Token,
  underlying: Token,
  optionType: string,
  strike64x64: BigInt,
  maturity: BigInt
): string {
  return (
    getPoolId(base, underlying, optionType) +
    '-' +
    strike64x64.toString() +
    '-' +
    maturity.toString()
  )
}

export function getOptionIdFromUserOwnedOptionId(
  userOwnedOptionId: string
): string {
  return userOwnedOptionId.substr(userOwnedOptionId.indexOf('-') + 1)
}

export function getUserOwnedOptionId(
  base: Token,
  underlying: Token,
  optionType: string,
  strike64x64: BigInt,
  maturity: BigInt,
  user: string
): string {
  return (
    user +
    '-' +
    getOptionId(base, underlying, optionType, strike64x64, maturity)
  )
}

export function getPoolIdFromUserOwnedPoolId(userOwnedPoolId: string): string {
  return userOwnedPoolId.substr(userOwnedPoolId.indexOf('-') + 1)
}

export function getUserOwnedPoolId(
  base: Token,
  underlying: Token,
  optionType: string,
  user: string
): string {
  return user + '-' + getPoolId(base, underlying, optionType)
}

export {}