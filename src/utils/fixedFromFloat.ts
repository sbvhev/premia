import { BigNumber } from 'ethers';

export const fixedFromBigNumber = function (bn: BigNumber) {
  return bn.abs().shl(64).mul(bn.abs().div(bn));
};

export const fixedFromFloat = function (float: number) {
  const [integer = '', decimal = ''] = float.toString().split('.');
  return fixedFromBigNumber(BigNumber.from(`${integer}${decimal}`)).div(
    BigNumber.from(`1${'0'.repeat(decimal.length)}`),
  );
};

export default fixedFromFloat;
