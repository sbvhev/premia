import { BigNumber } from 'ethers';

export const floatFromFixed = function (bn: BigNumber, decimals: number) {
  return bn.mul(BigNumber.from(10).pow(decimals)).shr(64);
};

export default floatFromFixed;
