import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useWeb3 } from 'state/application/hooks';
import { shortenAddress } from 'utils';

import { PageWithSidebar } from 'layouts';

import { StakePremiaCard, LockPremiaCard } from './components';

import PremiaBlue from 'assets/svg/PremiaLogoSmallBlue.svg';
import PremiaRed from 'assets/svg/PremiaLogoSmallRed.svg';

import theme from 'theme';

const useStyles = makeStyles(() => ({
  topContainer: {
  },
  topContainerMobile: {
    margin: '80px 0 0 12px',
    width: 'calc(100% - 50px)',
  },
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  horizontalBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  borderedBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    width: '190px',
    height: '55px',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '0 7px',
  },
  title: {
    fontWeight: 700,
    size: '28px',
  },
  text: {
    fontWeight: 500,
    size: '14px',
  },
  bigNumber: {
    fontWeight: 700,
    size: '18px',
  },
  premiaBox1: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '7px',
    // boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
  },
  premiaBox2: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(266.96deg, ${theme.palette.warning.main} 29.5%, ${theme.palette.warning.dark} 117.72%);`,
    // opacity: '0.2',
    borderRadius: '7px',
    zIndex: 1,
    // boxShadow: '0px 0px 4px rgba(236, 120, 81, 0.25)',
  },
  boxCover: {
    width: '40px',
    height: '40px',
    display: 'flex',
    background: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.2',
    zIndex: 2,
  }
}));

const Stake: React.FC = () => {
  const { account, wallet } = useWeb3();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageWithSidebar mobile={mobile}>
      <Grid container direction='column'>
        <Box
          width={1}
          className={mobile ? classes.topContainerMobile : classes.topContainer}
        >
          {wallet && wallet.provider && account ? (
            <>
              <Typography
                component='h2'
                variant='h4'
                color='textPrimary'
                style={{
                  fontFamily: '"Inter"',
                  fontWeight: 500,
                  fontSize: 24,
                  lineHeight: 1.5,
                }}
              >
                Hi {shortenAddress(account ?? '')},
              </Typography>

              <Typography
                component='h2'
                variant='h3'
                color='textPrimary'
                style={
                  !mobile
                    ? {
                        fontFamily: '"Teko"',
                        fontWeight: 600,
                        fontSize: 48,
                        marginBottom: 32,
                      }
                    : {
                        fontFamily: '"Teko"',
                        fontWeight: 600,
                        fontSize: 48,
                      }
                }
              >
                Welcome to Stake
              </Typography>
            </>
          ) : (
            <Typography
              component='h2'
              variant='h3'
              color='textPrimary'
              style={
                !mobile
                  ? {
                      fontFamily: '"Teko"',
                      fontWeight: 600,
                      fontSize: 48,
                      marginBottom: 32,
                    }
                  : {
                      fontFamily: '"Teko"',
                      fontWeight: 600,
                      fontSize: 40,
                      marginBottom: 8,
                    }
              }
            >
              Stake page
            </Typography>
          )}
        </Box>
        <Box display="flex" width={1} justifyContent="space-between" marginBottom="50px">
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
          <Box className={classes.horizontalBox} style={{ width: '394px' }}>
            <Box className={classes.borderedBox}>
              <Box className={classes.premiaBox1}>
                <img
                  src={PremiaBlue}
                  alt="Premia"
                />
              </Box>
              <Box className={classes.col}>
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
            <Box className={classes.borderedBox}>
              <Box className={classes.premiaBox2}>
                <Box className={classes.boxCover}>
                  <img
                    src={PremiaRed}
                    alt="xPremia"
                    style={{ zIndex: 10 }}
                  />
                </Box>
              </Box>
              <Box className={classes.col}>
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
                  {`8,912`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" width={1} justifyContent="space-evenly">
          <StakePremiaCard />
          <LockPremiaCard />
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default Stake;
