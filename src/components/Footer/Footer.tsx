import React, { useState } from 'react';
import { Box, Grid, Typography, Divider, Popover, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BorderLinearProgress } from 'components';
import cx from 'classnames';
import { ReactComponent as TwitterIcon } from 'assets/svg/TwitterIcon.svg';
import { ReactComponent as MediumIcon } from 'assets/svg/MediumIcon.svg';
import { ReactComponent as DiscordIcon } from 'assets/svg/DiscordIcon.svg';
import { ReactComponent as GithubIcon } from 'assets/svg/GithubIcon.svg';
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
    cursor: 'pointer',
    marginLeft: 16,
    '&:hover path': {
      fill: palette.text.primary
    },
    '& path': {
      fill: palette.text.secondary
    }
  },

  footerRightItem: {
    padding: '0px 18px',
    display: 'flex',
    alignItems: 'center',
    color: palette.text.secondary,
    '&:last-child': {
      cursor: 'pointer'
    },
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
    lineHeight: 1.12,
    color: palette.text.primary,
  },

  text: {
    fontSize: 14,
    lineHeight: 1.18,
    color: palette.text.secondary
  },

  gasPriceText: {
    fontSize: 14,
    lineHeight: 1,
    textAlign: 'left'
  },

  button: {
    background: 'transparent',
    color: palette.text.secondary,
    '& svg path': {
      fill: palette.text.secondary,
    },
    '&:hover': {
      background: palette.primary.dark,
      color: palette.primary.main,
      '& svg path': {
        fill: palette.primary.main,
      }  
    }
  },

  activeButton: {
    background: palette.primary.dark,
    color: palette.primary.main,
    '& svg path': {
      fill: palette.primary.main,
    }
  }
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [gasType, setGasType] = useState('standard');
  const [gasValue, setGasValue] = useState(25);

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
          <a href='https://twitter.com/PremiaFinance' target='_blank' rel='noreferrer'><TwitterIcon className={classes.footerIcon} /></a>
          <a href='https://premia.medium.com/' target='_blank' rel='noreferrer'><MediumIcon className={classes.footerIcon} /></a>
          <a href='https://discord.com/invite/6MhRmzmdHN' target='_blank' rel='noreferrer'><DiscordIcon className={classes.footerIcon} /></a>
          <a href='https://github.com/PremiaFinance' target='_blank' rel='noreferrer'><GithubIcon className={classes.footerIcon} /></a>
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
              value={gasValue}
              color={gasType === 'instant' ? theme.palette.primary.main : gasType === 'fast' ? '#FF9152' : '#C2235C'}
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
        <Box p={1.6}>
          <Box p={1}>
            <Typography className={classes.subheading}>Select gas price</Typography>
            <Typography className={classes.text}>Gas prices depend on the Ethereum network's congestion.</Typography>
          </Box>
          <Box borderRadius={12} border={1} p={0.5} pr={0.8} borderColor={theme.palette.divider} display='flex' justifyContent='space-between'>
            <Box width='33%'>
              <Button className={cx(classes.button, gasType === 'standard' && classes.activeButton)} startIcon={<GasStandardIcon />} fullWidth onClick={() => { setGasType('standard'); setGasValue(25); }}>
                <Typography className={classes.gasPriceText} component='div'><b>Standard</b><div>90 Gwei</div></Typography>
              </Button>
            </Box>
            <Box width='33%'>
              <Button className={cx(classes.button, gasType === 'fast' && classes.activeButton)} startIcon={<GasFastIcon />} fullWidth onClick={() => { setGasType('fast'); setGasValue(50); }}>
                <Typography className={classes.gasPriceText} component='div'><b>Fast</b><div>100 Gwei</div></Typography>
              </Button>
            </Box>
            <Box width='33%'>
              <Button className={cx(classes.button, gasType === 'instant' && classes.activeButton)} startIcon={<ProIcon />} fullWidth onClick={() => { setGasType('instant'); setGasValue(100); }}>
                <Typography className={classes.gasPriceText} component='div'><b>Instant</b><div>120 Gwei</div></Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Footer;
