import React, { useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BottomNavigationAction, useMediaQuery } from '@material-ui/core';
import { SwitchTab } from 'components';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { useWeb3 } from 'state/application/hooks';
import { shortenAddress } from 'utils';

import { PageWithSidebar } from 'layouts';

const useStyles = makeStyles(() => ({
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
  const [value, setValue] = useState(0);

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
                Welcome to Pro Vaults
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
              Pro Vaults page
            </Typography>
          )}
          <SwitchTab
            dark={true}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels={true}
          >
            <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
            <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
            <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
          </SwitchTab>
          <SwitchTab
            dark={false}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels={true}
          >
            <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
            <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
            <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
          </SwitchTab>
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default Stake;
