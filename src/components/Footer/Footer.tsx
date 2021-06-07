import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Divider, Popover } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { BorderLinearProgress, SwitchWithGlider, ChainModal } from 'components';
import cx from 'classnames';
import { useIsDarkMode } from 'state/user/hooks';
import { ReactComponent as TwitterIcon } from 'assets/svg/TwitterIcon.svg';
import { ReactComponent as MediumIcon } from 'assets/svg/MediumIcon.svg';
import { ReactComponent as DiscordIcon } from 'assets/svg/DiscordIcon.svg';
import { ReactComponent as GithubIcon } from 'assets/svg/GithubIcon.svg';
import { ReactComponent as GasIcon } from 'assets/svg/GasIcon.svg';
import { ReactComponent as GasStandardIcon } from 'assets/svg/GasStandardIcon.svg';
import { ReactComponent as GasFastIcon } from 'assets/svg/GasFastIcon.svg';
import { ReactComponent as ProIcon } from 'assets/svg/ProIcon.svg';
import { ReactComponent as EthHeadIcon } from 'assets/svg/EthHeadIcon.svg';
import { ReactComponent as UpArrow } from 'assets/svg/UpArrow.svg';

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

  footerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: (props: any) => props.mobile ? 'space-between' : 'flex-end',
    height: (props: any) => props.mobile ? '50px' : '40px',
    order: (props: any) => props.mobile ? 0 : 1,
    width: (props: any) => props.mobile ? '100%' : 'auto',

    '& hr': {
      height: 25
    }
  },

  footerRightItem: {
    padding: (props: any) => props.mobile ? '0 10px 0 24px' : '0px 5px 0 16.5px',
    display: 'flex',
    alignItems: 'center',
    color: palette.text.secondary,
    cursor: 'pointer',
    width: (props: any) => props.mobile ? '50%' : 'auto',
    '&:first-child': {
      '& svg': {
        width: 13.25,
        height: 21.58  
      }
    },
    '&:last-child': {
      justifyContent: (props: any) => props.mobile && 'flex-end'
    },
    '& span': {
      fontSize: 14,
    },
    '& svg': {
      marginRight: 8,

      '& path': {
        fill: palette.text.secondary,
      },
    }
  },

  upArrow: {
    margin: '0 7px !important',
    height: '6.7px !important',
    width: '10.68px !important',
    '& path': {
      fill: 'none !important',
      stroke: palette.text.secondary
    }
  },

  gasProgress: {
    width: 35,
    background: 'rgba(141, 151, 160, 0.4)',
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
    color: palette.text.secondary,
    cursor: 'pointer',
    padding: '2px',
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.secondary.main,
    },
    '& .MuiTypography-root': {
      width: '62px',
      fontWeight: 400,
      lineHeight: '14px',
      fontSize: '14px',
      color: palette.secondary.main,
      '& b': {
        fontWeight: 400,
      },
    },
    '&:hover': {
      '& svg path': {
        fill: palette.text.primary,
      },
      '& .MuiTypography-root': {
        fontWeight: 400,
        fontSize: '14px',
        color: palette.text.primary,
      },
    },
  },

  activeButton: {
    cursor: 'default',
    '& svg path': {
      fill: palette.primary.main,
    },
    '& .MuiTypography-root': {
      color: palette.primary.main,
      '& b': {
        fontWeight: 700,
      },
    },
    '&:hover': {
      '& svg path': {
        fill: palette.primary.main,
      },
      '& .MuiTypography-root': {
        color: palette.primary.main,
      },
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
  const { palette, breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down('xs'));
  const classes = useStyles({ dark, mobile });
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [gasType, setGasType] = useState('standard');
  const [gasValue, setGasValue] = useState(25);
  const [gasPrices, setGasPrices] = useState<any>({});

  let ws:any, websocket:any, timer:any, reConnectTimes = 0;

  const fetchGasData = () => {
    clearTimeout(timer);
    fetch("https://www.gasnow.org/api/v3/gas/price?utm_source=GasNowExtension", {
      method: 'GET'
    }).then((res) => res.json())
    .then((json) => {
      setGasPrices(json.data);
      reConnectTimes = 0;
      timer = setTimeout(() => {
        getGas(true);
      }, 8000);
    }).catch(() => {
      if (reConnectTimes < 20) { reConnectTimes++ }
      timer = setTimeout(getGas, reConnectTimes < 20 ? 1000 : 5000);
    });
  };

  const createWebSocketConnection = () => {
    if (ws) { return }
    if('WebSocket' in window) {
      websocket = false;
  
      ws = new WebSocket('wss://www.gasnow.org/ws/gasprice');
  
      ws.onmessage = function (event: any) {
        const dataStr = event.data;
        const json = JSON.parse(dataStr);
        setGasPrices(json.data);
      };
  
      ws.onclose = function() {
        ws = undefined;
        getGas(websocket);
      };
    } else {
      getGas(false);
    }
  };

  const getGas = (type: any) => {
    type ? createWebSocketConnection() : fetchGasData();
  };
  const [chainModalOpen, setChainModalOpen] = useState(false);

  useEffect(() => {
    getGas(true);
    return () => {
      if (!ws) return;
      ws.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSelectStandardGas = () => {
    setGasType('standard');
    setGasValue(Math.floor((gasPrices.standard || 0) / Math.pow(10, 9)));
  };

  const handleSelectFastGas = () => {
    setGasType('fast');
    setGasValue(Math.floor((gasPrices.fast || 0) / Math.pow(10, 9)));
  };

  const handleSelectInstantGas = () => {
    setGasType('instant');
    setGasValue(Math.floor((gasPrices.rapid || 0) / Math.pow(10, 9)));
  };

  const StandardGasSwitch = () => (
    <Box
      width='110px'
      height='42px'
      className={cx(
        classes.button,
        gasType === 'standard' && classes.activeButton,
      )}
      onClick={handleSelectStandardGas}
    >
      <GasStandardIcon />
      <Box width='100%'>
        <Typography component='div' className={classes.gasPriceText}>
          <b>Standard</b>
          <div>{Math.floor((gasPrices.standard || 0) / Math.pow(10, 9))} Gwei</div>
        </Typography>
      </Box>
    </Box>
  );

  const FastGasSwitch = () => (
    <Box
      width='110px'
      height='42px'
      className={cx(classes.button, gasType === 'fast' && classes.activeButton)}
      onClick={handleSelectFastGas}
    >
      <GasFastIcon />
      <Box width='100%'>
        <Typography component='div' className={classes.gasPriceText}>
          <b>Fast</b>
          <div>{Math.floor((gasPrices.fast || 0) / Math.pow(10, 9))} Gwei</div>
        </Typography>
      </Box>
    </Box>
  );

  const InstantGasSwitch = () => (
    <Box
      width='110px'
      height='42px'
      className={cx(
        classes.button,
        gasType === 'instant' && classes.activeButton,
      )}
      onClick={handleSelectInstantGas}
    >
      <ProIcon />
      <Box width='100%'>
        <Typography component='div' className={classes.gasPriceText}>
          <b>Instant</b>
          <div>{Math.floor((gasPrices.rapid || 0) / Math.pow(10, 9))} Gwei</div>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      height={mobile ? 99 : 42}
      width={1}
      borderTop={1}
      borderColor={palette.divider}
      style={mobile ? { backgroundColor: palette.background.paper } : {}}
    >
      <Grid
        container
        justify='space-between'
        alignItems='center'
        className={classes.footer}
      >
        {chainModalOpen && (
          <ChainModal
            open={chainModalOpen}
            onClose={() => setChainModalOpen(false)}
          />
        )}
        <Box
          display='flex'
          width={mobile ? '100%' : 'auto'}
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
        <Box className={classes.footerRight}>
          <Box
            className={classes.footerRightItem}
            onClick={() => {
              setChainModalOpen(true);
            }}>
            <EthHeadIcon />
            <Typography component='span'>
              Ethereum
            </Typography>
            <UpArrow className={classes.upArrow} />
          </Box>
          <Divider orientation='vertical' />
          <Box
            className={classes.footerRightItem}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <GasIcon />
            <Typography component='span'>Gas Price</Typography>
            <UpArrow className={classes.upArrow} />
            <BorderLinearProgress
              value={gasValue}
              color={
                gasType === 'instant'
                  ? palette.primary.main
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
        style={!mobile ? { width: '368px' } : { width: '368px', left: 10 }}
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
            p='7px'
            borderColor={palette.divider}
            position='relative'
            display='flex'
            justifyContent='space-between'
          >
            <SwitchWithGlider
              elements={[StandardGasSwitch, FastGasSwitch, InstantGasSwitch]}
              defaultIndex={
                gasType === 'standard' ? 0 : gasType === 'fast' ? 1 : 2
              }
              marginBetweenSwitches={0}
              gliderWidth={109}
              gliderHeight={42}
            />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Footer;
