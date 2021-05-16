import { BigNumber, BigNumberish, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export function formatNumber(
  unformatted: number | string | BigNumber | BigNumberish | undefined | null,
  withCommas: boolean = true,
  options: any = {},
) {
  if (!unformatted) return '0';

  if (unformatted === Infinity) return '∞';

  let formatted: string | number = Number(unformatted);

  if (unformatted instanceof BigNumber) {
    formatted = Number(unformatted.toString());
  }

  formatted = formatted.toLocaleString(undefined, {
    maximumFractionDigits: 3,
    ...options,
  });

  return withCommas ? formatted : formatted.replace(/,/g, '');
}

export function formatBigNumber(
  unformatted: number | string | BigNumber | BigNumberish | undefined | null,
  withCommas: boolean = true,
  options: any = {},
  decimals = 18,
) {
  if (!unformatted) return '0';

  if (unformatted === Infinity) return '∞';

  const formatted = ethers.utils.formatUnits(
    BigNumber.from(unformatted),
    decimals,
  );
  return formatNumber(formatted, withCommas, options);
}

export function formatCompact(
  unformatted: number | string | BigNumber | BigNumberish | undefined | null,
  maximumFractionDigits: number | undefined = 3,
  maxPrecision: number | undefined = 4,
  decimals = 18,
) {
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits,
  });

  if (!unformatted) return '0';

  if (unformatted === Infinity) return '∞';

  let formatted: string | number = Number(unformatted);

  if (unformatted instanceof BigNumber) {
    formatted = Number(formatUnits(unformatted.toString(), decimals));
  }

  return formatter.format(Number(formatted.toPrecision(maxPrecision)));
}

export default formatNumber;
