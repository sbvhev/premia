import React, { useState } from 'react';
import { Box, Grid, Typography, TextField } from '@material-ui/core';
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
        component='h3'
        variant='h4'
        color='textPrimary'
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
          <Grid item sm={6}>
            <OptionsFilter />
          </Grid>
        </Grid>
      </Grid>
    </PageWithSidebar>
  );
};

export default Options;
