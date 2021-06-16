import { useSelector } from 'react-redux';

import { AppState } from 'state';

export const useStakingBalances = () => {
  const settings = useSelector<AppState, AppState['staking']>(
    (state) => state.staking,
  );

  return {
    ...settings.balances,
  };
};
