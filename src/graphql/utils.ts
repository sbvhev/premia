import { BigNumber } from 'ethers';

import { Token } from 'web3/tokens';

export function fixedToFloat(bn64x64: BigNumber): BigNumber {
  return bn64x64.mul(BigNumber.from(10).pow(18)).shr(64);
}

export function getPairId(base: Token, underlyingToken: Token): string {
  return base.id.toLowerCase() + '/' + underlyingToken.id.toLowerCase();
}

export function getPoolId(
  base: Token,
  underlying: Token,
  optionType: string,
): string {
  return getPairId(base, underlying) + '-' + optionType;
}

export function getOptionId(
  base: Token,
  underlying: Token,
  optionType: string,
  strike64x64: BigInt,
  maturity: BigInt,
): string {
  return (
    getPoolId(base, underlying, optionType) +
    '-' +
    strike64x64.toString() +
    '-' +
    maturity.toString()
  );
}

export function getOptionIdFromUserOwnedOptionId(
  userOwnedOptionId: string,
): string {
  return userOwnedOptionId.substr(userOwnedOptionId.indexOf('-') + 1);
}

export function getUserOwnedOptionId(
  base: Token,
  underlying: Token,
  optionType: string,
  strike64x64: BigInt,
  maturity: BigInt,
  user: string,
): string {
  return (
    user +
    '-' +
    getOptionId(base, underlying, optionType, strike64x64, maturity)
  );
}

export function getPoolIdFromUserOwnedPoolId(userOwnedPoolId: string): string {
  return userOwnedPoolId.substr(userOwnedPoolId.indexOf('-') + 1);
}

export function getUserOwnedPoolId(
  base: Token,
  underlying: Token,
  optionType: string,
  user: string,
): string {
  return user + '-' + getPoolId(base, underlying, optionType);
}

export {};
