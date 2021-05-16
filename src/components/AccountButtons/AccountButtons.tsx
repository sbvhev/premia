import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

import { BetaSoftwareModal, ConfirmTermsModal } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  page: {
    backgroundColor: palette.background.default,
    width: 'calc(100% - 260px)',
    minHeight: '100vh',
  },

  avatar: {
    marginRight: '1.5rem',
    backgroundColor: palette.text.primary,
  },

  walletIcon: {
    marginRight: '1.5rem',
  },

  divider: {
    height: '48px',
  },

  account: {
    padding: '0.6rem 2rem',
    border: `1px solid ${palette.divider}`,
  },

  address: {
    color: palette.text.primary,
    fontSize: 10,
  },

  tier: {
    color: palette.text.secondary,
    fontSize: 10,
  },
}));

const AccountButtons: React.FC = () => {
  const { account, wallet, onboard } = useWeb3();
  const [betaSoftwareModalOpen, setBetaSoftwareModalOpen] = useState(false);
  const [confirmTermsModalOpen, setConfirmTermsModalOpen] = useState(false);
  const disconnect = useDisconnect();
  const location = useLocation();
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

      {wallet && wallet.provider && (
        <Grid item xs={2}>
          <Tooltip title='Disconnect'>
            <IconButton onClick={disconnect}>
              <ExitToApp color='action' />
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

      <Hidden smDown>
        <Grid item xs={8}>
          <Box position='relative'>
            {wallet && wallet.provider && account ? (
              <Box clone boxShadow={3}>
                <Button
                  className={classes.account}
                  component={Link}
                  to='/account'
                >
                  <Grid container direction='row' alignItems='center'>
                    <Avatar className={classes.avatar} />

                    <Grid>
                      <Typography className={classes.address}>
                        {shortenAddress(account ?? '')}
                      </Typography>

                      <Typography className={classes.tier}>Tier 1</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Box>
            ) : (
              <Box clone boxShadow={3}>
                <Button
                  className={classes.account}
                  onClick={() => setConfirmTermsModalOpen(true)}
                >
                  <Grid container direction='row' alignItems='center'>
                    <Lock className={classes.walletIcon} />

                    <Typography className={classes.address}>
                      Connect Wallet
                    </Typography>
                  </Grid>
                </Button>
              </Box>
            )}

            <Box
              position='absolute'
              top='110%'
              left={wallet && wallet.provider && account ? '3rem' : '2.5rem'}
            >
              <Link
                to={location.pathname}
                onClick={() => setBetaSoftwareModalOpen(true)}
              >
                View Beta Warning
              </Link>
            </Box>
          </Box>
        </Grid>
      </Hidden>

      <Grid item xs={1} />
    </Grid>
  );
};

export default AccountButtons;
