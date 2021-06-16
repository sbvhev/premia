import React from 'react';
import {
  Typography,
  Modal,
  Box,
  Fade,
  Backdrop,
  Button,
  Divider,
  Container,
  Link,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import { ModalContainer } from 'components';

import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import { ReactComponent as TwitterIcon } from 'assets/svg/TwitterIcon.svg';
import { ReactComponent as TelegramIcon } from 'assets/svg/Telegram.svg';
import { ReactComponent as FacebookIcon } from 'assets/svg/Facebook.svg';
import { ReactComponent as DiscordIcon } from 'assets/svg/DiscordIcon.svg';
import { ReactComponent as SocialIcon1 } from 'assets/svg/SocialIcon1.svg';
import MostOuterSuccessRadial from 'assets/svg/SuccessIconOuterRadial.svg';
import SecondSuccessRadial from 'assets/svg/SuccessIconSecondOuterRadial.svg';
import SuccessIcon from 'assets/svg/SuccessIconCore.svg';
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
    top: 6,
    left: 'calc(50% - 62px)',
    zIndex: 4,
    width: '124px',
    height: '123px',
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
    background: `linear-gradient(316.57deg, ${palette.success.dark} 18.89%, ${palette.success.main} 95.84%);`,
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
    background: `linear-gradient(316.57deg, ${palette.success.dark} 18.89%, ${palette.success.main} 95.84%);`,
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
    marginTop: 80,
    fontFamily: 'DM Sans',
    '& h2': {
      fontSize: 28,
      lineHeight: '18px',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    '& > p': {
      margin: '11px 50px 21px',
      fontSize: 14,
      lineHeight: '16px',
    },
    '& button': {
      maxWidth: 220,
      height: 45,
      margin: '0 auto 30px',
    },
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
  socialContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '24px',
      color: palette.text.primary,
    },
    '& a': {
      marginBottom: 19,
      textDecoration: 'underline',
      fontSize: 14,
      lineHeight: '18px',
      color: palette.text.secondary,
      cursor: 'pointer',
    },
    '& > div': {
      margin: '8px 0 15px',
      display: 'flex',
      justifyContent: 'center',
      '& > div': {
        width: 35,
        height: 35,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        cursor: 'pointer',
        '& button, & a': {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
        },
        '&:last-child': {
          marginRight: 0,
        },
        '& svg path': {
          fill: palette.text.secondary,
        },
        '&:hover, &:active': {
          '& svg path': {
            fill: palette.text.primary,
          },
        },
      },
    },
  },
}));

export interface EligibleTradingModalProps {
  open: boolean;
  onClose: () => void;
  showClaimToken: () => void;
}

const EligibleTradingModal: React.FC<EligibleTradingModalProps> = ({
  open,
  onClose,
  showClaimToken,
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
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer size='md'>
          <Box width={1} className={classes.wrapper}>
            <Box
              className={classes.topIconWraper}
              style={!mobile ? {} : { top: 'calc(20vh + 5px)' }}
            >
              <Box className={classes.innerMainBorderedCircle}></Box>
            </Box>
            <img
              src={MostOuterSuccessRadial}
              alt='---'
              className={classes.firstOuterRadial}
              style={!mobile ? {} : { top: 'calc(20vh + 5.5px)' }}
            />
            <img
              src={SecondSuccessRadial}
              alt='--'
              className={classes.secondOuterRadial}
              style={!mobile ? {} : { top: 'calc(20vh + 12px)' }}
            />
            <img
              src={SuccessIcon}
              alt='Success'
              className={classes.iconCore}
              style={!mobile ? {} : { top: 'calc(20vh + 25.5px)' }}
            />
            <Box
              className={classes.innerMainTransparent}
              style={!mobile ? {} : { top: 'calc(20vh + 20px)' }}
            />
            <Box
              className={classes.innerCoreBackgroundFill}
              style={!mobile ? {} : { top: 'calc(20vh + 42.5px)' }}
            />
            <Box
              className={classes.coloredBorderBackgroundForCard}
              style={
                palette && palette.type === 'light'
                  ? { background: 'none' }
                  : {}
              }
            >
              <Box className={classes.mainCard}>
                <Box className={classes.textColumn}>
                  <Typography component='h2'>You are eligible</Typography>
                  <Typography color='secondary'>
                    Now, you can claim your tokens for the competition and start
                    trading when the competitions start
                  </Typography>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={showClaimToken}
                  >
                    Claim Tokens
                  </Button>
                  <Divider />
                  <Box className={classes.socialContainer}>
                    <Typography>Share on:</Typography>
                    <Box>
                      <Container fixed>
                        <TwitterShareButton url='https://premia.finance'>
                          <TwitterIcon />
                        </TwitterShareButton>
                      </Container>
                      <Container fixed>
                        <TelegramShareButton url='https://premia.finance'>
                          <TelegramIcon />
                        </TelegramShareButton>
                      </Container>
                      <Container fixed>
                        <FacebookShareButton url='https://premia.finance'>
                          <FacebookIcon />
                        </FacebookShareButton>
                      </Container>
                      <Container fixed>
                        <a
                          href='https://discord.com/invite/6MhRmzmdHN'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <DiscordIcon />
                        </a>
                      </Container>
                      <Container fixed>
                        <RedditShareButton url='https://premia.finance'>
                          <SocialIcon1 />
                        </RedditShareButton>
                      </Container>
                    </Box>
                    <Link>Not right now</Link>
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

export default EligibleTradingModal;
