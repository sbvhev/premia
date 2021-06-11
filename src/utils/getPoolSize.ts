import { Pool, UserOwnedPool } from 'web3/pools';

export function getPoolSize(pool?: Pool | UserOwnedPool): number {
  if (!pool) return 0;

  return (
    (Number(pool.totalAvailable) + Number(pool.totalLocked)) /
    10 ** pool.underlying.decimals
  );
}
