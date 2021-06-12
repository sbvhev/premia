import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { SupervisorAccount } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';

import { useWeb3, useDisconnect } from 'state/application/hooks';
import { useDarkModeManager } from 'state/user/hooks';

import { shortenAddress } from 'utils';
import {
  BetaSoftwareModal,
  ConfirmTermsModal,
  TransactionsModal,
} from 'components';
import { ReactComponent as LogoIcon } from 'assets/svg/LogoIcon.svg';
import { ReactComponent as LogoutIcon } from 'assets/svg/LogoutIcon.svg';
import { ReactComponent as ConnectWallet } from 'assets/svg/ConnectWallet.svg';

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
    backgroundColor: (props: any) => (props.darkMode ? 'transparent' : 'white'),
    boxShadow: (props: any) =>
      props.darkMode ? 'none' : '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
    borderRadius: 12,
    cursor: 'pointer',

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
    paddingLeft: 10,
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
}));

interface AccountButtonsProps {
  mobile?: boolean;
}

const AccountButtons: React.FC<AccountButtonsProps> = ({ mobile }) => {
  const { account, wallet, onboard } = useWeb3();
  const [betaSoftwareModalOpen, setBetaSoftwareModalOpen] = useState(false);
  const [confirmTermsModalOpen, setConfirmTermsModalOpen] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const disconnect = useDisconnect();
  const theme = useTheme();
  const { palette } = theme;
  const [darkMode] = useDarkModeManager();
  const classes = useStyles({ darkMode });

  return (
    <Grid container direction='row' alignItems='center' justify='flex-end'>
      <BetaSoftwareModal
        open={betaSoftwareModalOpen}
        onClose={() => setBetaSoftwareModalOpen(false)}
      />

      {confirmTermsModalOpen && (
        <ConfirmTermsModal
          open={confirmTermsModalOpen}
          onClose={() => setConfirmTermsModalOpen(false)}
        />
      )}

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
          width='100%'
          style={{ backgroundColor: 'transparent' }}
        >
          {!mobile ? (
            <>
              <Button
                color='primary'
                className={classes.button}
                onClick={() =>
                  window.open(
                    'https://app.sushi.com/swap?outputCurrency=0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70',
                    '_blank',
                  )
                }
              >
                <span>Get</span>
                <LogoIcon />
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
                  onClick={() =>
                    window.open(
                      'https://app.sushi.com/swap?outputCurrency=0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70',
                      '_blank',
                    )
                  }
                >
                  Get
                  <LogoIcon />
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box width='100%' p={1.25}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={cx(
              mobile && classes.fullWidth,
              classes.connectWalletButton,
            )}
            onClick={() => setConfirmTermsModalOpen(true)}
          >
            <ConnectWallet className={classes.walletIcon} />
            Connect wallet
          </Button>
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
