import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Box,
  Grid,
  Paper,
  Toolbar,
  Button,
  Typography,
} from '@material-ui/core';

import { useWeb3, useToggleWrapEthModal } from 'state/application/hooks';

import WrapEthModal from './WrapEthModal';
import TokenApprovalModal from './TokenApprovalModal';
import TokenSearch from './TokenSearch';

export enum StakeMode {
  Premia = 'Premia',
  xPremia = 'xPremia',
}

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },

  paper: {
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
  },

  title: {
    flex: '1 1 30%',
    marginBottom: 8,
  },

  premiaBalance: {
    width: '100%',
    borderTop: '1px solid rgba(228, 228, 228, 0.1)',
  },

  balanceText: {
    fontSize: '0.6rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '5rem',
    textOverflow: 'ellipsis',
    color: `${theme.palette.success.main}`,
  },

  priceText: {
    fontSize: '0.6rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '5rem',
    textOverflow: 'ellipsis',
    color: `${theme.palette.text.secondary}`,
    fontWeight: 300,
  },
}));

const TokenWallet: React.FC = () => {
  const { wallet } = useWeb3();
  const { wrapEthModalOpen, setWrapEthModalOpen } = useToggleWrapEthModal();
  const [tokenApprovalModalOpen, setTokenApprovalModal] = useState(false);
  const classes = useStyles();

  return wallet && wallet.provider ? (
    <Box ml='auto' mt={14} width='80%'>
      <WrapEthModal
        open={wrapEthModalOpen}
        onClose={() => setWrapEthModalOpen(false)}
      />

      <TokenApprovalModal
        open={tokenApprovalModalOpen}
        onClose={() => setTokenApprovalModal(false)}
      />

      <Paper>
        <Grid container direction='column'>
          <Box clone width={1} py={2} px={3}>
            <Grid item>
              <Toolbar disableGutters>
                <Typography
                  variant='h6'
                  component='h4'
                  className={classes.title}
                >
                  Wallet
                </Typography>

                <Button
                  color='secondary'
                  variant='outlined'
                  onClick={() => setTokenApprovalModal(true)}
                >
                  <SettingsIcon />
                </Button>
              </Toolbar>

              <TokenSearch />
            </Grid>
          </Box>
        </Grid>
      </Paper>
    </Box>
  ) : null;
};

export default TokenWallet;
