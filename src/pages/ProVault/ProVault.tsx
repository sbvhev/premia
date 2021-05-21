import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  Paper,
} from '@material-ui/core';
import cn from 'classnames';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { LineChart, RadialChart } from 'components';
import { ReactComponent as BasicIcon } from 'assets/svg/BasicIcon.svg';
import { ReactComponent as ProIcon } from 'assets/svg/ProIcon.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

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
  call: {
  },
  put: {
  },
  header: {
    display: 'flex',
    marginBottom: 20
  },
  topSector: {
    padding: 28,
    border: `1px solid ${theme.palette.divider}`
  },
  bottomSector: {
    padding: 28
  }
}));

const Stake: React.FC = () => {
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
          <Grid container direction='row'>
            <Grid item xs={6}>
              <Paper className={classes.call}>
                <Box component="div" className={classes.topSector}>
                  <Box component="div" className={classes.header}>
                    <ArrowUpward />
                    <Typography
                      variant="body1"
                      component="h2"
                      color="textPrimary"
                    >
                      Call Pool
                    </Typography>
                    <Typography
                      variant="body2"
                      component="h2"
                      color="textPrimary"
                    >
                      78% Utilization
                    </Typography>
                  </Box>
                  <Box component="div">
                    <RadialChart />
                  </Box>
                </Box>
                <Box component="div" className={classes.bottomSector}>

                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.put}>
                <ArrowDownward />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default Vault;
