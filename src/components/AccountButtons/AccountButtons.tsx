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
import { BetaSoftwareModal, ConfirmTermsModal, SwapModal, ChainModal } from 'components';
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
    width: 30,
    height: 30,
    marginRight: 8,
    backgroundColor: palette.text.primary,
  },

  walletIcon: {
    marginRight: '1.5rem',
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
  },

  connect: {
    padding: '0 12px',
    height: 45,
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },

  disconnect: {
    display: 'flex',
    '& button': {
      padding: 0
    }
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
      '& svg': {
        background: 'rgba(82, 148, 255, 0.5)',
      }
    },

    '& svg': {
      width: 33,
      height: 33,
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
  const disconnect = useDisconnect();
  const theme = useTheme();
  const classes = useStyles();

  const handleShowSwapModal = () => {
    setShowSwapModal(true);
  };

  const handleHideSwapModal = () => {
    setShowSwapModal(false);
  };

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
            onClick={handleShowSwapModal}
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
                justify='space-between'
                className={classes.account}
              >
                <Grid item container alignItems='center' xs={9}>
                  <Avatar className={classes.avatar} />
                  <Box>
                    <Typography className={classes.address}>
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
            </Link>
          </Box>
        </Grid>
      ) : (
        <Box
          onClick={() => setConfirmTermsModalOpen(true)}
          className={cx(classes.connect, mobile && classes.fullWidth)}
        >
          <Lock className={classes.walletIcon} />
          <Typography className={classes.address}>Connect Wallet</Typography>
        </Box>
      )}

      <Grid item xs={1} />
      <SwapModal open={showSwapModal} onClose={handleHideSwapModal} />
    </Grid>
  );
};

export default AccountButtons;
