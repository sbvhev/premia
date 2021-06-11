import { UserOwnedPool } from 'web3/pools';

export function getPoolFeesEarned(pool?: UserOwnedPool): number {
  if (!pool) return 0;

  return Number(pool.totalPremiumsEarned) / 10 ** pool.underlying.decimals;
}
