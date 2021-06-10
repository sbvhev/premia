import React from 'react';
import { Typography, Modal, Box, Fade, Backdrop } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useTxStateMsg } from 'state/transactions/hooks';

import { ModalContainer } from 'components';

import MostOuterErrorRadial from 'assets/svg/ErrorIconOuterRadial.svg';
import SecondErrorRadial from 'assets/svg/ErrorIconSecondOuterRadial.svg';
import ErrorIcon from 'assets/svg/ErrorIconCore.svg';
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
  firstOuterRadial: {
    position: 'absolute',
    top: 5,
    left: 'calc(50% - 62px)',
    zIndex: 4,
    width: '125px',
    height: '123.5px',
  },
  secondOuterRadial: {
    position: 'absolute',
    top: 11.5,
    left: 'calc(50% - 56px)',
    zIndex: 5,
    width: '112px',
    height: '112px',
  },
  innerMainBorderedCircle: {
    width: '98px',
    height: '98px',
    background: `linear-gradient(316.57deg, ${palette.error.main} 18.89%, ${palette.error.dark} 95.84%);`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.6',
    zIndex: 5,
  },
  innerMainTransparent: {
    width: '96px',
    height: '96px',
    position: 'absolute',
    top: 20,
    left: 'calc(50% - 48px)',
    zIndex: 4,
    backgroundColor: palette.background.paper,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCoreBackgroundFill: {
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    position: 'absolute',
    top: 42.5,
    left: 'calc(50% - 25px)',
    zIndex: 4,
    width: '50px',
    height: '50px',
  },
  iconCore: {
    position: 'absolute',
    top: 25.5,
    left: 'calc(50% - 42px)',
    zIndex: 10,
    width: '84px',
    height: '84px',
  },
  coloredBorderBackgroundForCard: {
    boxSizing: 'border-box',
    position: 'relative',
    top: 64,
    left: 0,
    height: '187px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(316.57deg, ${palette.error.main} 18.89%, ${palette.error.dark} 95.84%);`,
    borderRadius: '12px',
    zIndex: 2,
  },
  mainCard: {
    boxSizing: 'border-box',
    display: 'flex',
    width: 'calc(100% - 3px)',
    height: 'calc(100% - 3px)',
    backgroundColor: palette.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
  },
  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: '40px',
    fontFamily: 'DM Sans',
  },
  topTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'DM Sans',
  },
  title: {
    fontWeight: 700,
    fontSize: '28px',
    LineHeight: '18px',
  },
  subTitle: {
    fontWeight: 500,
    fontSize: '14px',
    LineHeight: '24px',
  },
  anchor: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12px',
    color: palette.text.secondary,
    textDecorationColor: palette.text.secondary,
  },
  hyperlink: {
    fontWeight: 500,
    fontSize: '14px',
    LineHeight: '24px',
  },
  exitContainer: {
    position: 'absolute',
    top: 30,
    right: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
}));

export interface TransactionCancelledModalProps {
  open: boolean;
  onClose: () => void;
  swapModal?: boolean;
}

const TransactionCancelledModal: React.FC<TransactionCancelledModalProps> = ({
  open,
  onClose,
  swapModal,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const { txStateMsg } = useTxStateMsg();
  const { palette } = theme;

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
        <ModalContainer size='md'>
          <Box width={1} className={classes.wrapper}>
            <Box
              className={classes.topIconWraper}
              style={!mobile ? {} : { top: 'calc(20vh + 3px)' }}
            >
              <Box className={classes.innerMainBorderedCircle}></Box>
            </Box>
            <img
              src={MostOuterErrorRadial}
              alt='---'
              className={classes.firstOuterRadial}
              style={!mobile ? {} : { top: 'calc(20vh + 3.5px)' }}
            />
            <img
              src={SecondErrorRadial}
              alt='--'
              className={classes.secondOuterRadial}
              style={!mobile ? {} : { top: 'calc(20vh + 10px)' }}
            />
            <img
              src={ErrorIcon}
              alt='Cancelled'
              className={classes.iconCore}
              style={!mobile ? {} : { top: 'calc(20vh + 23.5px)' }}
            />
            <Box
              className={classes.innerMainTransparent}
              style={!mobile ? {} : { top: 'calc(20vh + 18px)' }}
            />
            <Box
              className={classes.innerCoreBackgroundFill}
              style={!mobile ? {} : { top: 'calc(20vh + 42px)' }}
            />
            <Box
              className={classes.coloredBorderBackgroundForCard}
              style={
                palette && palette.type === 'light' ? { background: 'none' } : {}
              }
            >
              <Box className={classes.mainCard}>
                <Box className={classes.textColumn}>
                  <Box className={classes.topTextWrapper}>
                    <Typography variant='h2' className={classes.title}>
                      {!swapModal ? 'Transaction cancelled' : 'Swap cancelled'}
                    </Typography>
                    <Typography color='secondary' className={classes.subTitle}>
                      {txStateMsg}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.exitContainer} onClick={onClose}>
                <img src={XOut} alt='Exit' />
              </Box>
            </Box>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default TransactionCancelledModal;
