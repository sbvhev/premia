import { useMemo } from 'react';
import { Currency, ETHER } from '@uniswap/sdk';
import { ethers } from 'ethers';

import { BNB } from '../../constants';
import { ERC20_INTERFACE } from 'constants/erc20';
import { useWeb3 } from 'state/application/hooks';
import {
  useSingleContractMultipleData,
  useMultipleContractSingleData,
} from 'state/multicall/hooks';
import { isToken, Token } from 'web3/tokens';
import { useAllTokens, useMulticallContract } from 'hooks';
import { isAddress } from 'utils';

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useBaseBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: string | undefined;
} {
  const multicallContract = useMulticallContract();

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .map((address: string | false) =>
              address ? address.toLowerCase() : address,
            )
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses],
  );

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map((address) => [address]),
  );

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: string }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0];

        if (value) {
          memo[address] = ethers.utils.formatEther(value);
        }

        return memo;
      }, {}),
    [addresses, results],
  );
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[],
): [{ [tokenAddress: string]: string | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isToken(t) !== false) ?? [],
    [tokens],
  );

  const validatedTokenAddresses = useMemo(
    () => validatedTokens.map((vt) => vt.address).filter((vt) => vt),
    [validatedTokens],
  );

  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    [address],
  );

  const anyLoading: boolean = useMemo(
    () => balances.some((callState) => callState.loading),
    [balances],
  );

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{
              [tokenAddress: string]: string | undefined;
            }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0];

              if (value) {
                memo[token.address] = ethers.utils.formatUnits(
                  value,
                  token.decimals,
                );
              }

              return memo;
            }, {})
          : {},
      [address, validatedTokens, balances],
    ),
    anyLoading,
  ];
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[],
): { [tokenAddress: string]: string | undefined } {
  return useTokenBalancesWithLoadingIndicator(
    address,
    tokens?.filter((token) => token),
  )[0];
}

// get the balance for a single token/account combo
export function useTokenBalance(
  account?: string,
  token?: Token,
): string | undefined {
  const tokenBalances = useTokenBalances(account, [token]);
  if (!token) return undefined;
  return tokenBalances[token.address];
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[],
): (string | undefined)[] {
  const { chainId } = useWeb3();
  const tokens = useMemo(
    () =>
      currencies?.filter((currency): currency is Token => isToken(currency)) ??
      [],
    [currencies],
  );

  const tokenBalances = useTokenBalances(
    account === '' ? undefined : account,
    tokens,
  );
  const containsBase: boolean = useMemo(
    () =>
      currencies?.some((currency?: Currency) =>
        chainId === 56
          ? currency?.symbol === BNB.symbol
          : currency?.symbol === ETHER.symbol,
      ) ?? false,
    [currencies, chainId],
  );
  const baseBalance = useBaseBalances(containsBase ? [account] : []);

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || account === '' || !currency) return undefined;
        if (currency.symbol === ETHER.symbol || currency.symbol === BNB.symbol)
          return baseBalance[account];
        if (isToken(currency)) return tokenBalances[currency.address];

        return undefined;
      }) ?? [],
    [account, currencies, baseBalance, tokenBalances],
  );
}

export function useCurrencyBalance(
  account?: string,
  currency?: Currency,
): string | undefined {
  return useCurrencyBalances(account, [currency])[0];
}

// mimics useAllBalances
export function useAllTokenBalances(): {
  [tokenAddress: string]: string | undefined;
} {
  const { account } = useWeb3();
  const allTokens = useAllTokens();
  const balances = useTokenBalances(account, allTokens);
  return balances ?? {};
}
