import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Tooltip,
} from '@material-ui/core';
import {
  SupervisorAccount,
  AccountBalanceWallet,
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';

import { useWeb3, useDisconnect } from 'state/application/hooks';
import { shortenAddress } from 'utils';
import {
  BetaSoftwareModal,
  ConfirmTermsModal,
  SwapModal,
  ChainModal,
  TransactionsModal,
} from 'components';
import { ReactComponent as EthIcon } from 'assets/svg/EthIcon.svg';
import { ReactComponent as LogoIcon } from 'assets/svg/LogoIcon.svg';
import { ReactComponent as SwapIcon } from 'assets/svg/SwapIcon.svg';
import { ReactComponent as PersonIcon } from 'assets/svg/PersonIcon.svg';
import { ReactComponent as LogoutIcon } from 'assets/svg/LogoutIcon.svg';
import { ReactComponent as PersonIconMobile } from 'assets/svg/PersonIconMobile.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100% - 210px)',
    minHeight: '100vh',
  },

  avatar: {
    marginRight: 6,
    '& path': {
      fill: palette.text.secondary
    }
  },

  walletIcon: {
    marginRight: '6px',
  },

  divider: {
    height: '48px',
  },

  account: {
    padding: '0 12px',
    height: 45,
    width: 180,
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    cursor: 'pointer',

    '&:hover': {
      borderColor: palette.primary.main,
      '& svg path': {
        fill: palette.text.primary,
      },
      '& p': {
        color: palette.text.primary,
      },
    }
  },

  accountMobile: {
    padding: '0 12px',
    height: 45,
    width: 'calc(60vw - 10px)',
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,

    '&:hover': {
      borderColor: palette.primary.main,
    }
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
    '& button': {
      padding: 0,
      '& path': {
        fill: palette.text.secondary
      }
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
    '& img': {
      marginLeft: 10,
    },
  },

  half: {
    marginRight: 4,
    width: 'calc(50% - 8px)',
  },

  fullWidth: {
    marginLeft: 4,
    width: 'calc(100% - 8px)',
  },

  swapButton: {
    backgroundColor: palette.primary.dark,
  },

  chain: {
    border: `1px solid ${palette.divider}`,
    width: 'fit-content',
    borderRadius: 12,
    marginRight: 10,
    padding: 6,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 14,

    '&:hover': {
      borderColor: palette.primary.main,

      '& svg path': {
        fill: palette.primary.main,
      },

      '& p': {
        color: palette.text.primary,
      },
    },

    '& svg': {
      width: 33,
      height: 33,
      marginRight: 8,
      padding: '8px 11px',
      background: 'rgba(82, 148, 255, 0.2)',
      borderRadius: 10,

      '& path': {
        fill: palette.text.primary,
      },
    },

    [breakpoints.down('sm')]: {
      minWidth: '125px',
      width: '33vw',
      marginRight: 0,
      marginBottom: 8,
    },
  },
}));

interface AccountButtonsProps {
  mobile?: boolean;
}

const AccountButtons: React.FC<AccountButtonsProps> = ({ mobile }) => {
  const { account, wallet, onboard } = useWeb3();
  const [betaSoftwareModalOpen, setBetaSoftwareModalOpen] = useState(false);
  const [confirmTermsModalOpen, setConfirmTermsModalOpen] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [chainModalOpen, setChainModalOpen] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const disconnect = useDisconnect();
  const theme = useTheme();
  const { palette } = theme;
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      justify='flex-end'
      style={!mobile ? { paddingRight: '24px' } : {}}
    >
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

      {chainModalOpen && (
        <ChainModal
          open={chainModalOpen}
          onClose={() => setChainModalOpen(false)}
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
        <Box display='flex' width='100%'>
          {!mobile ? (
            <>
              <Button color='primary' className={classes.button}>
                <span>Get</span>
                <LogoIcon />
              </Button>
              <Button
                color='primary'
                variant='outlined'
                className={classes.button}
                onClick={() => setShowSwapModal(true)}
              >
                <span>Swap</span>
                <SwapIcon />
              </Button>

              <Box
                className={classes.chain}
                onClick={() => {
                  setChainModalOpen(true);
                }}
              >
                <EthIcon />
                <Typography color='secondary'>Ethereum</Typography>
              </Box>
              <Box clone mb={mobile ? 1 : 0}>
                <Box display='flex' id='test'>
                  <Grid
                    container
                    direction='row'
                    alignItems='center'
                    justify='space-between'
                    className={classes.account}
                  >
                    <Grid
                      item
                      container
                      alignItems='center'
                      xs={9}
                      onClick={() => setShowTransactions(true)}
                    >
                      <PersonIcon className={classes.avatar} />
                      <Box>
                        <Typography
                          className={
                            !mobile ? classes.address : classes.addressMobile
                          }
                        >
                          {shortenAddress(account ?? '')}
                        </Typography>
                      </Box>
                    </Grid>

                    <Box
                      height={1}
                      borderLeft={1}
                      pl={1.5}
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
            </>
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              width='100%'
              paddingY={1}
            >
              <Box
                display='flex'
                justifyContent='space-between'
                paddingX={'12px'}
              >
                <Box clone mb={mobile ? 1 : 0}>
                  <Box display='flex'>
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
                        onClick={() => setShowTransactions(true)}
                        paddingTop='2px'
                      >
                        <Box style={{ margin: '2px 6px 0 0' }}>
                          <PersonIconMobile />
                        </Box>
                        <Box>
                          <Typography className={classes.addressMobile}>
                            {shortenAddress(account ?? '')}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        height={1}
                        borderLeft={1}
                        pl={1.5}
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
                  className={classes.chain}
                  onClick={() => {
                    setChainModalOpen(true);
                  }}
                >
                  <EthIcon />
                  <Typography color='secondary'>Ethereum</Typography>
                </Box>
              </Box>

              <Box
                display='flex'
                justifyContent='space-between'
                borderTop={`1px solid ${palette.divider}`}
                style={{ padding: '12px 10px 3px 10px' }}
              >
                <Button
                  color='primary'
                  className={cx(classes.button, mobile && classes.half)}
                >
                  Get
                  <LogoIcon />
                </Button>
                <Button
                  color='secondary'
                  className={cx(classes.button, mobile && classes.half)}
                  onClick={() => setShowSwapModal(true)}
                >
                  Swap
                  <SwapIcon />
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={cx(mobile && classes.fullWidth)}
          onClick={() => setConfirmTermsModalOpen(true)}
        >
          <AccountBalanceWallet className={classes.walletIcon} />
          Connect wallet
        </Button>
      )}

      <Grid item xs={1} />
      <SwapModal open={showSwapModal} onClose={() => setShowSwapModal(false)} />
      <TransactionsModal
        open={showTransactions}
        onClose={() => setShowTransactions(false)}
      />
    </Grid>
  );
};

export default AccountButtons;
