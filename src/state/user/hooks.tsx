import { Pair, Token } from '@uniswap/sdk';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from 'state';
import { updateUserDarkMode } from './actions';

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useSelector<
    AppState,
    { userDarkMode: boolean | null; matchesDarkMode: boolean }
  >(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual,
  );

  return userDarkMode === null ? matchesDarkMode : userDarkMode;
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useIsDarkMode();

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }));
  }, [darkMode, dispatch]);

  return [darkMode, toggleSetDarkMode];
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  return new Token(
    tokenA.chainId,
    Pair.getAddress(tokenA, tokenB),
    18,
    'UNI-V2',
    'Uniswap V2',
  );
}
