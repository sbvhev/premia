import { useState } from 'react';
import { getAddress } from 'ethers/lib/utils';
import { get } from 'lodash';

import { useWeb3 } from 'state/application/hooks';
import useInterval from './useInterval';

export function useHasMerkleClaim(merkleRoot: any, aidropId: number) {
  const { account, contracts } = useWeb3();
  const [claimed, setClaimed] = useState(false);

  const index = get(merkleRoot, `claims.${getAddress(account)}.index`, null);
  const hasClaim = account === '' ? false : index !== null;

  useInterval(async () => {
    if (!contracts) return;

    const isClaimed = await contracts?.TradingCompetitionMerkle.isClaimed(
      aidropId,
      index,
    );

    setClaimed(isClaimed);
  }, 5000);

  return hasClaim && !claimed;
}
