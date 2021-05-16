import React, { useMemo, useRef } from 'react';
import { Box, List } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import { ETHER } from '@uniswap/sdk';
import AutoSizer from 'react-virtualized-auto-sizer';

import { BNB } from '../../constants';
import { useAllTokens } from 'hooks';
import { useWeb3 } from 'state/application/hooks';

import TokenList from './TokenList';

interface TokenSearchProps {
  onDismiss?: () => void;
}

const TokenSearch: React.FC<TokenSearchProps> = ({
  onDismiss,
}: TokenSearchProps) => {
  // const { selectedToken, setOptionSettings } = useOptionSettings();
  const { chainId } = useWeb3();
  const allTokens = useAllTokens();
  const fixedList = useRef<FixedSizeList>();
  const currencies = useMemo(
    () => [chainId === 56 ? BNB : ETHER, ...allTokens],
    [chainId, allTokens],
  );

  // const handleTokenSelect = useCallback(
  //   (currency: Token) => {
  //     setOptionSettings({ selectedToken: currency as Token });
  //     onDismiss?.();
  //   },
  //   [onDismiss, setOptionSettings],
  // );

  return (
    <Box
      clone
      width={1}
      style={{ flex: '1 1', height: '100%', minHeight: 300 }}
    >
      <List>
        <AutoSizer disableWidth>
          {({ height }) => (
            <TokenList
              height={height}
              currencies={currencies}
              selectedToken={null}
              fixedListRef={fixedList}
              onTokenSelect={() => {}}
            />
          )}
        </AutoSizer>
      </List>
    </Box>
  );
};

export default TokenSearch;
