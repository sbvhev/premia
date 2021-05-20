import React, { useState } from 'react';
import { Box, Grid, Typography, Tabs, Tab, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import WBTCIcon from 'assets/svg/WBTCIcon.svg';
import UniIcon from 'assets/svg/UniIcon.svg';
import LinkIcon from 'assets/svg/LinkIcon.svg';
import YFIIcon from 'assets/svg/YFIIcon.svg';
import EthIcon from 'assets/svg/EthIcon.svg';
import FireIcon from 'assets/svg/FireIcon.svg';
import SearchIcon from '@material-ui/icons/Search';
import { useWeb3 } from 'state/application/hooks';

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

}));

const Options: React.FC = () => {
  // const { account, wallet } = useWeb3();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [ tokenIndex, setTokenIndex ] = useState(2);
  return (
    <PageWithSidebar mobile={mobile}>
      <Typography
        component='h3'
        variant='h4'
        color='textPrimary'
      >
        Options
      </Typography>
      <Box border={1} mt={2} borderRadius={12} borderColor={theme.palette.divider}>
        <Grid container alignItems='center'>
          <Grid item md={9}>
            <Tabs value={tokenIndex} onChange={(ev, index: number) => { setTokenIndex(index)}}>
              <Tab icon={<img src={WBTCIcon} alt='WBTC' />} label='wBTC' />
              <Tab icon={<><img src={UniIcon} alt='Uni' /><img src={FireIcon} alt='Highlight' /></>} label='Uni' />
              <Tab icon={<img src={LinkIcon} alt='Link' />} label='Link' />
              <Tab icon={<><img src={YFIIcon} alt='YFI' /><img src={FireIcon} alt='Highlight' /></>} label='YFI' />
              <Tab icon={<img src={EthIcon} alt='ETH' />} label='ETH' />
            </Tabs>
          </Grid>
          <Grid item container justify='flex-end' md={3}>
            <Box pr={2}>
              <TextField placeholder='Search...' variant='filled' InputProps={{ endAdornment: <SearchIcon />}} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageWithSidebar>
  );
};

export default Options;
