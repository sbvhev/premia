import { useState, useEffect } from 'react';

import { useWeb3 } from 'state/application/hooks';

export function useDenominatorDecimals(
  _denominator: string | undefined | null = undefined,
): number {
  const [decimals, setDecimals] = useState<number>(18);
  const [prevDenom, setPrevDenom] =
    useState<string | null | symbol | number>(null);
  const { contracts } = useWeb3();
  // const { denominator: denominatorSetting } = useOptionSettings();

  const denominator = _denominator || ''; // || denominatorSetting;
  const denom = denominator.toString().toLowerCase() as keyof typeof contracts;

  useEffect(() => {
    if (decimals && prevDenom === denom) return;

    (async () => {
      const decimals = await contracts[denom]?.decimals();

      setPrevDenom(denom);
      setDecimals(decimals);
    })();
  }, [contracts, denom, decimals, prevDenom]);

  return decimals;
}

export default useDenominatorDecimals;
