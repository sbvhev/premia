import React from 'react';
import {
  Typography,
  Modal,
  Box,
  Grid,
  CircularProgress,
} from '@material-ui/core';

import { useCurrentTx, useTxStateMsg } from 'state/transactions/hooks';

import { ModalContainer } from 'components';

export interface TransactionLoadingModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionLoadingModal: React.FC<TransactionLoadingModalProps> = ({
  open,
  onClose,
}) => {
  const { txLink } = useCurrentTx();
  const { txStateMsg } = useTxStateMsg();
  // const { txOption } = useTxOption();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='sm'>
        <Box width={1} marginBottom={2}>
          <Typography variant='h5'>Waiting for Confirmation</Typography>

          {/* <Box marginY={1}>
            {txOption && <OptionTitle small option={txOption} />}
          </Box> */}

          <Box marginTop={1}>
            <Typography component='h3' color='textSecondary'>
              {txStateMsg}
            </Typography>
          </Box>
        </Box>

        <Box clone marginTop='64px' marginBottom='16px'>
          <Grid container justify='center' alignItems='center'>
            <CircularProgress size='96px' />
          </Grid>
        </Box>

        <Box width={1} marginTop='16px' marginBottom='8px' textAlign='center'>
          {txLink && (
            <a href={txLink} target='_blank' rel='noreferrer'>
              View Transaction
            </a>
          )}
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default TransactionLoadingModal;
