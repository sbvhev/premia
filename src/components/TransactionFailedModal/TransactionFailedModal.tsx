import React from 'react';
import { Typography, Modal, Box, Grid, Button } from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';

import { useCurrentTx, useTxStateMsg } from 'state/transactions/hooks';

import { ModalContainer } from 'components';

export interface TransactionFailedModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionFailedModal: React.FC<TransactionFailedModalProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const { txLink } = useCurrentTx();
  const { txStateMsg } = useTxStateMsg();
  // const { txOption } = useTxOption();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='sm'>
        <Box width={1} marginBottom={2}>
          <Typography variant='h5'>Transaction Failed</Typography>
          {/* <Box marginY={1}>
            {txOption && <OptionTitle small option={txOption} />}
          </Box> */}

          <Box marginTop={1}>
            <Typography component='h3' color='textSecondary'>
              {txStateMsg}
            </Typography>
          </Box>
        </Box>

        <Box clone marginTop='48px' marginBottom='16px'>
          <Grid container justify='center' alignItems='center'>
            <Warning
              style={{ fontSize: '96px', color: theme.palette.error.main }}
            />
          </Grid>
        </Box>

        <Box width={1} marginTop='16px' marginBottom='8px' textAlign='center'>
          {txLink && (
            <a href={txLink} target='_blank' rel='noreferrer'>
              View Transaction
            </a>
          )}
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

export default TransactionFailedModal;