import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Tooltip,
  Divider,
} from '@material-ui/core';
import { SupervisorAccount } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';

import { useWeb3, useDisconnect } from 'state/application/hooks';
import { useDarkModeManager } from 'state/user/hooks';
import { useSwapSettings } from 'state/swap/hooks';
import { useGasToken } from 'hooks';
import { PremiaETHToken, PremiaBSCToken } from 'web3/tokens';
import moment from 'moment';
import { shortenAddress } from 'utils';
import {
  BetaSoftwareModal,
  ConfirmTermsModal,
  TransactionsModal,
  ContainedButton,
} from 'components';
import { ReactComponent as ClockIcon } from 'assets/svg/ClockIcon.svg';
import { ReactComponent as LogoIcon } from 'assets/svg/NewLogoWhite.svg';
import { ReactComponent as LogoutIcon } from 'assets/svg/LogoutIcon.svg';
import { ReactComponent as ConnectWallet } from 'assets/svg/ConnectWallet.svg';
import { ReactComponent as UpRightArrow } from 'assets/svg/UpRightArrow.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  page: {
    backgroundColor: 'transparent',
    width: 'calc(100% - 210px)',
    minHeight: '100vh',
  },

  avatar: {
    marginRight: 6,
    '& path': {
      fill: palette.text.secondary,
    },
  },

  walletIcon: {
    marginRight: '8px',

    '& path': {
      fill: palette.text.hint,
    },
  },

  divider: {
    height: '48px',
  },

  account: {
    padding: 0,
    height: 45,
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
    boxShadow: (props: any) =>
      props.darkMode ? '0px 2px 5px rgba(0, 0, 0, 0.0746353)' : 'none',
    borderRadius: 12,
    cursor: 'pointer',

    '& a': {
      textDecoration: 'none',
    },

    '&> div:hover:not(:active)': {
      '&> svg path': {
        fill: palette.text.primary,
      },

      '& p': {
        color: palette.text.primary,
      },
    },
  },

  accountInfo: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 6,
  },

  accountMobile: {
    height: 45,
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,

    '& $disconnect': {
      width: 43,
      flex: 'none',
    },
  },

  connect: {
    padding: '0 12px',
    height: 45,
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },

  disconnect: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px 0 12px',

    '& svg path': {
      fill: palette.text.secondary,
    },

    '&:hover:not(:active)': {
      '& svg path': {
        fill: palette.text.primary,
      },
    },

    '& button': {
      padding: 0,

      '& svg path': {
        fill: palette.text.secondary,
      },

      ':active': {
        borderColor: palette.primary.main,

        '& svg path': {
          fill: palette.text.secondary,
        },

        '& p': {
          color: palette.text.secondary,
        },
      },
    },
  },

  address: {
    color: palette.text.secondary,
    fontSize: 14,
  },

  addressMobile: {
    color: palette.secondary.main,
    fontSize: 14,
  },

  noDecoration: {
    textDecoration: 'none',
  },

  button: {
    margin: '0 10px 0 0',
    height: 45,
    '& svg': {
      marginLeft: 8,
    },
  },

  fullWidth: {
    margin: 0,
    width: '100%',
  },

  swapButton: {
    backgroundColor: palette.primary.dark,
  },

  connectWalletButton: {
    fontSize: 14,
  },

  leaderboard: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    '& p': {
      fontSize: 14,
      lineHeight: '18px',
      color: palette.text.secondary,
    },
  },

  tradingContainer: {
    overflow: 'hidden',
    '& > div:hover, & > div:active': {
      background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      '& p': {
        color: (props: any) =>
          props.darkMode ? 'black !important' : 'white !important',
        textFillColor: 'unset',
        background: 'transparent',
      },
      '& svg path': {
        fill: (props: any) =>
          props.darkMode ? 'black !important' : 'white !important',
      },
    },
    '& $accountInfo > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 5,
      '& p': {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: '18px',
        margin: 0,
      },
    },
  },

  tradingCompetition: {
    background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
    WebkitBackgroundClip: 'text',
    textFillColor: 'transparent',
    paddingRight: 16,
    position: 'relative',

    '&:hover': {
      '& svg path': {
        fill: palette.text.secondary,
      },
    },

    '& svg': {
      position: 'absolute',
      right: 0,
      top: 3,

      '& path': {
        fill: 'transparent',
      },
    },
  },

  tradinghours: {
    color: palette.text.primary,
  },
}));

interface AccountButtonsProps {
  mobile?: boolean;
  onHide?: () => void;
}

const AccountButtons: React.FC<AccountButtonsProps> = ({ mobile, onHide }) => {
  const { account, wallet, onboard, chainId } = useWeb3();
  const [betaSoftwareModalOpen, setBetaSoftwareModalOpen] = useState(false);
  const [confirmTermsModalOpen, setConfirmTermsModalOpen] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const disconnect = useDisconnect();
  const history = useHistory();
  const location = useLocation();
  const gasToken = useGasToken();
  const theme = useTheme();
  const { palette } = theme;
  const [darkMode] = useDarkModeManager();
  const classes = useStyles({ darkMode, mobile });
  const [countDownStr, setCountDownStr] = useState('');
  const { setSwapSettings } = useSwapSettings();
  const doNotShowDisclaimerAgain = localStorage.getItem(
    'doNotShowDisclaimerAgain',
  );
  const getCountDownStr = () => {
    const hours = moment.utc('2021-06-18T18:00:00').diff(moment(), 'hours');
    setCountDownStr(
      Math.floor(hours / 24) +
        'd' +
        (hours % 24 > 0 ? ' ' + (hours % 24) + 'h' : ' '),
    );
  };
  useEffect(() => {
    getCountDownStr();
  });
  setInterval(() => {
    getCountDownStr();
  }, 20 * 60 * 1000);

  const getPremia = useMemo(() => {
    if (!chainId) return () => {};

    if (chainId === 1 || chainId === 56) {
      return () => {
        setSwapSettings({
          fromToken: gasToken,
          toToken: chainId === 56 ? PremiaBSCToken : PremiaETHToken,
        });
        history.push(`${location.pathname}?getPremia=true`);
      };
    }
    return () =>
      window.open(
        'https://app.sushi.com/swap?outputCurrency=0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70',
        '_blank',
      );
  }, [chainId, gasToken, history, location.pathname, setSwapSettings]);

  return (
    <Grid
      container
      alignItems='center'
      justify={!mobile ? 'flex-end' : 'center'}
      id='here'
    >
      <BetaSoftwareModal
        open={betaSoftwareModalOpen}
        onClose={() => setBetaSoftwareModalOpen(false)}
      />

      <ConfirmTermsModal
        open={confirmTermsModalOpen}
        onClose={() => setConfirmTermsModalOpen(false)}
      />

      <Box
        display='flex'
        className={cx(classes.account, classes.tradingContainer)}
        width={mobile ? 1 : 'auto'}
        my={mobile ? 1.25 : 0}
        mx={mobile ? 1.25 : 1.25}
        justifySelf='center'
        style={!mobile ? {} : { marginRight: '12px' }}
      >
        <Box
          height={1}
          className={classes.accountInfo}
          flex={1}
          display='flex'
          justifyContent='flex-start'
          onClick={() => {
            history.push('/trading-competition');

            if (onHide) {
              onHide();
            }
          }}
        >
          <ClockIcon />
          <Box height={1}>
            <Typography className={classes.tradingCompetition}>
              Trading competition <UpRightArrow />
            </Typography>
            <Typography className={classes.tradinghours}>
              {countDownStr} left
            </Typography>
          </Box>
        </Box>
        <Box
          height={1}
          borderLeft={1}
          borderColor={theme.palette.divider}
          className={classes.leaderboard}
          onClick={() => {
            history.push('/leaderboard');

            if (onHide) {
              onHide();
            }
          }}
        >
          <Typography>Leaderboard</Typography>
        </Box>
      </Box>

      {mobile && <Divider className={classes.fullWidth} />}

      {wallet && wallet.provider && wallet.type === 'hardware' && (
        <Grid item xs={2}>
          <Tooltip title='Switch Account'>
            <IconButton onClick={onboard?.accountSelect}>
              <SupervisorAccount color='action' />
            </IconButton>
          </Tooltip>
        </Grid>
      )}

      {wallet && wallet.provider && account ? (
        <Box
          display='flex'
          width={mobile ? 1 : 'auto'}
          style={{ backgroundColor: 'transparent' }}
        >
          {!mobile ? (
            <>
              <Button
                color='primary'
                className={classes.button}
                onClick={getPremia}
              >
                <span>Get</span>
                <LogoIcon fill={theme.palette.common.white} />
              </Button>

              <Box clone mb={mobile ? 1 : 0}>
                <Box display='flex' id='test'>
                  <Grid container className={classes.account}>
                    <Box
                      height={1}
                      className={classes.accountInfo}
                      onClick={() => setShowTransactions(true)}
                    >
                      <Box>
                        <Typography
                          className={
                            !mobile ? classes.address : classes.addressMobile
                          }
                        >
                          {shortenAddress(account ?? '')}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      height={1}
                      borderLeft={1}
                      borderColor={theme.palette.divider}
                      className={classes.disconnect}
                      onClick={disconnect}
                    >
                      <Tooltip title='Disconnect'>
                        <LogoutIcon color='action' />
                      </Tooltip>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </>
          ) : (
            <Box display='flex' flexDirection='column' width='100%' pt={1.25}>
              <Box
                display='flex'
                justifyContent='space-between'
                paddingX={'10px'}
              >
                <Box clone mb={mobile ? 1 : 0}>
                  <Grid
                    container
                    direction='row'
                    alignItems='center'
                    justify='space-between'
                    className={classes.accountMobile}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      flex={1}
                      height={1}
                      onClick={() => setShowTransactions(true)}
                    >
                      <Typography className={classes.addressMobile}>
                        {shortenAddress(account ?? '')}
                      </Typography>
                    </Box>

                    <Box
                      height={1}
                      borderLeft={1}
                      borderColor={theme.palette.divider}
                      className={classes.disconnect}
                    >
                      <Tooltip title='Disconnect'>
                        <IconButton onClick={disconnect}>
                          <LogoutIcon color='action' />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Box>
              </Box>

              <Box
                display='flex'
                justifyContent='space-between'
                borderTop={`1px solid ${palette.divider}`}
                p={1.25}
              >
                <Button
                  color='primary'
                  className={cx(classes.button, mobile && classes.fullWidth)}
                  onClick={getPremia}
                >
                  Get
                  <LogoIcon fill={theme.palette.common.white} />
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          width={!mobile ? '179px' : '100%'}
          padding={!mobile ? 0 : '10px 14px 10px 8px'}
          justifySelf='center'
          justifyContent='center'
        >
          <ContainedButton
            id='wrappper'
            label='Connect wallet'
            size='small'
            fullWidth
            textStyling={{ margin: '3px' }}
            onClick={() => {
              if (doNotShowDisclaimerAgain) {
                onboard?.walletSelect();
              } else {
                setConfirmTermsModalOpen(true);
              }
            }}
            startIcon={<ConnectWallet style={{ margin: '3px' }} />}
          />
        </Box>
      )}

      <Grid item xs={1} />
      <TransactionsModal
        open={showTransactions}
        onClose={() => setShowTransactions(false)}
      />
    </Grid>
  );
};

export default AccountButtons;
