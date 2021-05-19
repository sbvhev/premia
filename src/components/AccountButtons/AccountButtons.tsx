import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Avatar,
  Hidden,
  Tooltip,
} from '@material-ui/core';
import {
  LockOpen,
  ExitToApp,
  SupervisorAccount,
  Lock,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { useWeb3, useDisconnect } from 'state/application/hooks';
import { shortenAddress } from 'utils';
import theme from 'theme';
import { BetaSoftwareModal, ConfirmTermsModal } from 'components';
import LogoIcon from 'assets/svg/LogoIcon.svg';
import SwapIcon from 'assets/svg/SwapIcon.svg';

const useStyles = makeStyles(({ palette }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100% - 260px)',
    minHeight: '100vh',
  },

  avatar: {
    margin: '0.6rem 1.5rem 0.6rem 0',
    backgroundColor: palette.text.primary
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
    borderRadius: 12
  },

  connect: {
    padding: '1rem',
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    cursor: 'pointer'
  },

  address: {
    color: palette.text.primary,
    fontSize: 10,
  },

  noDecoration: {
    textDecoration: 'none'
  },

  tier: {
    color: palette.text.secondary,
    fontSize: 10,
  },

  button: {
    marginRight: 10,
    '& img' : {
      marginLeft: 10
    }
  },

  swapButton: {
    backgroundColor: palette.primary.dark
  }
}));

const AccountButtons: React.FC = () => {
  const { account, wallet, onboard } = useWeb3();
  const [betaSoftwareModalOpen, setBetaSoftwareModalOpen] = useState(false);
  const [confirmTermsModalOpen, setConfirmTermsModalOpen] = useState(false);
  const disconnect = useDisconnect();
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

      {wallet && wallet.provider && wallet.type === 'hardware' && (
        <Grid item xs={2}>
          <Tooltip title='Switch Account'>
            <IconButton onClick={onboard?.accountSelect}>
              <SupervisorAccount color='action' />
            </IconButton>
          </Tooltip>
        </Grid>
      )}

      <Hidden mdUp>
        {(!wallet || !wallet.provider || !account) && (
          <Grid item xs={2}>
            <Tooltip title='Connect Account'>
              <IconButton onClick={() => setConfirmTermsModalOpen(true)}>
                <LockOpen color='action' />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Hidden>

      {wallet && wallet.provider && account ? (
        <Grid item container xs={12}>
          <Button color='primary' className={classes.button}>
            Get
            <img src={LogoIcon} alt='Logo Icon' />
          </Button>
          <Button color='secondary' className={classes.button}>
            Swap
            <img src={SwapIcon} alt='Swap Icon' />
          </Button>
          <Box clone boxShadow={3}>
            <Link to='/account' className={classes.noDecoration}>
              <Grid container direction='row' alignItems='center' className={classes.account}>
                <Grid item container alignItems='center' xs={9}>
                  <Avatar className={classes.avatar} />
                  <Box>
                    <Typography className={classes.address}>
                      {shortenAddress(account ?? '')}
                    </Typography>
                    <Typography className={classes.tier}>Tier 1</Typography>
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Box borderLeft={1} borderColor={theme.palette.divider} p={0.8}>
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
        <Box boxShadow={3} onClick={() => setConfirmTermsModalOpen(true)} className={classes.connect}>
          <Grid container direction='row' alignItems='center'>
            <Lock className={classes.walletIcon} />

            <Typography className={classes.address}>
              Connect Wallet
            </Typography>
          </Grid>
        </Box>
      )}

      <Grid item xs={1} />
    </Grid>
  );
};

export default AccountButtons;
