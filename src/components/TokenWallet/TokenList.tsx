import React, { MutableRefObject, useCallback } from 'react';
import { Currency, ETHER, currencyEquals } from '@uniswap/sdk';
import { FixedSizeList } from 'react-window';

import { Token, isToken } from 'web3/tokens';

import TokenWalletItem from './TokenWalletItem';

function currencyKey(currency: Currency): string {
  if (isToken(currency)) {
    return (currency as Token).address;
  }

  if (currency === ETHER) {
    return 'ETHER';
  } else if (currency.symbol === 'BNB') {
    return 'BNB';
  }

  return '';
}

export default function TokenList({
  height,
  currencies,
  selectedToken,
  fixedListRef,
  onTokenSelect,
}: {
  height: number;
  currencies: Currency[];
  selectedToken?: Token | null;
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>;
  onTokenSelect: (token: Token) => void;
}) {
  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index];
      const isSelected = Boolean(
        selectedToken && currencyEquals(selectedToken, currency),
      );
      const handleSelect = () =>
        isToken(currency) ? onTokenSelect(currency as Token) : {};

      return (
        <TokenWalletItem
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
        />
      );
    },
    [onTokenSelect, selectedToken],
  );

  const itemKey = useCallback(
    (index: number, data: any) => currencyKey(data[index]),
    [],
  );

  return (
    <FixedSizeList
      width='100%'
      height={height}
      ref={fixedListRef as any}
      itemData={currencies}
      itemCount={currencies.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  );
}
