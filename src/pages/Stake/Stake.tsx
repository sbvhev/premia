import React from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BigNumber } from 'ethers';
import cn from 'classnames';

import { StakePremiaCard, LockPremiaCard } from './components';

import { formatEther } from 'ethers/lib/utils';
import { formatNumber, formatBigNumber } from 'utils/formatNumber';
import { useStakingBalances } from 'state/staking/hooks';

import { ReactComponent as PremiaBlue } from 'assets/svg/NewLogoBlue.svg';
import { ReactComponent as PremiaRed } from 'assets/svg/NewLogoRedGradient.svg';

import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles(({ palette }) => ({
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  colRelative: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    top: 0,
    left: -30,
  },
  horizontalBox: {
    boxSizing: 'border-box',
    display: 'flex',
    minWidth: '390px',
    justifyContent: 'space-between',
  },
  horizontalBoxMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    maxWidth: '335px',
    marginTop: '15px',
    justifyContent: 'space-between',
  },
  borderedBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    height: '55px',
    alignItems: 'center',
    backgroundColor: palette.background.paper,
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '0 7px',
  },
  title: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '27.5px',
  },
  titleMobile: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '21px',
  },
  subtitle: {
    paddingTop: 5,
  },
  text: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
  },
  textMobile: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    marginTop: '12px',
  },
  bigNumber: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
  },
  premiaBox1: {
    width: '40px',
    minWidth: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.primary.dark,
    borderRadius: '7px',
    marginRight: '7px',

    '& svg path': {
      fill: palette.common.white,
    },
  },
  premiaBox2: {
    width: '40px',
    minWidth: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(266.96deg, ${palette.warning.main} 29.5%, ${palette.warning.dark} 117.72%);`,
    opacity: '0.2',
    borderRadius: '7px',
    marginRight: '7px',
    zIndex: 1,
  },
  redPremiaIcon: {
    position: 'relative',
    top: 4,
    left: -38,
    zIndex: 5,
    opacity: 1,

    '& svg path': {
      fill: palette.common.white,
    },
  },
}));

const Stake: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [darkMode] = useDarkModeManager();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { premiaBalance, xPremiaBalance, xPremiaLocked } = useStakingBalances();

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      height='100%'
      marginTop={!mobile ? '20px' : '8px'}
    >
      <Box
        display='flex'
        width={1}
        flexDirection={!mobile ? 'row' : 'column'}
        justifyContent='space-between'
        marginBottom='16px'
        alignItems={mobile ? 'center' : 'flex-start'}
      >
        <Box
          className={classes.col}
          style={
            !mobile
              ? { marginLeft: '20px' }
              : { justifyContent: 'space-between' }
          }
        >
          <Typography
            component='h1'
            color='textPrimary'
            className={!mobile ? classes.title : classes.titleMobile}
          >
            Choose how to stake your Premia
          </Typography>
          <Typography
            component='p'
            color='textSecondary'
            className={cn(
              classes.subtitle,
              !mobile ? classes.text : classes.textMobile,
            )}
          >
            Refine your interaction rewards, stake your Premia for fee sharing,
            or lock for reduced fees
          </Typography>
        </Box>
        <Box
          className={
            !mobile ? classes.horizontalBox : classes.horizontalBoxMobile
          }
        >
          <Box
            className={classes.borderedBox}
            width={!mobile ? '190px' : '50%'}
            marginRight='6px'
            style={
              darkMode
                ? {}
                : {
                    borderColor: 'transparent',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
                  }
            }
          >
            <Box className={classes.premiaBox1}>
              <PremiaBlue />
            </Box>
            <Box className={classes.col} style={{ margin: '4px 0' }}>
              <Typography
                component='p'
                color='textSecondary'
                className={classes.text}
              >
                Premia
              </Typography>
              <Typography
                component='h2'
                color='textPrimary'
                className={classes.bigNumber}
              >
                {formatNumber(formatEther(premiaBalance))}
              </Typography>
            </Box>
          </Box>
          <Box
            className={classes.borderedBox}
            justifyContent='flex-start'
            width={!mobile ? '190px' : '50%'}
            style={
              darkMode
                ? {}
                : {
                    borderColor: 'transparent',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
                  }
            }
          >
            <Box className={classes.premiaBox2}></Box>
            <Box className={classes.redPremiaIcon}>
              <PremiaRed />
            </Box>
            <Box
              className={classes.colRelative}
              style={{ margin: '4px 0 4px 8px' }}
            >
              <Typography
                component='p'
                color='textSecondary'
                className={classes.text}
              >
                xPremia
              </Typography>
              <Typography
                component='h2'
                color='textPrimary'
                className={classes.bigNumber}
              >
                {formatBigNumber(
                  BigNumber.from(xPremiaBalance).add(
                    BigNumber.from(xPremiaLocked),
                  ),
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection={!mobile ? 'row' : 'column'}
        width={1}
        height={'auto'}
        style={
          !mobile
            ? { justifyContent: 'center', margin: '20px 0' }
            : { alignItems: 'center' }
        }
      >
        <StakePremiaCard />
        <LockPremiaCard />
      </Box>
    </Box>
  );
};

export default Stake;
