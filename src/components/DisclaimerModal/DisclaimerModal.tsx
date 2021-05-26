import React from 'react';
import { Typography, Modal, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ModalContainer } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '448px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  wrapperMobile: {
    width: '350px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  mainCard: {
    width: '448px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `2px solid ${palette.divider}`,
    padding: '40px 0 26px',
  },
  mainCardMobile: {
    width: '350px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `2px solid ${palette.divider}`,
    padding: '40px 0 26px',
  },
  title: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '18px',
    color: palette.text.primary,
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
    textAlign: 'left',
    marginLeft: '2px',
    color: palette.text.secondary,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 26px 30px',
    height: '132px',
    margin: '36px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 12px 30px',
    height: '132px',
    margin: '36px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 26px 22px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 12px 22px',
  },
  exitContainer: {
    position: 'absolute',
    top: 32,
    right: 'calc(50% - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 6px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  },
  exitContainerMobile: {
    position: 'absolute',
    top: 'calc(20vh + 40px)',
    right: 'calc(50% - 150px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 6px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1000,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  },
}));

export interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  // const { palette } = theme;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='lg'>
        <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
          <Typography>disclaimer</Typography>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default DisclaimerModal;
