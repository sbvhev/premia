import React from 'react';
import { Typography, Modal, Box, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ModalContainer } from 'components';

import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '251px',
    backgroundColor: 'transparent',
  },
  topIconWraper: {
    position: 'absolute',
    top: 5,
    left: 'calc(50% - 63px)',
    width: '126px',
    height: '126px',
    display: 'flex',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
}));

export interface TransactionsModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionsModal: React.FC<TransactionsModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { palette } = theme;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='lg'>
        {/* <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
          <Box width={1} className={! mobile ? classes.mainCard : classes.mainCardMobile}>
            
          </Box>
        </Box> */}
      </ModalContainer>
    </Modal>
  );
};

export default TransactionsModal;
