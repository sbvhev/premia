import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Popover,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BorderLinearProgress, SwitchWithGlider } from 'components';
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
    display: 'flex',
    '&:hover path': {
      fill: palette.text.primary,
    },
    '& path': {
      fill: palette.text.secondary,
    },
  },

  footerRightItem: {
    padding: '0px 18px',
    display: 'flex',
    alignItems: 'center',
    color: palette.text.secondary,
    '&:last-child': {
      cursor: 'pointer',
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
    lineHeight: '16px',
    color: palette.text.secondary,
  },

  gasPriceText: {
    fontSize: 14,
    lineHeight: 1,
    textAlign: 'left',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // background: 'green',
    color: palette.text.secondary,
    padding: '6px',
    '& svg': {
      margin: '0 8px 0 2px',
    },
    '& svg path': {
      fill: palette.text.secondary,
    },
  },

  activeButton: {
    background: 'transparent',
    color: palette.primary.main,
    '& svg path': {
      fill: palette.primary.main,
    },
  },

  gasPricePopup: {
    '& .MuiPopover-paper': {
      maxWidth: 368,
      '&::before': {
        content: '""',
        position: 'absolute',
        marginRight: '-0.71em',
        bottom: 0,
        right: 40,
        width: 16,
        height: 16,
        background: palette.background.paper,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
        transform: 'translate(-50%, 50%) rotate(135deg)',
        clipPath:
          'polygon(-8px -8px, calc(100% + 8px) -8px, calc(100% + 8px) calc(100% + 8px))',
      },
    },
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { palette } = theme;
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [gasType, setGasType] = useState('standard');
  const [gasValue, setGasValue] = useState(25);

  const GasSwitch1 = () => (
    <Box
      width='110px'
      height="42px"
      className={cx(
        classes.button,
        gasType === 'standard' && classes.activeButton,
      )}
      
      >
      <GasStandardIcon />
      <Box width="100%">
        <Typography className={classes.gasPriceText}>
          <b>Standard</b>
          <div>90 Gwei</div>
        </Typography>
      </Box>
    </Box>
  );

  const GasSwitch2 = () => (
    <Box
      width='110px'
      height="42px"
      className={cx(
        classes.button,
        gasType === 'fast' && classes.activeButton,
      )}
    >
      <GasFastIcon />
      <Box width="100%">
        <Typography className={classes.gasPriceText}>
          <b>Fast</b>
          <div>100 Gwei</div>
        </Typography>
      </Box>
    </Box>
  );

  const GasSwitch3 = () => (
    <Box
      width='110px'
      height="42px"
      className={cx(
        classes.button,
        gasType === 'instant' && classes.activeButton,
      )}
    >
      <ProIcon />
      <Box width="100%">
        <Typography className={classes.gasPriceText}>
          <b>Instant</b>
          <div>120 Gwei</div>
        </Typography>
      </Box>
    </Box>
  );


  return (
    <Box
      height={mobile ? 99 : 42}
      width={1}
      borderTop={1}
      borderColor={theme.palette.divider}
      style={mobile ? { backgroundColor: palette.background.paper } : {}}
    >
      <Grid
        container
        justify='space-between'
        alignItems='center'
        className={classes.footer}
      >
        <Box
          display="flex"
          width={mobile? '100%' : 'auto'}
          height={mobile ? '48px' : '41px'}
          justifyContent={mobile ? 'center' : 'flex-start'}
          alignItems='center'
          style={{ order: mobile ? 1 : 0 }}
        >
          <a
            href='https://twitter.com/PremiaFinance'
            target='_blank'
            rel='noreferrer'
            className={classes.footerIcon}
          >
            <TwitterIcon />
          </a>
          <a
            href='https://premia.medium.com/'
            target='_blank'
            rel='noreferrer'
            className={classes.footerIcon}
          >
            <MediumIcon />
          </a>
          <a
            href='https://discord.com/invite/6MhRmzmdHN'
            target='_blank'
            rel='noreferrer'
            className={classes.footerIcon}
          >
            <DiscordIcon />
          </a>
          <a
            href='https://github.com/PremiaFinance'
            target='_blank'
            rel='noreferrer'
            className={classes.footerIcon}
          >
            <GithubIcon />
          </a>
        </Box>
        <Box
          display="flex"
          justifyContent={mobile ? 'space-between' : 'flex-end'}
          height={mobile ? '50px' : '40px'}
          style={{ order: mobile ? 0 : 1 }}
          width={mobile? '100%' : 'auto'}
        >
          <Box className={classes.footerRightItem}>
            <LockIcon />
            <Typography component='span'>TVL: 1000004$</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box
            className={classes.footerRightItem}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <GasIcon />
            <Typography component='span'>Gas Price</Typography>
            <BorderLinearProgress
              value={gasValue}
              color={
                gasType === 'instant'
                  ? theme.palette.primary.main
                  : gasType === 'fast'
                  ? '#FF9152'
                  : '#C2235C'
              }
              className={classes.gasProgress}
            />
          </Box>
        </Box>
        {mobile && <Divider className={classes.footerDivider} />}
      </Grid>
      <Popover
        className={classes.gasPricePopup}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        style={!mobile ? {width: '368px'} : {width: '368px', left: 10}}
      >
        <Box p={1.5}>
          <Box p={1}>
            <Typography className={classes.subheading}>
              Select gas price
            </Typography>
            <Typography className={classes.text}>
              Gas prices depend on the Ethereum network's congestion.
            </Typography>
          </Box>
          <Box
            borderRadius={12}
            border={1}
            width={!mobile ? '344px' : '344px'}
            p="7px"
            borderColor={theme.palette.divider}
            display='flex'
            justifyContent='space-between'
          >
            {!mobile ? (
              <SwitchWithGlider 
                elements={[GasSwitch1, GasSwitch2, GasSwitch3]}
                positions={[236, 128, 18]}
                clickFuncs={[() => {
                  setGasType('standard');
                  setGasValue(25);
                }, () => {
                  setGasType('fast');
                  setGasValue(50);
                }, () => {
                  setGasType('instant');
                  setGasValue(100);
                }]}
                start={236}
                alignedRight={true}
                gliderDims={['110px', '42px']}
              />
            ) : (
              <SwitchWithGlider 
                elements={[GasSwitch1, GasSwitch2, GasSwitch3]}
                positions={[236, 128, 18]}
                clickFuncs={[() => {
                  setGasType('standard');
                  setGasValue(25);
                }, () => {
                  setGasType('fast');
                  setGasValue(50);
                }, () => {
                  setGasType('instant');
                  setGasValue(100);
                }]}
                start={236}
                alignedRight={true}
                gliderDims={['110px', '42px']}
              />
            )}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Footer;
