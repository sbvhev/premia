import React from 'react';
import {
  Modal,
  Paper,
  Grid,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useApprovalType } from 'state/application/hooks';
import { TokensTable } from 'components';

export interface TokenApprovalModalProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  container: {
    width: 900,
    maxWidth: '100%',
    padding: '24px 2rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  grid: {
    marginBottom: 16
  },

  description: {
    marginBottom: '16px',
  },

  descriptionSmall: {
    fontSize: 12,
  },

  approvalTypes: {
    width: '45%',
    display: 'flex',
    border: `1px solid #666`,
    borderRadius: 12,
    padding: 1,
  },

  approvalType: {
    borderRadius: 12
  }
}));

const TokenApprovalModal: React.FC<TokenApprovalModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const { approvalType, setApprovalType } = useApprovalType();

  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={classes.container}>
        <Grid container direction='row' justify='space-between' className={classes.grid}>
          <Box>
            <Typography variant='body1' className={classes.description}>
              Approvals
            </Typography>
            <Typography variant='body1' className={classes.descriptionSmall}>
              Approve tokens for use within the protocol
            </Typography>
          </Box>
          <Grid className={classes.approvalTypes}>
            <Box clone width={1/2}>
              <Button variant={approvalType === 'write' ? 'contained' : 'text'} color='primary' className={classes.approvalType} onClick={() => { setApprovalType('write') }}>Write Options</Button>
            </Box>
            <Box clone width={1/2}>
              <Button variant={approvalType === 'market' ? 'contained' : 'text'} color='primary' className={classes.approvalType} onClick={() => { setApprovalType('market') }}>Marketplace</Button>
            </Box>
          </Grid>
        </Grid>
        <TokensTable />
      </Paper>
    </Modal>
  );
};

export default TokenApprovalModal;
