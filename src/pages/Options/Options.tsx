import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button } from '@material-ui/core';
import { CustomTabs } from 'components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import WBTCIcon from 'assets/svg/WBTCIcon.svg';
import UniIcon from 'assets/svg/UniIcon.svg';
import LinkIcon from 'assets/svg/LinkIcon.svg';
import YFIIcon from 'assets/svg/YFIIcon.svg';
import EthIcon from 'assets/svg/EthIcon.svg';
import OptionsFilter from './OptionsFilter';
import OptionsPrice from './OptionsPrice';
import HelpIcon from '@material-ui/icons/Help';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { LineChart } from 'components';

import { PageWithSidebar } from 'layouts';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '28px',
    lineHeight: '27.5px',
    fontWeight: 700,
  },
  price: {
    fontSize: 18
  },
  subText: {
    marginLeft: 8,
    fontSize: 14
  },
  priceIcon: {
    color: '#3ACE5B'
  },
  helpIcon: {
    color: '#646464',
    fontSize: 16,
    marginLeft: 4
  }
}));

const Options: React.FC = () => {
  // const { account, wallet } = useWeb3();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [ tokenIndex, setTokenIndex ] = useState(2);
  const tabItems = [
    {
      image: WBTCIcon,
      label: 'wBTC'
    },
    {
      image: UniIcon,
      label: 'Uni',
      highlight: true
    },
    {
      image: LinkIcon,
      label: 'Link'
    },
    {
      image: YFIIcon,
      label: 'YFI',
      highlight: true
    },
    {
      image: EthIcon,
      label: 'ETH'
    }
  ]
  return (
    <PageWithSidebar>
      <Typography
        component='h1'
        color='textPrimary'
        className={classes.title}
      >
        Options
      </Typography>
      <Box border={1} mt={2} mb={4} borderRadius={12} borderColor={theme.palette.divider}>
        <Grid container alignItems='center' spacing={2}>
          <Grid item container={mobile} justify={ mobile ? 'center' : undefined } sm={12} md={9}>
            <CustomTabs items={tabItems} value={tokenIndex} onChange={(ev, index) => { setTokenIndex(index) } } />
          </Grid>
          <Grid item container justify={ mobile ? 'center' : 'flex-end' } sm={12} md={3}>
            <Box p={1}>
              <TextField placeholder='Search...' variant='filled' InputProps={{ endAdornment: <SearchIcon />}} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item container sm={8}>
          <Grid item xs={12} sm={6}>
            <OptionsFilter />
          </Grid>
          <Grid item container xs={12} sm={6} direction='column' justify='space-between'>
            <Box py={1} px={3}>
              <Typography color='textSecondary'>
                Current Price
              </Typography>
              <Grid container alignItems='center'>
                <Typography color='textPrimary' component='h2' className={classes.price}>
                  $1,222
                </Typography>
                <span className={classes.subText}>
                  +13%
                </span>
                <ArrowDropUpIcon className={classes.priceIcon} />
              </Grid>
            </Box>
            <Box py={1} px={3}>
              <Typography color='textSecondary'>
                Breakeven
              </Typography>
              <Typography color='textPrimary' component='h2' className={classes.price}>
                $1,749.37
              </Typography>
            </Box>
            <Box py={1} px={3}>
              <Typography color='textSecondary'>
                Total cost
              </Typography>
              <Typography color='textPrimary' component='h2' className={classes.price}>
                $1,749.37
              </Typography>
            </Box>
            <Box py={1} px={3}>
              <Button
                variant='contained'
                fullWidth
                color='primary'
              >
                Deposit
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box py={3} px={3}>
              <Typography color='textPrimary' component='h2' className={classes.price}>
                Pool price level
              </Typography>
              <Grid container alignItems='center'>
                <Typography color='textSecondary'>
                  Last 7 days
                </Typography>
                <HelpIcon className={classes.helpIcon} />
              </Grid>
              <LineChart
                color='#3ACE5B'
                dark={true}
                data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                width='100%'
                height={200}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item container sm={4}>
          <OptionsPrice />
        </Grid>
      </Grid>
    </PageWithSidebar>
  );
};

export default Options;
