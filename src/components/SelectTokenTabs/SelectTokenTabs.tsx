import React from 'react';

import { useUnderlying } from 'state/options/hooks';
import { usePrices } from 'state/application/hooks';
import { useAllTokens } from 'hooks';

import { SearchTabs } from 'components';

const SelectTokenTabs: React.FC = () => {
  const { underlying, setUnderlying } = useUnderlying();
  const tokens = useAllTokens();
  const prices = usePrices();

  const tabs = tokens.map((token) => ({
    token,
    price: prices[token.symbol],
  }));

  return (
    <SearchTabs
      hideSearch
      items={tabs}
      value={tabs.findIndex((tab) => tab.token.address === underlying.address)}
      onChange={(event: React.ChangeEvent<{}>, newValue: number) =>
        setUnderlying(tabs[newValue].token)
      }
    />
  );
};

export default SelectTokenTabs;
