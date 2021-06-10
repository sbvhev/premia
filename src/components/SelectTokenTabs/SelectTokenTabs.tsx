import React, { useMemo } from 'react';

import { useBase, useUnderlying } from 'state/options/hooks';
import { useAllTokens } from 'hooks';
import { tokenIcons } from 'constants/tokenIcons';

import { SearchTabs } from 'components';

const SelectTokenTabs: React.FC = () => {
  const { underlying, setUnderlying } = useUnderlying();
  const { base } = useBase();
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
      onChange={(event: React.ChangeEvent<{}>, newValue: number) =>
        setUnderlying(tabs[newValue].token)
      }
    />
  );
};

export default SelectTokenTabs;
