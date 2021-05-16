import React from 'react';
import { Typography, Modal, Box, Grid, Button } from '@material-ui/core';
import { Done } from '@material-ui/icons';

import { useCurrentTx, useTxStateMsg } from 'state/transactions/hooks';
import theme from 'theme';

import { ModalContainer } from 'components';

export interface TransactionSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionSuccessModal: React.FC<TransactionSuccessModalProps> = ({
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
          <Typography variant='h5'>Transaction Successful</Typography>
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
            <Done
              style={{ fontSize: '96px', color: theme.palette.success.main }}
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

export default TransactionSuccessModal;
