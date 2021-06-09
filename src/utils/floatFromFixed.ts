import { BigNumber } from 'ethers';

export function floatFromFixed(fixed: BigNumber): number {
  if (!fixed) return 0;

  const integer = fixed.shr(64);
  const decimals = fixed.sub(integer.shl(64));

  const decimalsNumber = decimals.mul(1e10).div(BigNumber.from(1).shl(64));

  return Number(integer) + Number(decimalsNumber) / 1e10;
}

export default floatFromFixed;
