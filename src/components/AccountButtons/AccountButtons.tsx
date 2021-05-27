import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import { ExitToApp, SupervisorAccount, Lock } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';

import { useWeb3, useDisconnect } from 'state/application/hooks';
import { shortenAddress } from 'utils';
import { BetaSoftwareModal, ConfirmTermsModal, SwapModal, ChainModal, TransactionsModal } from 'components';
import { ReactComponent as EthIcon } from 'assets/svg/EthIcon.svg';
import LogoIcon from 'assets/svg/LogoIcon.svg';
import SwapIcon from 'assets/svg/SwapIcon.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100% - 260px)',
    minHeight: '100vh',
  },

  avatar: {
    margin: '0.6rem 1.5rem 0.6rem 0',
    backgroundColor: palette.text.primary,
  },

  walletIcon: {
    marginRight: '1.5rem',
  },

  divider: {
    height: '48px',
  },

  account: {
    padding: '0 1rem',
    border: `1px solid ${palette.divider}`,
    width: '100%',
    borderRadius: 12,
  },

  connect: {
    padding: '1rem',
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    cursor: 'pointer',
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
    marginRight: 10,
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
    height: 62,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 14,

    '&:hover': {
      '& svg': {
        background: 'rgba(82, 148, 255, 0.5)',
      }
    },

    '& svg': {
      width: 50,
      height: 50,
      marginRight: 8,
      padding: '8px 11px',
      background: 'rgba(82, 148, 255, 0.2)',
      borderRadius: 10
    },

    [breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 8
    },
  }
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
            <img src={LogoIcon} alt='Logo Icon' />
          </Button>
          <Button
            color='secondary'
            className={cx(classes.button, mobile && classes.half)}
            style={{ order: mobile ? 1 : 0 }}
            onClick={() => setShowSwapModal(true)}
          >
            Swap
            <img src={SwapIcon} alt='Swap Icon' />
          </Button>
          <Box className={classes.chain} onClick={() => {
            setChainModalOpen(true);
          }}>
            <EthIcon />
            <Typography color="secondary">Ethereum</Typography>
          </Box>
          <Box
            clone
            mb={mobile ? 1 : 0}
            style={{ order: mobile ? 0 : 1 }}
          >
            <Link
              to='/'
              className={cx(classes.noDecoration, mobile && classes.fullWidth)}
            >
              <Grid
                container
                direction='row'
                alignItems='center'
                className={classes.account}
              >
                <Grid item container alignItems='center' xs={9} onClick={() => setShowTransactions(true)}>
                  <Avatar className={classes.avatar} />
                  <Box>
                    <Typography className={classes.address}>
                      {shortenAddress(account ?? '')}
                    </Typography>
                    <Typography className={classes.tier}>Tier 1</Typography>
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Box
                    borderLeft={1}
                    borderColor={theme.palette.divider}
                    p={0.8}
                  >
                    <Tooltip title='Disconnect'>
                      <IconButton onClick={disconnect}>
                        <ExitToApp color='action' />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </Link>
          </Box>
        </Grid>
      ) : (
        <Box
          onClick={() => setConfirmTermsModalOpen(true)}
          className={cx(classes.connect, mobile && classes.fullWidth)}
        >
          <Grid container direction='row' alignItems='center'>
            <Lock className={classes.walletIcon} />

            <Typography className={classes.address}>Connect Wallet</Typography>
          </Grid>
        </Box>
      )}

      <Grid item xs={1} />
      <SwapModal open={showSwapModal} onClose={() => setShowSwapModal(false)} />
      <TransactionsModal open={showTransactions} onClose={() => setShowTransactions(false)} />
    </Grid>
  );
};

export default AccountButtons;
