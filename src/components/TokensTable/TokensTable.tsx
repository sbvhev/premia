import React, { useState, useEffect } from 'react';
import { Currency } from '@uniswap/sdk';
import { useAllTokens } from 'hooks';
import { BigNumber } from 'ethers';

import { Erc20Abi } from 'constants/abi';
import { useWeb3, usePrices } from 'state/application/hooks';
import { useCurrencyBalances } from 'state/wallet/hooks';
import { getContract } from 'utils';

import { DataTable } from 'components';
import TokensTableRow from './TokensTableRow';

const getHeadCells = () => [
  {
    id: 'symbol',
    numeric: false,
    label: 'Symbol',
    sortKey: (token: any) => token?.symbol,
  },
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    sortKey: (token: any) => token?.name,
  },
  {
    id: 'unlock',
    numeric: false,
    label: 'Unlock',
    sortKey: (token: any) =>
      !token?.allowance ? -1 : BigNumber.from(token?.allowance).gt(0) ? 1 : 0,
  },
  {
    id: 'balance',
    numeric: true,
    label: 'Balance',
    sortKey: (token: any) => token?.balance,
  },
  {
    id: 'value',
    numeric: true,
    label: 'Value',
    sortKey: (token: any) => Number(token?.balance) * Number(token?.price),
  },
  {
    id: 'action',
    numeric: true,
    label: 'Action',
    sortDisabled: true,
    sortKey: (token: any) => {
      const ind = token?.symbol.indexOf(token?.mToken);
      return ind > -1 ? ind : 2;
    },
  },
];

export interface TokensTableProps {
  filter?: { [filterOption: string]: any };
}

export const TokensTable: React.FC<TokensTableProps> = () => {
  const allTokens = useAllTokens();
  const { chainId, account, web3 } = useWeb3();
  const [tokens, setTokens] = useState<any>([]);
  // const { approvalType } = useApprovalType();
  // const denominatorAddress = useDenominatorAddress();

  const currencies: Currency[] = allTokens;

  // const currencies = useMemo(
  //   () => {
  //     const denominatorToken = { symbol: denominator, address: denominatorAddress, name: denominator, decimals: 18 };
  //     return [chainId === 56 ? BNB : ETHER, denominatorToken, ...allTokens];
  //   },
  //   [denominator, denominatorAddress, chainId, allTokens],
  // );

  const balances = useCurrencyBalances(account, currencies);
  const prices = usePrices();
  const mToken = chainId === 56 ? 'BNB' : 'ETH';

  const tokenArray = currencies
    .sort((a: any, b: any) => {
      return a.symbol > b.symbol ? 1 : -1;
    })
    .map((token: any, index) => {
      const price =
        token.symbol === mToken
          ? prices['W' + mToken]
          : prices[token.symbol || ''];
      const balance = balances[index];
      return { ...token, price, balance, mToken, allowance: 1 };
    });

  useEffect(() => {
    let mounted = true;
    if (!web3) return;
    Promise.all(
      tokenArray.map(async (token) => {
        if (token.symbol === mToken) {
          return { ...token, allowance: null };
        } else {
          const tokenContract = getContract(token.address, Erc20Abi, web3);
          const allowance = await tokenContract?.allowance(account, '');
          return { ...token, allowance };
        }
      }),
    ).then((tokens) => {
      if (mounted) setTokens(tokens);
    });
    return () => {
      mounted = false;
    };
  });

  const headCells = getHeadCells();

  return (
    <DataTable
      headCells={headCells}
      data={tokens}
      defaultOrderBy={headCells[5]}
      renderRow={(token: any, index) => {
        return <TokensTableRow key={index} token={token} />;
      }}
    />
  );
};

export default TokensTable;
