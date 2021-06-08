import React, { CSSProperties } from 'react';
import { Typography, Box, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useWeb3 } from 'state/application/hooks';
import { useCurrencyBalance } from 'state/wallet/hooks';
import { formatCompact } from 'utils/formatNumber';
import { Loader } from 'components';
import { Token } from 'web3/tokens';

const useStyles = makeStyles(({ palette }) => ({
  item: {
    display: 'flex',
    border: ({ isSelected }: any) =>
      isSelected
        ? `1px solid ${palette.primary.main}`
        : '1px solid transparent',
    borderRadius: 12,
    padding: '6px 8px',
    margin: '2px 0',
    cursor: 'pointer',

    '&:hover': {
      border: `1px solid ${palette.primary.main}`,

      '& $icon': {
        color: palette.text.primary,
      },

      '& $title': {
        color: palette.text.primary,
      },
    },
  },
  itemMobile: {
    display: 'flex',
    border: ({ isSelected }: any) =>
      isSelected
        ? `1px solid ${palette.primary.main}`
        : '1px solid transparent',
    borderRadius: 12,
    padding: '12px 6px',
    margin: '2px 0',
    cursor: 'pointer',

    '&:hover': {
      border: `1px solid ${palette.primary.main}`,

      '& $icon': {
        color: palette.text.primary,
      },

      '& $title': {
        color: palette.text.primary,
      },
    },
  },

  icon: {
    minWidth: 32,
    color: ({ isSelected }: any) =>
      isSelected ? palette.text.primary : palette.text.secondary,
  },

  title: {
    marginLeft: '1rem',
    color: ({ isSelected }: any) =>
      isSelected ? palette.text.primary : palette.text.primary,

    '&> span': {
      fontSize: 12,
    },
  },

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
  token: Token;
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
  const balance = useCurrencyBalance(account, token);

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
          {balance ? (
            <Typography color='textSecondary'>
              {formatCompact(balance)}
            </Typography>
          ) : account ? (
            <Loader />
          ) : null}
        </MenuItem>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TokenMenuItem;
