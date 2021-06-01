import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { StakePremiaCard, LockPremiaCard } from './components';

import PremiaBlue from 'assets/svg/PremiaLogoSmallBlue.svg';
import PremiaRed from 'assets/svg/PremiaLogoSmallRed.svg';

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
    top: 2,
    left: -42,
    zIndex: 5,
    opacity: 1,
  },
}));

const Stake: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display='flex'
      flexDirection='column'
      style={{ marginTop: '8px', width: '100%', height: '100%' }}
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
              ? { marginLeft: '12px' }
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
            className={!mobile ? classes.text : classes.textMobile}
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
            style={{ marginRight: '6px' }}
          >
            <Box className={classes.premiaBox1}>
              <img src={PremiaBlue} alt='Premia' style={{ marginTop: '3px' }} />
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
                {`124,098`}
              </Typography>
            </Box>
          </Box>
          <Box
            className={classes.borderedBox}
            justifyContent='flex-start'
            width={!mobile ? '190px' : '50%'}
          >
            <Box className={classes.premiaBox2}></Box>
            <img
              src={PremiaRed}
              alt='xPremia'
              className={classes.redPremiaIcon}
            />
            <Box className={classes.colRelative} style={{ margin: '4px 0' }}>
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
                {`128,912`}
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
