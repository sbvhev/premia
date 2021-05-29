import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import {
  ExitToApp,
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
// import { ReactComponent as LogoIcon } from 'assets/svg/LogoIcon.svg';
// import { ReactComponent as SwapIcon } from 'assets/svg/SwapIcon.svg';
import LogoIcon from 'assets/svg/LogoIcon.svg';
import SwapIcon from 'assets/svg/SwapIcon.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100% - 210px)',
    minHeight: '100vh',
  },

  avatar: {
    width: 30,
    height: 30,
    marginRight: 8,
    backgroundColor: palette.text.primary,
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
  },

  accountMobile: {
    padding: '0 12px',
    height: 45,
    width: 'calc(60vw - 10px)',
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
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
    },
  },

  address: {
    color: palette.text.primary,
    fontSize: 10,
  },

  addressMobile: {
    color: palette.secondary.main,
    fontSize: 14,
  },

  noDecoration: {
    textDecoration: 'none',
  },

  tier: {
    color: palette.text.secondary,
    fontSize: 10,
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
    <Grid container direction='row' alignItems='center' justify='flex-end' style={!mobile ? { paddingRight: '24px' } : {}}>
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
        <Box display="flex" width="100%">
          {!mobile ? (
            <>
              <Button
                color='primary'
                className={classes.button}
              >
                Get
                <img src={LogoIcon} alt='Logo Icon' />
              </Button>
              <Button
                color='secondary'
                className={classes.button}
                onClick={() => setShowSwapModal(true)}
              >
                Swap
                <img src={SwapIcon} alt='Swap Icon' />
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
                <Box
                  display="flex"
                  id="test"
                >
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
                      <Avatar className={classes.avatar} />
                      <Box>
                        <Typography className={!mobile ? classes.address : classes.addressMobile}>
                          {shortenAddress(account ?? '')}
                        </Typography>
                        <Typography className={classes.tier}>Tier 1</Typography>
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
                          <ExitToApp color='action' />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </>
          ) : (
            <Box display="flex" flexDirection="column" width="100%" paddingY={1}>
              <Box display="flex" justifyContent="space-between" paddingX={'12px'}>
                <Box clone mb={mobile ? 1 : 0}>
                  <Box
                    display="flex"
                  >
                    <Grid
                      container
                      direction='row'
                      alignItems='center'
                      justify='space-between'
                      className={classes.accountMobile}
                    >
                      <Box
                        display="flex"  
                        alignItems="center"
                        justifyContent="center"
                        onClick={() => setShowTransactions(true)}
                        paddingTop="2px"
                      >
                        <Box style={{ margin: '2px 6px 0 0'}}>
                          <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.82578 5.70825C4.26888 5.70825 3.00234 4.4417 3.00234 2.88485C3.00234 1.32801 4.26888 0.06146 5.82578 0.06146C7.38267 0.06146 8.64922 1.32801 8.64922 2.88485C8.64922 4.4417 7.38267 5.70825 5.82578 5.70825ZM11 12.2331C11 12.6058 10.6978 12.908 10.3251 12.908H1.32622C0.953488 12.908 0.651306 12.6058 0.651306 12.2331C0.651306 9.37996 2.97252 7.05875 5.82565 7.05875C8.67879 7.05875 11 9.37996 11 12.2331Z" fill={palette.secondary.main} />
                          </svg>
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
                            <ExitToApp color='action' />
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
                display="flex"
                justifyContent="space-between"
                borderTop={`1px solid ${palette.divider}`}
                style={{ padding: '12px 10px 3px 10px' }}
              >
                <Button
                  color='primary'
                  className={cx(classes.button, mobile && classes.half)}
                >
                  Get
                  <img src={LogoIcon} alt='Logo Icon' />
                </Button>
                <Button
                  color='secondary'
                  className={cx(classes.button, mobile && classes.half)}
                  onClick={() => setShowSwapModal(true)}
                >
                  Swap
                  <img src={SwapIcon} alt='Swap Icon' />
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
