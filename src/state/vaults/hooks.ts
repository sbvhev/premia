import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState, AppDispatch } from 'state';
import { updateVaultType } from './actions';

export function useVaultType() {
  const dispatch = useDispatch<AppDispatch>();
  const { vaultType } = useSelector<AppState, AppState['vaults']>(
    (state: AppState) => state.vaults,
  );

  const setVaultType = useCallback(
    (vaultType: string) => {
      dispatch(updateVaultType(vaultType));
    },
    [dispatch],
  );

  return { vaultType, setVaultType };
}
