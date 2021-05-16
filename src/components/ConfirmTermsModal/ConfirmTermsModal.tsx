import React, { useState, useEffect } from 'react';
import { Grid, Typography, Modal, Box, Checkbox } from '@material-ui/core';

import { useWeb3 } from 'state/application/hooks';

import { ModalContainer } from 'components';

export interface ConfirmTermsModalProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmTermsModal: React.FC<ConfirmTermsModalProps> = ({
  open,
  onClose,
}) => {
  const { onboard } = useWeb3();
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  useEffect(() => {
    if (hasAgreedToTerms) {
      onboard?.walletSelect();
      onClose();
    }
  });

  const handleChangeAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasAgreedToTerms(event.target.checked);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='md'>
        <Box width={1} marginBottom={2}>
          <Typography variant='h5'>Terms of Service</Typography>
        </Box>

        <Box width={3 / 4} marginTop={6} marginX='auto'>
          <Typography variant='body2' color='textSecondary'>
            Premia is currently in beta, please use at your own risk. Beta
            software is used with the expectation and understanding that there
            may still be minor to fatal bugs & vulnerabilities that may not have
            been uncovered by previous security reviews, testing, or audits.
            There are economic risks with every interaction of the protocol, and
            you may lose 100% of your funds with no possibility of compensation.
            Do not deposit more than you are willing to lose.
          </Typography>

          <Box marginY={4}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              wrap='nowrap'
            >
              <Checkbox
                checked={hasAgreedToTerms}
                onChange={handleChangeAgree}
                name='agreeToTerms'
              />

              <Typography variant='body2'>
                By proceeding, you accept the{' '}
                <a
                  href='https://files.premia.finance/$/CZIOi'
                  target='_blank'
                  rel='noreferrer'
                >
                  Term of Service
                </a>
                ,{' '}
                <a
                  href='https://files.premia.finance/$/F2rmu'
                  target='_blank'
                  rel='noreferrer'
                >
                  Privacy Policy
                </a>
                ,{' '}
                <a
                  href='https://files.premia.finance/$/rw34x'
                  target='_blank'
                  rel='noreferrer'
                >
                  Cookie Policy
                </a>
                , and{' '}
                <a
                  href='https://files.premia.finance/$/YCDeQ'
                  target='_blank'
                  rel='noreferrer'
                >
                  Risk Disclaimer
                </a>
                .
              </Typography>
            </Grid>
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmTermsModal;
