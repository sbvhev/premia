import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import cx from 'classnames';

import { useIsDarkMode } from 'state/user/hooks';
import { useCallPool, usePutPool } from 'state/options/hooks';
import { getPoolSize } from 'utils/getPoolSize';
import { getPoolUtilization } from 'utils/getPoolUtilization';
import { formatNumber, formatCompact } from 'utils/formatNumber';

import {
  LineChart,
  RadialChart,
  SelectTokenTabs,
  TooltipPan,
  WithdrawDepositModal,
  SwitchWithGlider,
} from 'components';
import { ReactComponent as Help } from 'assets/svg/Help.svg';
import { ReactComponent as BasicIcon } from 'assets/svg/BasicIcon.svg';
import { ReactComponent as ProIcon } from 'assets/svg/ProIcon.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as CallUpIcon } from 'assets/svg/CallUpIcon.svg';
import { ReactComponent as PoolDownIcon } from 'assets/svg/PoolDownIcon.svg';
import { ReactComponent as WBTCIcon } from 'assets/svg/wBTCIcon.svg';
import { ReactComponent as ETHIcon } from 'assets/svg/EthIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as AttentionIcon } from 'assets/svg/AttentionIcon.svg';
import BasicVault from './BasicVault';
import { getTokenIcon } from 'utils/getTokenIcon';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  title: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '27.5px',
    marginBottom: 36,

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  topTab: {
    margin: '20px 0 20px 6px',

    [breakpoints.down('md')]: {
      margin: '20px 0 12px',
    },
  },
  mainContent: {},
  subtitle: {
    display: 'flex',
    marginTop: -6,
    alignItems: 'center',

    '& svg': {
      width: 14,
      height: 14,

      '& path': {
        fill: (props: any) => (props.dark ? '#646464' : '#8D97A0'),
      },
    },
  },
  header: {
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',

    '& h1': {
      fontWeight: 700,
      marginRight: 4,
    },

    '& h2': {
      top: 1,
      position: 'relative',
      fontSize: 14,
    },

    '& svg': {
      '&:first-of-type': {
        marginRight: 8,
        top: -1,
        position: 'relative',
      },

      '&:last-of-type': {
        marginRight: 4,
        top: 1,
        width: 14,
        height: 14,
        position: 'relative',

        '& path': {
          fill: (props: any) => (props.dark ? '#646464' : '#8D97A0'),
        },
      },
    },
  },
  helpIcon: {
    '&> path': {
      fill: '#7D7D7D',
    },
  },
  topSector: {
    padding: 28,
    borderBottom: `1px solid ${palette.divider}`,
  },
  bottomSector: {
    padding: '28px 28px 0 28px',

    '& h1': {
      fontWeight: 'bold',
    },
  },
  content: {
    display: 'flex',
  },
  leftPanel: {
    width: 210,
    height: 210,
    position: 'relative',

    '& > div': {
      position: 'absolute',
      left: -36,
      top: -34,
    },
  },
  rightPanel: {
    display: 'flex',
    width: 'calc(100% - 210px)',

    '& svg': {
      position: 'relative',
      top: -1,
      marginLeft: 4,
      width: 16,
      height: 20,

      '& path': {
        fill: (props: any) => (props.dark ? '#646464' : '#8D97A0'),
      },
    },

    '& > div > h2': {
      fontWeight: 'bold',
      lineHeight: '18px',
      fontSize: 16,
      marginBottom: 8,
    },

    '& h2': {
      lineHeight: '24px',
    },

    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  box: {
    width: 'calc(100% - 226px)',
    position: 'relative',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& svg': {
      marginRight: 8,
      width: 16,
      height: 16,
    },
  },
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 22,
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  readMore: {
    color: palette.primary.main,
    fontSize: 14,
    lineHeight: '18px',
    marginTop: 6,
  },
  vaultSwitchContainer: {
    border: `1px solid`,
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    width: '206px',
    height: '55px',
    padding: '6px',
    marginRight: '15px',
  },
  vaultSwitchContainerMobile: {
    border: `1px solid`,
    backgroundColor: palette.background.paper,
    justifyContent: 'space-evenly',
    borderRadius: '12px',
    width: '100%',
    height: '43px',
    padding: '5px',
  },
  vaultSwitchButton: {
    cursor: 'pointer',
    '& svg': {
      marginRight: 9,
    },
    '& svg path': {
      fill: palette.secondary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 400,
      lineHeight: '14px',
      fontSize: '14px',
      color: palette.secondary.main,
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
  activeVaultswitch: {
    cursor: 'default',
    '& svg path': {
      fill: palette.primary.main,
    },
    '& .MuiTypography-root': {
      color: palette.primary.main,
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
  expandMore: {
    marginRight: 8,
    position: 'absolute',
    right: 0,
    cursor: 'pointer',
    '& path': {
      fill: palette.secondary.main,
    },
  },
  basicVault: {
    opacity: (props: any) => (props.dark ? 0.8 : 0.9),
    height: (props: any) => (props.mediumWindow ? 'calc(100% - 75px)' : '100%'),
    display: 'flex',
    position: 'absolute',
    width: '100%',
    background: (props: any) => (props.dark ? '#000000' : '#F2F4F5'),
    zIndex: 33,

    '& div': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 350,
      fontSize: 18,
      lineHeight: '18px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',

      '& p': {
        marginTop: 12,
        fontWeight: 700,
      },
    },
  },
}));

const ProVault: React.FC = () => {
  const dark = useIsDarkMode();
  const theme = useTheme();
  const mediumWindow = useMediaQuery(theme.breakpoints.down('md'));
  const smallWindow = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ dark, mediumWindow });
  const history = useHistory();
  const location = useLocation();
  const { palette } = theme;

  const [withdrawCallOpen, setWithdrawCallOpen] = useState(false);
  const [depositCallOpen, setDepositCallOpen] = useState(false);
  const [withdrawPutOpen, setWithdrawPutOpen] = useState(false);
  const [depositPutOpen, setDepositPutOpen] = useState(false);
  const [vaultIndex, setVaultIndex] = useState(
    new URLSearchParams(location.search).get('tab') === 'pro' ? 1 : 0,
  );
  const [coin, setCoin] = useState<any>(null);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const mobileDevice = /Mobi|Android/i.test(navigator.userAgent);
  const { callPool } = useCallPool();
  const { putPool } = usePutPool();

  const callPoolSize = useMemo(() => getPoolSize(callPool), [callPool]);
  const putPoolSize = useMemo(() => getPoolSize(putPool), [putPool]);

  console.log('callPool', callPool?.totalAvailable);

  const callPoolUtilization = useMemo(
    () => getPoolUtilization(callPool),
    [callPool],
  );
  const putPoolUtilization = useMemo(
    () => getPoolUtilization(putPool),
    [putPool],
  );

  const UnderlyingIcon = useMemo(
    () => getTokenIcon(callPool?.underlying.symbol),
    [callPool],
  );

  const BaseIcon = useMemo(
    () => getTokenIcon(callPool?.base.symbol),
    [callPool],
  );

  console.log('callPoolSize', callPoolSize);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLeave = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    const coin = event.target.value;
    setCoin(coin);
  };

  const handleBasicVaultSwitch = () => {
    setVaultIndex(0);
    history.push('/vaults?tab=basic');
  };

  const handleProVaultSwitch = () => {
    setVaultIndex(1);
    history.push('/vaults?tab=pro');
  };

  const BasicVaultButton = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      width={mobileDevice || mediumWindow ? '50%' : '94px'}
      height={mobileDevice || mediumWindow ? '32px' : '42px'}
      className={cx(
        classes.vaultSwitchButton,
        vaultIndex === 0 && classes.activeVaultswitch,
      )}
      onClick={handleBasicVaultSwitch}
    >
      <BasicIcon />
      <Typography>Basic</Typography>
    </Box>
  );

  const ProVaultButton = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      width={mobileDevice || mediumWindow ? '50%' : '94px'}
      height={mobileDevice || mediumWindow ? '32px' : '42px'}
      className={cx(
        classes.vaultSwitchButton,
        vaultIndex === 1 && classes.activeVaultswitch,
      )}
      onClick={handleProVaultSwitch}
    >
      <ProIcon />
      <Typography>Pro</Typography>
    </Box>
  );

  return (
    <Grid container direction='column' style={{ position: 'relative' }}>
      {withdrawCallOpen && (
        <WithdrawDepositModal
          open={withdrawCallOpen}
          call={true}
          type='withdraw'
          onClose={() => setWithdrawCallOpen(false)}
        />
      )}
      {depositCallOpen && (
        <WithdrawDepositModal
          open={depositCallOpen}
          call={true}
          type='deposit'
          onClose={() => setDepositCallOpen(false)}
        />
      )}
      {withdrawPutOpen && (
        <WithdrawDepositModal
          open={withdrawPutOpen}
          call={false}
          type='withdraw'
          onClose={() => setWithdrawPutOpen(false)}
        />
      )}
      {depositPutOpen && (
        <WithdrawDepositModal
          open={depositPutOpen}
          call={false}
          type='deposit'
          onClose={() => setDepositPutOpen(false)}
        />
      )}
      <Box width={1}>
        <Typography
          component='h1'
          variant='h3'
          color='textPrimary'
          className={classes.title}
          style={!mobileDevice ? { margin: '20px 0 0 20px' } : {}}
        >
          Vaults
        </Typography>
        <Grid container direction='row' className={classes.topTab}>
          <Box
            className={
              mobileDevice || mediumWindow
                ? classes.vaultSwitchContainerMobile
                : classes.vaultSwitchContainer
            }
            style={
              dark
                ? { borderColor: palette.divider }
                : {
                    borderColor: 'transparent',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
                  }
            }
          >
            {!mobileDevice && !mediumWindow ? (
              <SwitchWithGlider
                elements={[BasicVaultButton, ProVaultButton]}
                defaultIndex={vaultIndex}
                marginBetweenSwitches={4}
                gliderWidth={94}
                gliderHeight={42}
              />
            ) : mobileDevice ? (
              <SwitchWithGlider
                elements={[BasicVaultButton, ProVaultButton]}
                defaultIndex={vaultIndex}
                marginBetweenSwitches={-2}
                gliderWidth={
                  !smallWindow
                    ? (deviceWidth - 316) / 2
                    : (deviceWidth - 50) / 2
                }
                gliderHeight={31}
              />
            ) : (
              <SwitchWithGlider
                elements={[BasicVaultButton, ProVaultButton]}
                defaultIndex={vaultIndex}
                marginBetweenSwitches={-2}
                gliderWidth={
                  !smallWindow
                    ? (deviceWidth - 316) / 2
                    : (deviceWidth - 50) / 2
                }
                gliderHeight={31}
              />
            )}
          </Box>
          {!mediumWindow && vaultIndex === 1 && (
            <Box component='div' className={classes.box}>
              <SelectTokenTabs />
            </Box>
          )}
          {mediumWindow && vaultIndex === 1 && (
            <>
              <Box className={classes.col}>
                <Box
                  display='flex'
                  style={{
                    margin: '0 8px 2px',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Typography
                    component='p'
                    color='textPrimary'
                    className={classes.elementHeader}
                  >
                    Pool
                  </Typography>
                </Box>
              </Box>
              <Box width='100%' height='46px'>
                <FormControl variant='outlined' fullWidth>
                  <Select
                    IconComponent={() => {
                      return <ExpandMore />;
                    }}
                    value={coin}
                    onChange={handleChange}
                    inputProps={{
                      name: 'age',
                    }}
                  >
                    <MenuItem className={classes.menuItem} value='wBTC'>
                      <WBTCIcon />
                      <Typography component='span' color='textSecondary'>
                        Uni
                      </Typography>
                    </MenuItem>
                    <MenuItem className={classes.menuItem} value='Uni'>
                      <UniswapIcon />
                      <Typography component='span' color='textSecondary'>
                        Uni
                      </Typography>
                    </MenuItem>
                    <MenuItem className={classes.menuItem} value='Link'>
                      <LinkIcon />
                      <Typography component='span' color='textSecondary'>
                        Link
                      </Typography>
                    </MenuItem>
                    <MenuItem className={classes.menuItem} value='YFI'>
                      <YFIIcon />
                      <Typography component='span' color='textSecondary'>
                        YFI
                      </Typography>
                    </MenuItem>
                    <MenuItem className={classes.menuItem} value='ETH'>
                      <ETHIcon />
                      <Typography component='span' color='textSecondary'>
                        Eth
                      </Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
        </Grid>
        {vaultIndex === 0 && (
          <>
            <Box className={classes.basicVault}>
              <Box>
                <AttentionIcon />
                <Typography>
                  Basic vaults will be enabled after the trading competition is
                  complete
                </Typography>
              </Box>
            </Box>
            <BasicVault />
          </>
        )}
        {vaultIndex === 1 && (
          <Grid container direction='row' spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Paper>
                <Box component='div' className={classes.topSector}>
                  <Box component='div' className={classes.header}>
                    <CallUpIcon />
                    <Typography variant='h6' component='h1' color='textPrimary'>
                      Call pool
                    </Typography>
                    <Help className={classes.helpIcon} />
                    <Typography
                      variant='body1'
                      component='h2'
                      color='textSecondary'
                    >
                      {formatCompact(callPoolUtilization)}% Utilization
                    </Typography>
                  </Box>
                  <Grid
                    container
                    direction={!mediumWindow ? 'row' : 'column'}
                    alignItems={!mediumWindow ? 'flex-start' : 'center'}
                    style={{ marginTop: '2rem' }}
                  >
                    <Box className={classes.leftPanel}>
                      <RadialChart
                        color='#2DDEA0'
                        secondaryColor='#4D9EF2'
                        width={260}
                        height={260}
                        data={[67]}
                      >
                        <UnderlyingIcon />
                        Pool size in Uni
                        <Typography
                          component='h5'
                          variant='body2'
                          color='textSecondary'
                        >
                          {formatNumber(callPoolSize)}
                        </Typography>
                      </RadialChart>
                    </Box>
                    <Grid
                      item
                      direction='column'
                      justify='space-between'
                      className={classes.rightPanel}
                    >
                      <Grid container direction='column'>
                        <Typography
                          variant='body2'
                          component='h2'
                          color='textPrimary'
                        >
                          My P&L
                        </Typography>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              My total capital
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              10000
                            </Typography>
                            <UnderlyingIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              Fees earned
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              100
                            </Typography>
                            <BaseIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                              style={{ whiteSpace: 'nowrap' }}
                            >
                              % of my capital active
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              46%
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction='row'
                        spacing={2}
                        style={{ marginTop: '1rem' }}
                      >
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            size='large'
                            color='primary'
                            variant='contained'
                            onClick={() => setDepositCallOpen(true)}
                          >
                            Add
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            size='large'
                            color='secondary'
                            variant='outlined'
                            onClick={() => setWithdrawCallOpen(true)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box component='div' className={classes.bottomSector}>
                  <Typography
                    variant='body1'
                    component='h1'
                    color='textSecondary'
                  >
                    Call pool price level
                  </Typography>
                  <Box component='div' className={classes.subtitle}>
                    <Typography
                      variant='body2'
                      component='h2'
                      color='textSecondary'
                    >
                      Last 7 days
                    </Typography>
                    <IconButton
                      onMouseEnter={handleEnter}
                      onMouseLeave={handleLeave}
                    >
                      <Help />
                    </IconButton>
                    <TooltipPan open={open} anchorEl={anchorEl}>
                      <b>Premia pools</b> use state of the art liquidity-aware
                      pricing models. When there is excess capital available,
                      options become cheaper. When capital starts to dry up,
                      price of options increases. The price level updates after
                      every trade.
                      <Typography className={classes.readMore}>
                        Read more
                      </Typography>
                    </TooltipPan>
                  </Box>
                  <LineChart
                    isCall
                    data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                    categories={[
                      '2021/5/24',
                      '2021/5/25',
                      '2021/5/26',
                      '2021/5/27',
                      '2021/5/28',
                      '2021/5/29',
                      '2021/5/30',
                    ]}
                    width='100%'
                    height={200}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper>
                <Box component='div' className={classes.topSector}>
                  <Box component='div' className={classes.header}>
                    <PoolDownIcon />
                    <Typography variant='h6' component='h1' color='textPrimary'>
                      Put pool
                    </Typography>
                    <Help className={classes.helpIcon} />
                    <Typography
                      variant='body1'
                      component='h2'
                      color='textSecondary'
                    >
                      {formatCompact(putPoolUtilization)}% Utilization
                    </Typography>
                  </Box>
                  <Grid
                    container
                    direction={!mediumWindow ? 'row' : 'column'}
                    alignItems={!mediumWindow ? 'flex-start' : 'center'}
                    style={{ marginTop: '2rem' }}
                  >
                    <Box className={classes.leftPanel}>
                      <RadialChart
                        color='#EB4A97'
                        secondaryColor='#A745DD'
                        trackColor={
                          dark ? 'rgba(77,13,44,0.44)' : 'rgba(77,13,44,0.047)'
                        }
                        width={260}
                        height={260}
                        data={[67]}
                      >
                        <UnderlyingIcon />
                        Pool size in Uni
                        <Typography
                          component='h5'
                          variant='body2'
                          color='textSecondary'
                        >
                          {formatNumber(putPoolSize)}
                        </Typography>
                      </RadialChart>
                    </Box>
                    <Grid
                      item
                      direction='column'
                      justify='space-between'
                      className={classes.rightPanel}
                    >
                      <Grid container direction='column'>
                        <Typography
                          variant='body2'
                          component='h2'
                          color='textPrimary'
                        >
                          My P&L
                        </Typography>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              My total capital
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              10000
                            </Typography>
                            <UnderlyingIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                            >
                              Fees earned
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              100
                            </Typography>
                            <BaseIcon />
                          </Grid>
                        </Grid>
                        <Grid container direction='row'>
                          <Grid container xs={6} alignItems='center'>
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textSecondary'
                              style={{ whiteSpace: 'nowrap' }}
                            >
                              % of my capital active
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            xs={6}
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                          >
                            <Typography
                              variant='body2'
                              component='h2'
                              color='textPrimary'
                            >
                              46%
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction='row'
                        spacing={2}
                        style={{ marginTop: '1rem' }}
                      >
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            size='large'
                            color='secondary'
                            variant='contained'
                            onClick={() => setDepositPutOpen(true)}
                          >
                            Add
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            size='large'
                            color='secondary'
                            variant='outlined'
                            onClick={() => setWithdrawPutOpen(true)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box component='div' className={classes.bottomSector}>
                  <Typography
                    variant='body1'
                    component='h1'
                    color='textSecondary'
                  >
                    Put pool price level
                  </Typography>
                  <Box component='div' className={classes.subtitle}>
                    <Typography
                      variant='body2'
                      component='h2'
                      color='textSecondary'
                    >
                      Last 7 days
                    </Typography>
                    <IconButton
                      onMouseEnter={handleEnter}
                      onMouseLeave={handleLeave}
                    >
                      <Help />
                    </IconButton>
                    <TooltipPan open={open} anchorEl={anchorEl}>
                      <b>Premia pools</b> use state of the art liquidity-aware
                      pricing models. When there is excess capital available,
                      options become cheaper. When capital starts to dry up,
                      price of options increases. The price level updates after
                      every trade.
                      <Typography className={classes.readMore}>
                        Read more
                      </Typography>
                    </TooltipPan>
                  </Box>
                  <LineChart
                    isCall={false}
                    data={[2345, 3423, 3323, 2643, 3234, 6432, 1234]}
                    categories={[
                      '2021/5/24',
                      '2021/5/25',
                      '2021/5/26',
                      '2021/5/27',
                      '2021/5/28',
                      '2021/5/29',
                      '2021/5/30',
                    ]}
                    width='100%'
                    height={200}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Grid>
  );
};

export default ProVault;
