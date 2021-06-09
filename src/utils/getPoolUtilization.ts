import { Pool } from 'web3/pools';
import { getPoolSize } from './getPoolSize';

export function getPoolUtilization(pool?: Pool): number {
  if (!pool) return 0;

  const totalCapital = getPoolSize(pool);

  return totalCapital > 0 ? Number(pool?.totalLocked) / totalCapital / 100 : 0;
}
