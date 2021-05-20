import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useWeb3 } from 'state/application/hooks';
import { shortenAddress } from 'utils';

import { PageWithSidebar } from 'layouts';

const useStyles = makeStyles(() => ({
  hoverable: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },

  floatCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  floatTopLeft: {
    position: 'absolute',
    top: '65%',
    left: '30%',
    transform: 'translate(-30%, -65%)',
  },

  topContainer: {},

  title: {
    whiteSpace: 'nowrap',
  },

  titleMobile: {
    fontSize: '3.1vw',
  },

  smallerTitle: {
    whiteSpace: 'nowrap',
    fontSize: '1.5vw',
  },

  smallerTitleMobile: {
    whiteSpace: 'nowrap',
    fontSize: '2vw',
  },

  subtitle: {
    fontWeight: 300,
  },

  topContainerMobile: {
    margin: '80px 0 0 12px',
    width: 'calc(100% - 50px)',
  },
}));

const Stake: React.FC = () => {
  const { account, wallet } = useWeb3();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageWithSidebar>
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
      </Grid>
    </PageWithSidebar>
  );
};

export default Stake;
