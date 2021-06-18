import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import cn from 'classnames';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ReactComponent as WBTCIcon } from 'assets/svg/WBTCIcon.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as EthIcon } from 'assets/svg/ETHIcon.svg';
import { ReactComponent as CartIcon } from 'assets/svg/Cart.svg';
import { StepProps } from './Stepper';
import { useIsDarkMode } from 'state/user/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selector: {
      padding: 22,

      [theme.breakpoints.down('md')]: {
        padding: '22px 10px',
      },
    },
    title: {
      fontSize: 18,
      lineHeight: '18px',
      fontWeight: 700,
      marginBottom: 20,

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
    assets: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,

      '& > div': {
        cursor: 'pointer',
        width: 'calc(20% - 14px)',
        position: 'relative',
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        lineHeight: '18px',
        fontWeight: 'bold',
        borderRadius: 12,
        background: 'rgba(82, 148, 255, 0.1)',
        border: '1px solid transparent',

        '&:hover:not(:active)': {
          borderColor: theme.palette.text.primary,
        },

        '&:active': {
          opacity: 0.8,
        },

        [theme.breakpoints.down('md')]: {
          padding: '20px 28px',
          display: 'flex',
          flexDirection: 'row',
          textAlign: 'start',
          justifyContent: 'start',
          width: '100%',
          height: 85,
          marginBottom: 10,
        },

        '& svg': {
          width: 52,
          height: 52,
          marginBottom: 16,
          opacity: 0.5,

          [theme.breakpoints.down('md')]: {
            width: 42,
            height: 42,
            marginBottom: 0,
            marginRight: 20,
          },

          '& path': {
            fill: (props: any) => (props.dark ? '#DCDCDC' : '#8D97A0'),
          },
        },
      },

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },

      '& $selected': {
        background: `linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)`,
        color: theme.palette.background.paper,

        '& svg': {
          opacity: 1,

          '& path': {
            fill: theme.palette.background.paper,
          },
        },
      },
    },
    divider: {
      width: '100%',
      borderTop: `1px solid ${theme.palette.divider}`,
      position: 'relative',
      color: '#646464',

      '& p': {
        position: 'absolute',
        width: 'fit-content',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        background: theme.palette.background.paper,
        padding: '0rem 1rem',
        fontWeight: 700,
        fontSize: 14,
        lineHeight: '24px',
      },
    },
    selected: {},
    entireMarket: {
      width: '100%',
      height: 50,
      borderRadius: 12,
      marginTop: 20,
      background: 'rgba(82, 148, 255, 0.1)',
      color: theme.palette.text.primary,
      fontSize: 16,
      lineHeight: '18px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: '1px solid transparent',

      '&:hover:not(:active)': {
        borderColor: theme.palette.text.primary,
      },

      '&:active': {
        opacity: 0.8,
      },

      '& svg': {
        marginRight: 8,
        opacity: 0.5,

        '& path': {
          fill: theme.palette.text.primary,
        },
      },

      '&$selected': {
        background: `linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)`,
        color: theme.palette.background.paper,

        '& svg': {
          opacity: 1,

          '& path': {
            opacity: 1,
            fill: theme.palette.background.paper,
          },
        },
      },
    },
  }),
);

const StepOne: React.FC<StepProps> = ({ activeStep }) => {
  const dark = useIsDarkMode();
  const classes = useStyles({ dark });
  const [selectedAsset, setSelectedAsset] = useState('');

  return (
    <Box component='div' className={classes.selector}>
      <Typography className={classes.title}>
        What asset are you thinking of?
      </Typography>
      <Box className={classes.assets}>
        <Box
          className={cn(selectedAsset === 'wBTC' ? classes.selected : '')}
          onClick={() => {
            setSelectedAsset('wBTC');
          }}
        >
          <WBTCIcon />
          wBTC
        </Box>
        <Box
          className={cn(selectedAsset === 'Uni' ? classes.selected : '')}
          onClick={() => {
            setSelectedAsset('Uni');
          }}
        >
          <UniswapIcon />
          Uni
        </Box>
        <Box
          className={cn(selectedAsset === 'Link' ? classes.selected : '')}
          onClick={() => {
            setSelectedAsset('Link');
          }}
        >
          <LinkIcon />
          Link
        </Box>
        <Box
          className={cn(selectedAsset === 'YFI' ? classes.selected : '')}
          onClick={() => {
            setSelectedAsset('YFI');
          }}
        >
          <YFIIcon />
          YFI
        </Box>
        <Box
          className={cn(selectedAsset === 'ETH' ? classes.selected : '')}
          onClick={() => {
            setSelectedAsset('ETH');
          }}
        >
          <EthIcon />
          ETH
        </Box>
      </Box>
      <Box className={classes.divider}>
        <Typography>or</Typography>
        <Box
          className={cn(
            selectedAsset === 'Entire Market' ? classes.selected : '',
            classes.entireMarket,
          )}
          onClick={() => {
            setSelectedAsset('Entire Market');
          }}
        >
          <CartIcon />
          Entire market
        </Box>
      </Box>
    </Box>
  );
};

export default StepOne;
