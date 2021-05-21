import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  Paper,
  Button,
} from '@material-ui/core';
import cn from 'classnames';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { LineChart, RadialChart } from 'components';
import { ReactComponent as BasicIcon } from 'assets/svg/BasicIcon.svg';
import { ReactComponent as ProIcon } from 'assets/svg/ProIcon.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ArrowUpward, ArrowDownward, Help } from '@material-ui/icons';

import { useWeb3 } from 'state/application/hooks';
import { PageWithSidebar } from 'layouts';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '27.5px',
    marginBottom: 36,
  },
  topTab: {
    marginBottom: 20,
  },
  mainContent: {},
  call: {},
  put: {},
  subtitle: {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: 18,
      height: 18,
      marginLeft: 8,

      '& path': {
        fill: theme.palette.secondary.main
      }
    }

  },
  header: {
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',

    '& h1': {
      marginRight: 8
    },

    '& svg': {
      marginRight: 8
    }
  },
  topSector: {
    padding: 28,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  bottomSector: {
    padding: 28,

    '& h1': {
      fontWeight: 'bold'
    }
  },
  content: {
    display: 'flex',
  },
  rightPanel: {
    display: 'flex',
    width: 'calc(100% - 200px)',

    '& svg': {
      position: 'relative',
      top: -2,
      width: 20,
      height: 20,
    },

    '& > div > h2': {
      fontWeight: 'bold',
      lineHeight: '18px',
      fontSize: 16,
      marginBottom: 8,
    },

    '& h2': {
      lineHeight: '24px',
    },
  },
}));

const ProVault: React.FC = () => {
  const { account, wallet } = useWeb3();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);

  return (
    <PageWithSidebar>
      <Grid container direction='column'>
        <Box width={1}>
          <Typography
            component='h1'
            variant='h3'
            color='textPrimary'
            className={classes.title}
          >
            Vaults
          </Typography>
          <Grid container direction='row' className={classes.topTab}>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels={true}
            >
              <BottomNavigationAction label='Basic' icon={<BasicIcon />} />
              <BottomNavigationAction label='Pro' icon={<ProIcon />} />
            </BottomNavigation>
          </Grid>
          <Grid container direction='row' spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.call}>
                <Box component='div' className={classes.topSector}>
                  <Box component='div' className={classes.header}>
                    <ArrowUpward />
                    <Typography
                      variant='h6'
                      component='h1'
                      color='textPrimary'
                    >
                      Call Pool
                    </Typography>
                    <Typography
                      variant='body1'
                      component='h2'
                      color='textSecondary'
                    >
                      78% Utilization
                    </Typography>
                  </Box>
                  <Grid container direction='row'>
                    <RadialChart
                      color='#5294FF'
                      secondaryColor='#1EFF78'
                      width={200}
                      height={200}
                      data={[67]}
                    >
                      <UniswapIcon />
                      Pool size in Uni
                      <Typography
                        component='h5'
                        variant='body2'
                        color='textSecondary'
                      >
                        211305
                      </Typography>
                    </RadialChart>
                    <Grid
                      item
                      direction='column'
                      justify='space-between'
                      className={classes.rightPanel}
                    >
                      <Grid container direction="column">
                        <Typography
                          variant='body2'
                          component='h2'
                          color='textPrimary'
                        >
                          My P&L
                        </Typography>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              My total capital
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              10000
                            </Typography>
                            <UniswapIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              Fees earned
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              100
                            </Typography>
                            <DaiIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              % of capital active
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              46%
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container direction='row' spacing={2}>
                        <Grid item xs={6}>
                          <Button
                            size='large'
                            color='primary'
                            variant='contained'
                            fullWidth
                          >
                            Add
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            size='large'
                            color='secondary'
                            variant='outlined'
                            fullWidth
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box component='div' className={classes.bottomSector}>
                  <Typography
                    variant='body1'
                    component='h1'
                    color='textSecondary'
                  >
                    Call pool price level
                  </Typography>
                  <Box component="div" className={classes.subtitle}>
                    <Typography
                      variant='body2'
                      component='h2'
                      color='textSecondary'
                    >
                      Last 7 days
                    </Typography>
                    <Help />
                  </Box>
                  <LineChart
                    color='#14A887'
                    data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                    categories={[
                      'Mon',
                      'Tue',
                      'Wed',
                      'Thu',
                      'Fri',
                      'Sat',
                      'Sun',
                    ]}
                    width="100%"
                    height={200}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.call}>
                <Box component='div' className={classes.topSector}>
                  <Box component='div' className={classes.header}>
                    <ArrowUpward />
                    <Typography
                      variant='h6'
                      component='h1'
                      color='textPrimary'
                    >
                      Put Pool
                    </Typography>
                    <Typography
                      variant='body1'
                      component='h2'
                      color='textSecondary'
                    >
                      78% Utilization
                    </Typography>
                  </Box>
                  <Grid container direction='row'>
                    <RadialChart
                      color='#EB4A97'
                      secondaryColor='#8C43F6'
                      width={200}
                      height={200}
                      data={[67]}
                    >
                      <UniswapIcon />
                      Pool size in Uni
                      <Typography
                        component='h5'
                        variant='body2'
                        color='textSecondary'
                      >
                        211305
                      </Typography>
                    </RadialChart>
                    <Grid
                      item
                      direction='column'
                      justify='space-between'
                      className={classes.rightPanel}
                    >
                      <Grid container direction="column">
                        <Typography
                          variant='body2'
                          component='h2'
                          color='textPrimary'
                        >
                          My P&L
                        </Typography>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              My total capital
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              10000
                            </Typography>
                            <UniswapIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              Fees earned
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              100
                            </Typography>
                            <DaiIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              % of capital active
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              46%
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container direction='row' spacing={2}>
                        <Grid item xs={6}>
                          <Button
                            size='large'
                            color='secondary'
                            variant='contained'
                            fullWidth
                          >
                            Add
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            size='large'
                            color='secondary'
                            variant='outlined'
                            fullWidth
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box component='div' className={classes.bottomSector}>
                  <Typography
                    variant='body1'
                    component='h1'
                    color='textSecondary'
                  >
                    Put pool price level
                  </Typography>
                  <Box component="div" className={classes.subtitle}>
                    <Typography
                      variant='body2'
                      component='h2'
                      color='textSecondary'
                    >
                      Last 7 days
                    </Typography>
                    <Help />
                  </Box>
                  <LineChart
                    color='#BF47C3'
                    data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                    categories={[
                      'Mon',
                      'Tue',
                      'Wed',
                      'Thu',
                      'Fri',
                      'Sat',
                      'Sun',
                    ]}
                    width="100%"
                    height={200}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default ProVault;
