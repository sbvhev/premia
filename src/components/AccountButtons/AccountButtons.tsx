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
import { ReactComponent as LogoIcon } from 'assets/svg/LogoIcon.svg';
import { ReactComponent as SwapIcon } from 'assets/svg/SwapIcon.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100% - 260px)',
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
      width: '100%',
      marginLeft: 4,
      marginRight: 4,
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
  const classes = useStyles();

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
        <Grid item container xs={12}>
          <Button
            color='primary'
            className={cx(classes.button, mobile && classes.half)}
            style={{ order: mobile ? 1 : 0 }}
          >
            Get
            <LogoIcon />
          </Button>
          <Button
            color='primary'
            variant='outlined'
            className={cx(classes.button, mobile && classes.half)}
            style={{ order: mobile ? 1 : 0 }}
            onClick={() => setShowSwapModal(true)}
          >
            Swap
            <SwapIcon />
          </Button>
          <Box
            className={classes.chain}
            onClick={() => {
              setChainModalOpen(true);
            }}
          >
            <EthIcon />
            <Typography color='textPrimary'>Ethereum</Typography>
          </Box>
          <Box clone mb={mobile ? 1 : 0} style={{ order: mobile ? 0 : 1 }}>
            <Box
              className={cx(classes.noDecoration, mobile && classes.fullWidth)}
              style={{ cursor: 'pointer' }}
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
                    <Typography className={classes.address}>
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
                      <ExitToApp color='action' />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
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
