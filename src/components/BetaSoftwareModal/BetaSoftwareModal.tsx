import React from 'react';
import { Typography, Modal, Box, Fade, Backdrop } from '@material-ui/core';

import { ModalContainer } from 'components';

export interface BetaSoftwareModalProps {
  open: boolean;
  onClose: () => void;
}

const BetaSoftwareModal: React.FC<BetaSoftwareModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <ModalContainer size='sm'>
          <Box width={1} marginBottom={2}>
            <Typography variant='h5'>This Software is in Beta</Typography>
          </Box>

          <Box width={3 / 4} marginTop={6} marginX='auto'>
            <Typography variant='body2'>
              Premia is currently in beta, please use at your own risk. Beta
              software is used with the expectation and understanding that there
              may still be minor to fatal bugs & vulnerabilities that may not have
              been uncovered by previous security reviews, testing, or audits.
              There are economic risks with every interaction of the protocol, and
              you may lose 100% of your funds with no possibility of compensation.
              Do not deposit more than you are willing to lose.
            </Typography>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default BetaSoftwareModal;
