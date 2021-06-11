import React from 'react';
import { Typography, Modal, Box, Fade, Backdrop } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ModalContainer } from 'components';

import MostOuterErrorRadial from 'assets/svg/ErrorIconOuterRadial.svg';
import SecondErrorRadial from 'assets/svg/ErrorIconSecondOuterRadial.svg';
import ErrorIcon from 'assets/svg/ErrorIconCore.svg';
import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    maxWidth: 489,
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
    marginTop: 64,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(316.57deg, ${palette.error.main} 18.89%, ${palette.error.dark} 95.84%);`,
    borderRadius: '12px',
    padding: '1.5px 1.5px 2px 2px',
    zIndex: 2,
  },
  mainCard: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    height: '100%',
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
    marginTop: 70,
    fontFamily: 'DM Sans',
    padding: '0 60px',
    '& h2': {
      fontSize: 28,
      lineHeight: '27px',
      color: palette.text.primary,
      fontWeight: 'bold',
      margin: '0 22px 16px',
    },
    '& p': {
      fontSize: 14,
      lineHeight: '16px',
      color: palette.text.secondary,
      marginBottom: 40
    }
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

export interface InEligibleTradingModalProps {
  open: boolean;
  onClose: () => void;
}

const InEligibleTradingModal: React.FC<InEligibleTradingModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
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
                  <Typography component='h2'>
                    Unfortunately, you are not eligible
                  </Typography>
                  <Typography>
                    Premia trading competition is available for the previous users of Premia v1 and participants of PBC. We hope to see you again when we are live
                  </Typography>
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

export default InEligibleTradingModal;
