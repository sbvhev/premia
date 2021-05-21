import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LineChart, RadialChart } from 'components';
import { ReactComponent as BasicIcon } from 'assets/svg/BasicIcon.svg';
import { ReactComponent as ProIcon } from 'assets/svg/ProIcon.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';

import { useWeb3 } from 'state/application/hooks';
import { shortenAddress } from 'utils';

import { PageWithSidebar } from 'layouts';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '27.5px',
    marginBottom: 36
  },
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
        <Box
          width={1}
        >
          <Typography
            component='h1'
            variant='h3'
            color='textPrimary'
            className={classes.title}
          >
            Vaults
          </Typography>
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
        </Box>
      </Grid>
    </PageWithSidebar>
  );
};

export default Stake;
