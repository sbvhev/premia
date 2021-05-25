import React, { useState } from 'react';
import { Box, Grid, Typography, Divider, Popover, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BorderLinearProgress } from 'components';
import { ReactComponent as TwitterIcon } from 'assets/svg/TwitterIcon.svg';
import { ReactComponent as MediumIcon } from 'assets/svg/MediumIcon.svg';
import { ReactComponent as DiscordIcon } from 'assets/svg/DiscordIcon.svg';
import { ReactComponent as LockIcon } from 'assets/svg/LockIcon.svg';
import { ReactComponent as GasIcon } from 'assets/svg/GasIcon.svg';
import { ReactComponent as GasStandardIcon } from 'assets/svg/GasStandardIcon.svg';
import { ReactComponent as GasFastIcon } from 'assets/svg/GasFastIcon.svg';
import { ReactComponent as ProIcon } from 'assets/svg/ProIcon.svg';

const useStyles = makeStyles(({ palette }) => ({
  footer: {
    height: '100%',
  },

  footerIcon: {
    marginLeft: 16,
  },

  footerRightItem: {
    padding: '0px 18px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
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

  subheading: {
    fontSize: 18,
    fontWeight: 700,
    color: palette.text.primary,
  },

  text: {
    fontSize: 14,
    color: palette.text.secondary
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState<any>(null);

  return (
    <Box
      height={mobile ? 70 : 45}
      width={1}
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
          <TwitterIcon className={classes.footerIcon} />
          <MediumIcon className={classes.footerIcon} />
          <DiscordIcon className={classes.footerIcon} />
        </Grid>
        <Grid
          item
          sm={6}
          container
          justify={mobile ? 'space-between' : 'flex-end'}
          style={{ order: mobile ? 0 : 1 }}
        >
          <Box className={classes.footerRightItem}>
            <LockIcon />
            <Typography component='span'>TVL: 1000004$</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box className={classes.footerRightItem} onClick={(event) => {setAnchorEl(event.currentTarget)}}>
            <GasIcon />
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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => { setAnchorEl(null) }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box p={1.5}>
          <Typography className={classes.subheading}>Select gas price</Typography>
          <Typography className={classes.text}>Gas prices depend on the Ethereum network's congestion.</Typography>
          <Box borderRadius={12} border={1} mt={1} p={0.3} pr={0.6} borderColor={theme.palette.divider} display='flex' justifyContent='space-between'>
            <Box width='32%'>
              <Button color='secondary' startIcon={<GasStandardIcon />} fullWidth>
                <Typography variant='body2' align='left'><b>Standard</b><div>90 Gwei</div></Typography>
              </Button>
            </Box>
            <Box width='32%'>
              <Button variant='contained' startIcon={<GasFastIcon />} fullWidth>
                <Typography variant='body2' align='left'><b>Fast</b><div>100 Gwei</div></Typography>
              </Button>
            </Box>
            <Box width='32%'>
              <Button variant='contained' startIcon={<ProIcon />} fullWidth>
                <Typography variant='body2' align='left'><b>Instant</b><div>120 Gwei</div></Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Footer;
