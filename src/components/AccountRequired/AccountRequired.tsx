import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Lock } from '@material-ui/icons';

import { ConfirmTermsModal } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '80%',
    height: 'calc(100vh - 112px)',
  },

  avatar: {
    marginRight: '1.5rem',
    backgroundColor: palette.secondary.main,
  },

  walletIcon: {
    marginRight: '1.5rem',
  },

  account: {
    padding: '0.6rem 2rem',
    border: `1px solid ${palette.divider}`,
  },

  address: {
    color: palette.text.primary,
    fontSize: 10,
  },
}));

const AccountRequired: React.FC = () => {
  const [confirmTermsModalOpen, setConfirmTermsModalOpen] = useState(false);
  const classes = useStyles();

  return (
    <Box clone className={classes.wrapper}>
      <Grid container justify='center' alignItems='center'>
        {confirmTermsModalOpen && (
          <ConfirmTermsModal
            open={confirmTermsModalOpen}
            onClose={() => setConfirmTermsModalOpen(false)}
          />
        )}

        <Button
          className={classes.account}
          onClick={() => setConfirmTermsModalOpen(true)}
        >
          <Grid container direction='row' justify='center' alignItems='center'>
            <Lock className={classes.walletIcon} />

            <Typography className={classes.address}>Connect Wallet</Typography>
          </Grid>
        </Button>
      </Grid>
    </Box>
  );
};

export default AccountRequired;
