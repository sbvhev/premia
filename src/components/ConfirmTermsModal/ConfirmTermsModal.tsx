import React, { useState, useEffect } from 'react';
import { Button, Typography, Modal, Box, Checkbox, Fade, Backdrop } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useWeb3 } from 'state/application/hooks';

import { ModalContainer } from 'components';
import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '364px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  wrapperMobile: {
    width: '340px',
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
    width: '340px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '24px 26px 24px 28px',
    height: '376px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '24px 16px 24px',
    height: '376px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 30px 20px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 16px 24px',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
    margin: '8px 0 10px',
    color: palette.text.primary,
  },
  smallInfoText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'left',
    color: palette.text.secondary,
  },
  anchor: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'left',
    color: `${palette.text.secondary} !important`,
    textDecorationColor: palette.text.secondary,
  },
  checkbox: {
    '&:hover': {
      backgroundColor: palette.primary,
    },
  },
  exitContainer: {
    position: 'absolute',
    top: 28,
    right: 'calc(50% - 166px)',
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
    top: 'calc(20vh + 30px)',
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
      backgroundColor: palette.primary.dark,
    },
  },
}));

export interface ConfirmTermsModalProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmTermsModal: React.FC<ConfirmTermsModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { palette } = theme;
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const { onboard } = useWeb3();
  const [checkIsOn, setCheckIsOn] = useState(false);

  useEffect(() => {
    const doNotShowDisclaimerAgain = localStorage.getItem(
      'doNotShowDisclaimerAgain',
    );
    if (doNotShowDisclaimerAgain) {
      onboard?.walletSelect();
      onClose();
    }
  });

  const handleChangeAgree = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkIsOn) {
      localStorage.setItem('doNotShowDisclaimerAgain', 'true');
    }
    onboard?.walletSelect();
    onClose();
  };

  const handleDisclaimerCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckIsOn(!checkIsOn);
  };

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
          <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
            <Box
              className={!mobile ? classes.mainCard : classes.mainCardMobile}
              style={palette.type === 'light' ? { border: 'none' } : {}}
            >
              <Box
                className={
                  !mobile ? classes.topSection : classes.topSectionMobile
                }
              >
                <Box>
                  <svg
                    width='33'
                    height='30'
                    viewBox='0 0 33 30'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M31.4913 23.8605L19.2595 2.67442C18.5794 1.49637 17.3611 0.792969 16.0007 0.792969C14.6403 0.792969 13.422 1.49637 12.7419 2.67442L0.510163 23.8604C-0.170054 25.0386 -0.170054 26.4453 0.510163 27.6234C1.19038 28.8015 2.40856 29.5048 3.76899 29.5048H28.2324C29.5928 29.5048 30.811 28.8014 31.4913 27.6234C32.1715 26.4453 32.1715 25.0386 31.4913 23.8605ZM29.8676 26.686C29.5263 27.2772 28.915 27.6301 28.2324 27.6301H3.76899C3.08634 27.6301 2.47506 27.2772 2.13379 26.686C1.79253 26.0949 1.79253 25.3891 2.13379 24.7979L14.3656 3.6119C14.7069 3.02075 15.3182 2.66786 16.0008 2.66786C16.6833 2.66786 17.2946 3.02075 17.6359 3.6119L29.8677 24.7979C30.2089 25.3891 30.2089 26.0949 29.8676 26.686ZM16.8748 10.9374C16.8748 10.4197 16.4551 10 15.9374 10C15.4197 10 15 10.4197 15 10.9374V18.4369C15 18.9546 15.4197 19.3743 15.9374 19.3743C16.4551 19.3743 16.8748 18.9546 16.8748 18.4369V10.9374ZM14.7504 22.6484C14.7504 21.9592 15.3111 21.3985 16.0003 21.3985C16.6896 21.3985 17.2503 21.9592 17.2503 22.6484C17.2503 23.3376 16.6895 23.8983 16.0003 23.8983C15.3111 23.8983 14.7504 23.3376 14.7504 22.6484Z'
                      fill='url(#paint0_linear)'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear'
                        x1='4.00018'
                        y1='0.792968'
                        x2='43.1746'
                        y2='27.2498'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stop-color='#5294FF' />
                        <stop offset='1' stop-color='#1EFF78' />
                      </linearGradient>
                    </defs>
                  </svg>
                </Box>
                <Typography className={classes.title}>Disclaimer</Typography>
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-between'
                >
                  <Typography className={classes.smallInfoText}>
                    Premia is currently in beta, please use at your own risk. Beta
                    software is used with the expectation and understanding that
                    there may still be minor to fatal bugs & vulnerabilities that
                    may not have been uncovered by previous security reviews,
                    testing, or audits. There are economic risks with every
                    interaction of the protocol, and you may lose 100% of your
                    funds with no possibility of compensation. Do not deposit more
                    than you are willing to lose.
                  </Typography>

                  <Box style={{ margin: '20px 4px 0px 0px' }}>
                    <Typography className={classes.smallInfoText}>
                      By proceeding, you accept the{' '}
                      <a
                        className={classes.anchor}
                        href='https://files.premia.finance/$/CZIOi'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Term of Service
                      </a>
                      ,{' '}
                      <a
                        className={classes.anchor}
                        href='https://files.premia.finance/$/F2rmu'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Privacy Policy
                      </a>
                      ,{' '}
                      <a
                        className={classes.anchor}
                        href='https://files.premia.finance/$/rw34x'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Cookie Policy
                      </a>
                      , and{' '}
                      <a
                        className={classes.anchor}
                        href='https://files.premia.finance/$/YCDeQ'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Risk Disclaimer
                      </a>
                      .
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                className={
                  !mobile ? classes.botSection : classes.botSectionMobile
                }
              >
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  margin='0px 0 4px'
                >
                  <Checkbox
                    checked={checkIsOn}
                    onChange={handleDisclaimerCheck}
                    name='agreeToTerms'
                    size='small'
                    className={classes.checkbox}
                    icon={
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='20'
                          height='20'
                          rx='4'
                          fill='#5294FF'
                          fill-opacity='0.2'
                        />

                        <rect
                          x='0.5'
                          y='0.5'
                          width='19'
                          height='19'
                          rx='3.5'
                          stroke='#5294FF'
                          stroke-opacity='0.5'
                        />
                      </svg>
                    }
                    checkedIcon={
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='20'
                          height='20'
                          rx='4'
                          fill='#5294FF'
                          fill-opacity='0.2'
                        />
                        <rect
                          x='0.5'
                          y='0.5'
                          width='19'
                          height='19'
                          rx='3.5'
                          stroke='#5294FF'
                          stroke-opacity='0.5'
                        />
                        <path
                          d='M6 9.79777L9.08199 13L15 6.86891L14.1504 6L9.08199 11.25L6.83786 8.92275L6 9.79777Z'
                          fill='#5294FF'
                        />
                      </svg>
                    }
                  />
                  <Typography className={classes.smallInfoText}>
                    Do not show confirmation again
                  </Typography>
                </Box>

                <Button
                  color='primary'
                  variant='contained'
                  size='large'
                  onClick={handleChangeAgree}
                >
                  Agree
                </Button>
              </Box>
            </Box>
            <Box
              onClick={onClose}
              className={
                !mobile ? classes.exitContainer : classes.exitContainerMobile
              }
            >
              <img src={XOut} alt='Exit' style={{ padding: '6px' }} />
            </Box>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default ConfirmTermsModal;
