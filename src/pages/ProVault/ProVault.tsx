import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  BottomNavigationAction,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SwitchTab, LineChart, RadialChart } from 'components';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';

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
          <LineChart
            color='#BF47C3'
            dark={true}
            data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            width={500}
            height={200}
          />
          <LineChart
            color='#14A887'
            dark={true}
            data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            width={500}
            height={200}
          />
          <LineChart
            color='#BF47C3'
            dark={false}
            data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            width={500}
            height={200}
          />
          <LineChart
            color='#14A887'
            dark={false}
            data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            width={500}
            height={200}
          />
          <RadialChart
            color='#1EFF78'
            secondaryColor='#5294FF'
            width={300}
            data={[67]}
          >
            <UniswapIcon />
            Pool size in Uni
            <Typography component='h5' variant='body2' color='textSecondary'>
              211305
            </Typography>
          </RadialChart>
          <RadialChart
            color='#EB4A97'
            secondaryColor='#8C43F6'
            width={300}
            data={[67]}
          >
            <DaiIcon />
            Pool size in Dai
            <Typography component='h5' variant='body2' color='textSecondary'>
              211305
            </Typography>
          </RadialChart>
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default Stake;
