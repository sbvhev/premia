import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { PageWithSidebar } from 'layouts';

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
    justifyContent: 'space-between',
    // width: '100%',
  },
  borderedBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    height: '55px',
    alignItems: 'center',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '0 7px',
  },
  title: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '27.5px',
  },
  text: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
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
    // boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
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
    // boxShadow: '0px 0px 4px rgba(236, 120, 81, 0.25)',
  },
  redPremiaIcon: {
    position: 'relative',
    top: 2,
    left: -42,
    zIndex: 100,
    opacity: 1,
  }
}));

const Stake: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageWithSidebar>
      <Grid container direction='column' style={{ marginTop: '22px' }}>
        <Box display="flex" width={1} flexDirection={!mobile ? 'row' : 'column'} justifyContent="space-between" marginBottom="50px">
          <Box className={classes.col}>
            <Typography
              component='h1'
              color='textPrimary'
              className={classes.title}
            >
              Choose how to stake your Premia
            </Typography>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.text}
            >
              Refine your interaction rewards, stake your Premia for fee sharing, or lock for reduced fees
            </Typography>
          </Box>
          <Box className={classes.horizontalBox}  width={!mobile ? '390px' : '100%'}>
            <Box className={classes.borderedBox} width={!mobile ? '190px' : '50%'}>
              <Box className={classes.premiaBox1}>
                <img
                  src={PremiaBlue}
                  alt="Premia"
                  style={{ marginTop: '3px' }}
                />
              </Box>
              <Box className={classes.col} style={{ marginBottom: '4px' }}>
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
            <Box className={classes.borderedBox} justifyContent="flex-start" width={!mobile ? '190px' : '50%'}>
              <Box className={classes.premiaBox2}>
              </Box>
                <img
                  src={PremiaRed}
                  alt="xPremia"
                  className={classes.redPremiaIcon}
                />
              <Box className={classes.colRelative} style={{ marginBottom: '4px' }}>
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
        <Box display="flex" flexDirection={!mobile ? 'row' : 'column'} width={1} justifyContent="center">
          <StakePremiaCard />
          <LockPremiaCard />
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default Stake;
