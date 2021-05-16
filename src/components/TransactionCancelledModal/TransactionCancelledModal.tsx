import React from 'react';
import { Typography, Modal, Box, Grid, Button } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

import theme from 'theme';
import { useTxStateMsg } from 'state/transactions/hooks';

import { ModalContainer } from 'components';

export interface TransactionCancelledModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionCancelledModal: React.FC<TransactionCancelledModalProps> = ({
  open,
  onClose,
}) => {
  const { txStateMsg } = useTxStateMsg();
  // const { txOption } = useTxOption();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='sm'>
        <Box width={1} marginBottom={2}>
          <Typography variant='h5'>Transaction Cancelled</Typography>
          {/* <Box marginY={1}>
            {txOption && <OptionTitle small option={txOption} />}
          </Box> */}

          <Box marginTop={1}>
            <Typography component='h3' color='textSecondary'>
              {txStateMsg}
            </Typography>
          </Box>
        </Box>

        <Box clone marginY='50px'>
          <Grid container justify='center' alignItems='center'>
            <Cancel
              style={{ fontSize: '96px', color: theme.palette.error.main }}
            />
          </Grid>
        </Box>

        <Button
          fullWidth
          variant='contained'
          color='secondary'
          onClick={onClose}
        >
          Close
        </Button>
      </ModalContainer>
    </Modal>
  );
};

export default TransactionCancelledModal;
