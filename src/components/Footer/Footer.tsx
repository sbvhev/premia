import React from 'react';
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { BorderLinearProgress } from 'components';
import TwitterIcon from 'assets/svg/TwitterIcon.svg';
import MediumIcon from 'assets/svg/MediumIcon.svg';
import DiscordIcon from 'assets/svg/DiscordIcon.svg';
import LockIcon from 'assets/svg/LockIcon.svg';
import GasIcon from 'assets/svg/GasIcon.svg';

const useStyles = makeStyles(() => ({
  footer: {
    height: '100%',
  },

  footerIcon: {
    marginLeft: 16,
  },

  footerRightItem: {
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: 8,
    },
  },

  gasProgress: {
    width: 35,
    marginLeft: 4,
  },

  footerDivider: {
    width: '100%',
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box
      height={mobile ? 70 : 45}
      width={1}
      bottom={0}
      borderTop={1}
      borderColor={theme.palette.divider}
    >
      <Grid
        container
        justify='space-between'
        alignItems='center'
        className={classes.footer}
      >
        <Grid
          item
          sm={4}
          container
          justify={mobile ? 'center' : 'flex-start'}
          style={{ order: mobile ? 1 : 0 }}
        >
          <img src={TwitterIcon} alt='Twitter' className={classes.footerIcon} />
          <img src={MediumIcon} alt='Medium' className={classes.footerIcon} />
          <img src={DiscordIcon} alt='Discord' className={classes.footerIcon} />
        </Grid>
        <Grid
          item
          sm={6}
          container
          justify={mobile ? 'space-between' : 'flex-end'}
          style={{ order: mobile ? 0 : 1 }}
        >
          <Box className={classes.footerRightItem}>
            <img src={LockIcon} alt='TVL' />
            <Typography component='span'>TVL: 1000004$</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box className={classes.footerRightItem}>
            <img src={GasIcon} alt='GAS' />
            <Typography component='span'>Gas Price</Typography>
            <BorderLinearProgress
              variant='determinate'
              value={50}
              className={classes.gasProgress}
            />
          </Box>
        </Grid>
        {
          mobile &&
            <Divider className={classes.footerDivider} />
        }
      </Grid>
    </Box>
  );
};

export default Footer;
