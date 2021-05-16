import React, { CSSProperties } from 'react';
import { Currency } from '@uniswap/sdk';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useWeb3, usePrices } from 'state/application/hooks';
import { useCurrencyBalance } from 'state/wallet/hooks';
import { formatCompact } from 'utils/formatNumber';
import { CurrencyLogo, Loader } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  item: {
    display: 'flex',
    border: ({ isSelected }: any) =>
      isSelected
        ? `1px solid ${palette.primary.main}`
        : '1px solid transparent',
    borderRadius: 12,
    padding: '12px 16px',
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
}));

export interface TokenWalletItemProps {
  currency: Currency;
  isSelected?: boolean;
  style?: CSSProperties;
  onSelect?: () => void;
}

const TokenWalletItem: React.FC<TokenWalletItemProps> = ({
  currency,
  isSelected = false,
  style,
  onSelect,
}) => {
  const classes = useStyles({ isSelected });
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { account } = useWeb3();
  const balance = useCurrencyBalance(account, currency);

  const prices = usePrices();

  const ListItemFixed: any = ListItem as any;

  const price = prices[currency.symbol || ''];

  return (
    <ListItemFixed
      component='div'
      className={!mobile ? classes.item : classes.itemMobile}
      style={style}
      value={currency}
      onClick={onSelect}
    >
      <ListItemIcon className={classes.icon}>
        <CurrencyLogo currency={currency} size={'36px'} />
      </ListItemIcon>

      <ListItemText className={classes.title}>{currency.symbol}</ListItemText>

      <ListItemText className={classes.balance}>
        <Grid container direction='column' alignItems='flex-end'>
          {balance ? (
            <Typography variant='body2' className={classes.balanceText}>
              {formatCompact(balance)}
            </Typography>
          ) : account ? (
            <Loader />
          ) : null}

          {price && balance ? (
            <Typography variant='body2' className={classes.priceText}>
              $ {formatCompact(Number(price) * Number(balance))}
            </Typography>
          ) : null}
        </Grid>
      </ListItemText>
    </ListItemFixed>
  );
};

export default TokenWalletItem;
