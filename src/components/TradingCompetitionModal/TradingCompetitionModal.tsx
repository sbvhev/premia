import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Typography,
  Modal,
  Box,
  Fade,
  Backdrop,
  Button,
  Divider,
  Container,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import { ModalContainer } from 'components';

import { useDarkModeManager } from 'state/user/hooks';
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
import { ReactComponent as LogoIcon } from 'assets/svg/NewLogoWhite.svg';
import PrizeFirst from 'assets/svg/PrizeFirst.svg';
import PrizeSecond from 'assets/svg/PrizeSecond.svg';
import PrizeThird from 'assets/svg/PrizeThird.svg';
import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    maxWidth: 578,
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
    width: 84,
    height: 84,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
    boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
    borderRadius: 42,
    '& svg': {
      width: 42,
      height: 42,
      '& path': {
        fill: 'black',
      },
    },
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
    padding: '0 73px',
    fontFamily: 'DM Sans',
    '& h2': {
      fontSize: 28,
      lineHeight: '18px',
      fontWeight: 'bold',
      color: palette.text.primary,
    },
    '& > p': {
      margin: '19px 0 4px',
      fontSize: 14,
      lineHeight: '24px',
    },
    '& a': {
      color: palette.text.secondary,
      textDecoration: 'underline',
      cursor: 'pointer',
      fontSize: 14,
      lineHeight: '18px',
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
  prizeContainer: {
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    marginTop: 28,
    padding: '12px 30px 17px 19px',
    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& h3': {
        fontSize: 16,
        fontWeight: 700,
      },
      '& > div': {
        display: 'flex',
        width: '32%',
        height: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '0 13px',
        '&:first-child': {
          '& > div:first-child': {
            background:
              'linear-gradient(115.58deg, #FFA15E 8.45%, #EFFF8E 101.04%)',
            opacity: (props: any) => (props.darkMode ? 0.1 : 0.2),
          },
          '& p': {
            background:
              'linear-gradient(115.58deg, #FF5E5E 8.45%, #FFED8E 101.04%)',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
          },
        },
        '&:nth-child(2)': {
          '& > div:first-child': {
            background:
              'linear-gradient(115.58deg, #DEDEDE 8.45%, #CCCCCC 101.04%)',
            opacity: (props: any) => (props.dark ? 0.1 : 0.3),
          },
          '& p': {
            background:
              'linear-gradient(115.58deg, #858585 8.45%, #E6E6E6 101.04%)',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
          },
        },
        '&:nth-child(3)': {
          '& > div:first-child': {
            background:
              'linear-gradient(115.58deg, rgba(196, 111, 85, 0.1) 8.45%, rgba(153, 52, 52, 0.1) 101.04%)',
          },
          '& p': {
            background:
              'linear-gradient(115.58deg, #C46F55 8.45%, #993434 101.04%)',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
          },
        },
        '& > div:first-child': {
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          borderRadius: 8,
        },
        '& p': {
          fontSize: 14,
          lineHeight: '18px',
          fontWeight: 'bold',
        },
        '& > div:nth-child(2)': {
          display: 'flex',
          alignItems: 'center',
          '& img': {
            marginRight: 3,
          },
          '& p': {
            fontWeight: 'normal',
          },
        },
      },
    },
  },
  buttonsContainer: {
    margin: '19px 0 25px',
    '& button': {
      width: 150,
      height: 45,
      fontSize: 16,
      '&:first-child': {
        marginRight: 8,
      },
      '&:last-child': {
        color: palette.text.secondary,
      },
    },
  },
  socialContainer: {
    marginTop: 15,
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
      '& button, & a': {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
      },
      '& > div': {
        width: 35,
        height: 35,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        cursor: 'pointer',
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
}

const EligibleTradingModal: React.FC<EligibleTradingModalProps> = ({
  open,
  onClose,
}) => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles({ darkMode });
  const theme = useTheme();
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const { palette } = theme;
  const history = useHistory();

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
            <Box className={classes.iconCore}>
              <LogoIcon />
            </Box>
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
                  <Typography component='h2'>
                    Premia trading competition
                  </Typography>
                  <Box className={classes.prizeContainer}>
                    <Box mb={1}>
                      <Typography component='h3'>Prizes</Typography>
                      <Link to='/leaderboard' onClick={onClose}>
                        View leaderboard
                      </Link>
                    </Box>
                    <Box>
                      <Box>
                        <Box width={1} height={1} />
                        <Box>
                          <img src={PrizeFirst} alt='Prize First' />
                          <Typography>1</Typography>
                        </Box>
                        <Typography>$100,000</Typography>
                      </Box>
                      <Box>
                        <Box width={1} height={1} />
                        <Box>
                          <img src={PrizeSecond} alt='Prize Second' />
                          <Typography>2</Typography>
                        </Box>
                        <Typography>$35,000</Typography>
                      </Box>
                      <Box>
                        <Box width={1} height={1} />
                        <Box>
                          <img src={PrizeThird} alt='Prize Third' />
                          <Typography>3</Typography>
                        </Box>
                        <Typography>$15,000</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography color='secondary'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque lacinia metus orci, in vehicula sapien egestas ut.
                    Nulla sodales suscipit orci nec efficitur. In condimentum at
                    libero in aliquam.
                  </Typography>
                  <Link to='/trading-competition'>Competition rules</Link>
                  <Box className={classes.buttonsContainer}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => {
                        history.push('/trading-competition');
                        localStorage.setItem('tradingModalStatus', 'closed');
                      }}
                    >
                      I'm in
                    </Button>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Later
                    </Button>
                  </Box>
                </Box>
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
