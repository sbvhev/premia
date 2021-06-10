import React, { CSSProperties } from 'react';
import { Typography, Box, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3 } from 'state/application/hooks';
import { useCurrencyBalance, useTokenBalance } from 'state/wallet/hooks';
import { formatCompact } from 'utils/formatNumber';
import { Loader } from 'components';
import { Currency } from '@uniswap/sdk';
import { Token, isToken } from 'web3/tokens';
import { CurrencyWithLogoUri } from 'hooks';

const useStyles = makeStyles(({ palette }) => ({
  balance: {
    justifySelf: 'flex-end',
    textAlign: 'right',
  },

  balanceText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '5rem',
    textOverflow: 'ellipsis',
    color: `${palette.success.main}`,
  },

  priceText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '5rem',
    textOverflow: 'ellipsis',
    color: `${palette.text.secondary}`,
    fontSize: '0.7rem',
    fontWeight: 300,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '375px',
    height: '54px',
    paddingRight: '20px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  menuItemMobile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '308px',
    height: '54px',
    paddingRight: '20px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  menuItemAssetName: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '10px',
    marginLeft: '2px',
    color: palette.text.secondary,
  },
  elementHeader: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    textAlign: 'left',
    marginLeft: '2px',
    color: palette.text.primary,
  },
}));

export interface TokenWalletItemProps {
  token: Token | CurrencyWithLogoUri;
  isSelected?: boolean;
  style?: CSSProperties;
  onSelect?: () => void;
}

const TokenMenuItem: React.FC<TokenWalletItemProps> = ({
  token,
  isSelected = false,
  style,
  onSelect,
}) => {
  const classes = useStyles({ isSelected });
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const { account } = useWeb3();
  const tokenBalance = useTokenBalance(
    account,
    isToken(token) ? token : undefined,
  );
  const currencyBalance = useCurrencyBalance(
    account,
    !isToken(token) ? (token as unknown as Currency) : undefined,
  );

  if (currencyBalance) {
    console.log('account', currencyBalance);
  }

  return (
    <>
      {token ? (
        <MenuItem
          className={!mobile ? classes.menuItem : classes.menuItemMobile}
          key={token.symbol}
          onClick={onSelect}
        >
          <Box display='flex' alignItems='center'>
            <img
              src={token.logoURI}
              alt={token.symbol}
              style={{ width: '28px', height: '28px' }}
            />
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              marginLeft='6px'
              height='28px'
            >
              <Typography className={classes.elementHeader} color='textPrimary'>
                {token.symbol}
              </Typography>
              <Typography className={classes.menuItemAssetName}>
                {token.name}
              </Typography>
            </Box>
          </Box>
          {tokenBalance || currencyBalance ? (
            <Typography color='textSecondary'>
              {formatCompact(tokenBalance || currencyBalance)}
            </Typography>
          ) : account ? (
            <Loader />
          ) : (
            <Loader />
          )}
        </MenuItem>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TokenMenuItem;
