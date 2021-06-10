import React, { useMemo } from 'react';

import { useBase, useUnderlying, useStrikePrice } from 'state/options/hooks';
import { usePrices } from 'state/application/hooks';
import { useAllTokens } from 'hooks';
import { tokenIcons } from 'constants/tokenIcons';

import { SearchTabs } from 'components';

const SelectTokenTabs: React.FC = () => {
  const { setStrikePrice } = useStrikePrice();
  const { underlying, setUnderlying } = useUnderlying();
  const { base } = useBase();
  const prices = usePrices();
  const tokens = useAllTokens();

  const tabs = useMemo(
    () =>
      tokens
        .filter((token) => token.address !== base.address)
        .map((token) => ({
          token,
          label: token.symbol,
          icon: tokenIcons[token.symbol as keyof typeof tokenIcons],
          highlight: ['WETH', 'SUSHI'].includes(token.symbol),
        })),
    [tokens, base],
  );

  const activeTabIndex = useMemo(
    () => tabs.findIndex((tab) => tab.token.symbol === underlying.symbol),
    [tabs, underlying],
  );

  return (
    <SearchTabs
      hideSearch
      items={tabs}
      value={activeTabIndex === -1 ? 0 : activeTabIndex}
      onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
        const newToken = tabs[newValue].token;
        setUnderlying(newToken);
        setStrikePrice(prices[newToken.symbol]);
      }}
    />
  );
};

export default SelectTokenTabs;