import React from 'react';
import { Typography, Modal, Box, Button, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ModalContainer } from 'components';
import XOut from 'assets/svg/XOutGrey.svg';
import { ReactComponent as Attention } from 'assets/svg/AttentionIcon.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '364px',
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
    width: '364px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
  },
  mainCardMobile: {
    width: '350px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '22px 28px 24px 32px',
    height: '177px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '22px 24px 24px 28px',
    height: '177px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  title: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '18px',
    color: palette.text.primary,
  },
  smallInfoText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'center',
    // marginLeft: '12px',
    color: palette.text.secondary,
  },
  exitContainer: {
    position: 'absolute',
    top: 20,
    right: 'calc(50% - 164px)',
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
      backgroundColor: palette.primary.dark,
    },
  },
  exitContainerMobile: {
    position: 'absolute',
    top: 'calc(20vh + 26px)',
    right: 'calc(50% - 156px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 6px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
}));

export interface SwapModalProps {
  open: boolean;
  onClose: () => void;
  agree: () => void;
  disagree: () => void;
}

const SettingsConfirmation: React.FC<SwapModalProps> = ({
  open,
  onClose,
  agree,
  disagree,
}) => {
  const classes = useStyles();
  const mobile = /Mobi|Android/i.test(navigator.userAgent);

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
        <ModalContainer>
          <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
            <Box className={!mobile ? classes.mainCard : classes.mainCardMobile}>
              <Box
                className={
                  !mobile ? classes.topSection : classes.topSectionMobile
                }
              >
                <Attention />
                <Typography className={classes.title}>Are you sure?</Typography>
                <Typography className={classes.smallInfoText}>
                  High slippage trades can often result in bad rates and lost
                  funds. Only use this mode if you know what you are doing.
                </Typography>
              </Box>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                padding={!mobile ? '13px 24px 20px' : '13px 16px 20px'}
              >
                <Button
                  color='primary'
                  variant='contained'
                  size='large'
                  style={{ width: '150px' }}
                  onClick={agree}
                >
                  Agree
                </Button>
                <Button
                  color='secondary'
                  variant='outlined'
                  size='large'
                  style={{ width: '150px' }}
                  onClick={disagree}
                >
                  Disagree
                </Button>
              </Box>
            </Box>

            <Box
              id='exitId'
              className={
                !mobile ? classes.exitContainer : classes.exitContainerMobile
              }
              onClick={onClose}
            >
              <img src={XOut} alt='Exit' style={{ padding: '6px' }} />
            </Box>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default SettingsConfirmation;
