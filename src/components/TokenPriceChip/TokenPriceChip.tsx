import React from 'react';
import { Box, Chip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { usePrices } from 'state/application/hooks';
import { Token } from 'web3/tokens';
import { formatNumber } from 'utils/formatNumber';

import { Loader, CurrencyLogo } from 'components';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.common.white,
    fontWeight: 700,
  },
}));

export interface TokenPriceChipProps {
  token: Token;
}

const TokenPriceChip: React.FC<TokenPriceChipProps> = ({ token }) => {
  const prices = usePrices();
  const classes = useStyles();

  return (
    <Chip
      icon={
        <Box paddingLeft='5px' paddingTop='5px' paddingRight='2px'>
          <CurrencyLogo currency={token} />
        </Box>
      }
      label={
        prices[token.symbol] ? (
          <span className={classes.label}>{`$ ${formatNumber(
            prices[token.symbol],
          )}`}</span>
        ) : (
          <Loader />
        )
      }
      color='primary'
    />
  );
};

export default TokenPriceChip;
