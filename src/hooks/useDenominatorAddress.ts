import { useWeb3 } from 'state/application/hooks';

export function useDenominatorAddress(
  _denominator: string | undefined | null = undefined,
): string | undefined {
  const { contracts } = useWeb3();
  // const { denominator: denominatorSetting } = useOptionSettings();

  const denominator = _denominator || ''; // || denominatorSetting;
  const denom = denominator.toString().toLowerCase() as keyof typeof contracts;

  return contracts[denom]?.address.toLowerCase() ?? undefined;
}

export default useDenominatorAddress;
