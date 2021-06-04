import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from '@material-ui/core';
import cn from 'classnames';
import { ReactComponent as PremiaLogo } from 'assets/svg/Logo.svg';
import { ReactComponent as TwitterIcon } from 'assets/svg/TwitterIcon.svg';
import { ReactComponent as DiscordIcon } from 'assets/svg/DiscordIcon.svg';
import { ReactComponent as GithubIcon } from 'assets/svg/GithubIcon.svg';
import { ReactComponent as MediumIcon } from 'assets/svg/MediumIcon.svg';
import { ReactComponent as LandingTradingIcon } from 'assets/svg/LandingTradingIcon.svg';
import { ReactComponent as LandingHedgeIcon } from 'assets/svg/LandingHedgeIcon.svg';
import { ReactComponent as LandingYieldIcon } from 'assets/svg/LandingYieldIcon.svg';
import { ReactComponent as MarketSensitivePricingIcon } from 'assets/svg/MarketSensitivePricing.svg';
import { ReactComponent as CrowdSourcedLearningIcon } from 'assets/svg/CrowdSourcedLearning.svg';
import { ReactComponent as CapitalEfficientMarketIcon } from 'assets/svg/CapitalEfficientMarket.svg';
import { ReactComponent as GridIcon } from 'assets/svg/Grid.svg';
import { ReactComponent as SubtractIcon } from 'assets/svg/Subtract.svg';
import { ReactComponent as ThreeCirclesIcon } from 'assets/svg/ThreeCircles.svg';
import { ReactComponent as SmallLogoIcon } from 'assets/svg/SmallLogo.svg';
import { ReactComponent as Consetellation } from 'assets/svg/Consetellation1.svg';
import { ReactComponent as ConsetellationTwo } from 'assets/svg/Consetellation2.svg';
import { ReactComponent as ConsetellationThree } from 'assets/svg/Consetellation3.svg';
import { ReactComponent as ConsetellationFour } from 'assets/svg/Consetellation4.svg';
import { ReactComponent as ConsetellationSix } from 'assets/svg/Consetellation6.svg';
import { ReactComponent as ConsetellationSeven } from 'assets/svg/Consetellation7.svg';
import { ReactComponent as ConsetellationEight } from 'assets/svg/Consetellation8.svg';
import { ReactComponent as ConsetellationNine } from 'assets/svg/Consetellation9.svg';
import { ReactComponent as ConsetellationTen } from 'assets/svg/Consetellation10.svg';
import { ReactComponent as ArrowCircleIcon } from 'assets/svg/ArrowCircle.svg';
import { ReactComponent as HamburgerIcon } from 'assets/svg/Hamburger.svg';
import { ReactComponent as ConsetellationMobileOne } from 'assets/svg/mobile/Consetellation16.svg';
import { ReactComponent as ConsetellationMobileTwo } from 'assets/svg/mobile/Consetellation3.svg';
import { ReactComponent as ConsetellationMobileThree } from 'assets/svg/mobile/Consetellation11.svg';
import { ReactComponent as ConsetellationMobileFour } from 'assets/svg/mobile/Consetellation111.svg';
import { ReactComponent as ConsetellationMobileFive } from 'assets/svg/mobile/Consetellation112.svg';
import { ReactComponent as ConsetellationMobileSix } from 'assets/svg/mobile/Consetellation13.svg';
import { ReactComponent as ConsetellationMobileSeven } from 'assets/svg/mobile/Consetellation113.svg';
import { ReactComponent as ConsetellationMobileEight } from 'assets/svg/mobile/Consetellation15.svg';
import KeyIcon from 'assets/svg/Key.svg';
import CoinIcon from 'assets/svg/Coin.svg';
import LabIcon from 'assets/svg/Lab.svg';
import TradeOptionsImage from 'assets/images/TradeOptions.png';
import VaultsBasicImage from 'assets/images/Vaults.png';
import VaultsProImage from 'assets/images/VaultsPro.png';
import HeroImage from 'assets/images/HeroImage.png';
import BackgroundTop from 'assets/images/BackgroundTop.png';
import BackgroundBottom from 'assets/images/BackgroundBottom.png';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  container: {
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
  },

  box: {
    '& svg': {
      marginRight: 16,

      '&:first-of-type': {
        marginLeft: 16,
      },

      '& path': {
        fill: 'rgba(255, 255, 255, 0.8)',
      },
    },
  },
  openApp: {
    padding: '0 30px',
    fontSize: 14,
    lineHeight: '18px',
    color: 'black',
    width: 'auto',
    height: 40,
    whiteSpace: 'nowrap',
  },
  appBar: {
    background: 'black',
    boxShadow: '2px 5px 4px rgba(0, 0, 0, 0.25)',
    borderBottom: '1px solid #212121',
  },
  menuItem: {
    color: 'rgba(255, 255,255, 0.7)',
    fontSize: 14,
    lineHeight: '18px',
    padding: '0px 10px',
    margin: '0 8px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',

    [breakpoints.down('md')]: {
      padding: 0,
    },
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
  },
  topSectionRight: {
    width: '50%',
    backgroundImage: `url("${HeroImage}")`,
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    [breakpoints.down('sm')]: {
      width: '100%',
      position: 'absolute',
      height: '100%',
      top: 0,
      left: 0,
    },
  },
  topSectionLeft: {
    width: '50%',
    padding: '160px 0',
    zIndex: 333,

    [breakpoints.down('sm')]: {
      width: 'calc(100% - 100px)',
      padding: '50px 0',

      '& $subTitle': {
        fontSize: 14,
        lineHeight: '18px',
        color: 'white',
      },
    },

    [breakpoints.between('sm', 'md')]: {
      padding: '40px 0',
    },
  },
  gradientTitle: {
    fontSize: 55,
    lineHeight: '64px',
    fontWeight: 700,
    background:
      '-webkit-linear-gradient(-55deg, #FFFFFF 0%, #5294FF 67%, #EB4A97 88%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    marginBottom: 21,
    zIndex: 333,

    [breakpoints.between('sm', 'md')]: {
      fontSize: 40,
      lineHeight: '40px',
    },

    [breakpoints.down('sm')]: {
      fontSize: 32,
      lineHeight: '32px',
      marginBottom: 8,
    },
  },
  gradientSubTitle: {
    fontSize: 48,
    lineHeight: '55px',
    fontWeight: 700,
    marginBottom: 2,
    width: 'fit-content',
    background:
      '-webkit-linear-gradient(-45deg, #FFFFFF 0%, #5294FF 66%, #EB4A97 113%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  subTitle: {
    fontWeight: 400,
    width: 'fit-content',
    fontSize: 18,
    lineHeight: '26px',
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: 526,
    marginBottom: 23,
  },
  openAppBig: {
    color: '#000000',
    fontSize: 16,
    lineHeight: '18px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    padding: '16px 55px',
    borderRadius: 12,
    width: 'auto',

    [breakpoints.down('sm')]: {
      width: 140,
      height: 40,
      fontSize: 16,
      lineHeight: '18px',
    },
  },
  body: {
    border: 'none',

    [breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
  explorePremia: {
    padding: '80px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    '& $subTitle': {
      [breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: '18px',
        padding: '0 30px',
      },
    },

    '& $gradientSubTitle': {
      [breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: 26,
        lineHeight: '55px',
      },
    },

    [breakpoints.down('sm')]: {
      position: 'relative',
      padding: '20px 0',
    },

    '& svg': {
      '&:first-of-type': {
        left: -20,
        top: 0,
        position: 'absolute',
      },

      '&:last-of-type': {
        position: 'absolute',
        right: -20,
        bottom: -60,
      },
    },
  },
  tradeOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,
    position: 'relative',

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  earnYield: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,
    position: 'relative',

    '& $rightSideImage': {
      backgroundImage: `url("${VaultsBasicImage}")`,
    },

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  hedgeRisks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },

    '& $rightSideImage': {
      backgroundImage: `url("${VaultsProImage}")`,
    },

    '& $leftSide': {
      '& $divider': {
        height: 0,
        position: 'absolute',
        left: 30,
        top: 100,
      },
    },
  },
  tradeOptionsSubTitle: {
    marginBottom: 36,
  },
  white: {
    fontSize: 42,
    fontWeight: 500,
    lineHeight: '54px',
    marginBottom: 9,
    color: 'white',
    marginTop: 40,

    [breakpoints.down('sm')]: {
      fontSize: 22,
      lineHeight: '54px',
      marginTop: 33,
    },
  },
  rightSideImage: {
    width: '45%',
    height: 360,
    backgroundImage: `url("${TradeOptionsImage}")`,
    backgroundSize: 'auto 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',

    [breakpoints.down('sm')]: {
      width: '100%',
      backgroundSize: '100%',
    },

    [breakpoints.between('sm', 'md')]: {
      backgroundSize: '100%',
    },
  },
  leftSide: {
    position: 'relative',
    width: '45%',
    paddingLeft: 74,

    '& > svg': {
      position: 'absolute',
      top: 40,
      left: 0,

      [breakpoints.down('sm')]: {
        width: 40,
        height: 40,
      },
    },

    '& > button': {
      [breakpoints.down('sm')]: {
        margin: 'auto',
      },
    },

    '& $divider': {
      height: 'calc(100% + 120px)',
      position: 'absolute',
      left: 30,
      top: 100,

      [breakpoints.down('sm')]: {
        left: 20,
        top: 80,
        height: 'calc(100% - 40px)',
      },
    },

    [breakpoints.down('sm')]: {
      width: '100%',
      paddingLeft: 56,
      display: 'flex',
      flexDirection: 'column',
    },
  },
  outlinedButton: {
    marginBottom: 60,
    borderRadius: 12,
    border: '1.5px solid #5294FF',
    padding: '10px 30px',
    width: 200,
    height: 45,
    fontSize: 16,
    lineHeight: '18px',
    fontWeight: 700,
    background: 'transparent',
  },
  divider: {
    borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
  },
  learnMore: {
    width: '100%',
    backgroundImage: `url("${BackgroundTop}")`,
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 410,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    '& > svg': {
      '&:first-of-type': {
        position: 'absolute',
        left: 0,
        top: -50,
      },

      '&:last-of-type': {
        position: 'absolute',
        right: 0,
        bottom: -200,
      },
    },

    [breakpoints.down('sm')]: {
      top: -120,
      height: 200,

      '& > div': {
        position: 'absolute',
        top: 200,
      },
    },
  },
  learnMoreBar: {
    zIndex: 100,
    height: 80,
    maxWidth: 1300,
    width: '100%',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: '#101010',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    position: 'relative',

    [breakpoints.down('sm')]: {
      padding: '13px 20px',
      height: 'auto',
    },

    '& p': {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '54px',

      [breakpoints.down('sm')]: {
        lineHeight: '21px',
        fontSize: 14,
      },

      [breakpoints.between('sm', 'md')]: {
        lineHeight: '24px',
        fontSize: 16,
      },
    },

    '& > div': {
      display: 'flex',
      alignItems: 'center',

      '& svg': {
        marginRight: 19,
        width: 30,
        height: 20,

        '& path': {
          fill: 'white',
        },
      },

      fontSize: 18,
      lineHeight: '54px',
    },

    '& button': {
      fontSize: 16,
      lineHeight: '18px',
      padding: '0 35px',
      width: 'auto',
      height: 45,
      color: 'black',
      whiteSpace: 'nowrap',
    },

    '& > svg': {
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translate(40%, -40%)',
    },
  },
  defiNative: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 196,
    position: 'relative',

    '& > p': {
      marginBottom: 129,
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'row',

      [breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },

    [breakpoints.down('sm')]: {
      marginBottom: 0,

      '& $gradientSubTitle': {
        fontSize: 26,
        lineHeight: '26px',
        marginBottom: 10,
      },
    },
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 30px',

    '& svg': {
      marginBottom: 25,
    },

    '& h1': {
      fontSize: 21,
      lineHeight: '24px',
      color: '#F2F4F5',
      marginBottom: 8,
      fontWeight: 'bold',
    },

    '& p': {
      fontSize: 16,
      lineHeight: '22px',
      fontWeight: 400,
      color: 'rgba(220, 220, 220, 0.6)',
    },

    [breakpoints.down('sm')]: {
      marginBottom: 50,
    },
  },
  gridIcon: {
    position: 'relative',
    width: 600,
    height: 600,

    '& svg': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },

    '& $subtractIcon': {
      right: 0,
      top: 0,
      transform: 'none',
      left: 'auto',
    },

    [breakpoints.down('sm')]: {
      width: 325,
      height: 325,
    },
  },
  subtractIcon: {
    right: 0,

    [breakpoints.down('sm')]: {
      width: 162.5,
      height: 325,
    },
  },
  netIcon: {
    [breakpoints.down('sm')]: {
      width: 325,
      height: 187.96,
    },
  },
  smallIcon: {
    [breakpoints.down('sm')]: {
      width: 62.83,
      height: 53.62,
    },
  },
  threeCirclesIcon: {
    [breakpoints.down('sm')]: {
      width: 242.67,
      height: 242.67,
    },
  },
  ourValues: {
    maxWidth: 280,

    [breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& $gradientSubTitle': {
        fontSize: 26,
        lineHeight: '26px',
        marginBottom: 8,
      },

      '& $subTitle': {
        fontSize: 14,
        lineHeight: '18px',
        marginBottom: 60,
      },
    },
  },
  decentralized: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 400,
    position: 'relative',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginBottom: 46,
    },
  },
  keyIcon: {
    position: 'absolute',
    right: -140,
    top: -130,
    width: 112,
    height: 112,

    '& $subTitle': {
      width: 180,
      fontSize: 14,
      lineHeight: '18px',
      marginTop: 21,
    },

    [breakpoints.down('sm')]: {
      position: 'initial',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: 'auto',
      marginBottom: 30,

      '& img': {
        width: 45,
        height: 45,
        marginRight: 15,
      },

      '& $subTitle': {
        marginTop: 0,
        width: 'auto',
      },
    },
  },
  coinIcon: {
    position: 'absolute',
    bottom: -129,
    right: -136,
    width: 112,
    height: 112,

    '& $subTitle': {
      width: 180,
      fontSize: 14,
      lineHeight: '18px',
      marginTop: 21,
    },

    [breakpoints.down('sm')]: {
      position: 'initial',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: 'auto',
      marginBottom: 30,

      '& img': {
        width: 45,
        height: 45,
        marginRight: 15,
      },

      '& $subTitle': {
        marginTop: 0,
        width: 'auto',
      },
    },
  },
  labIcon: {
    position: 'absolute',
    right: -252,
    top: 244,
    width: 112,
    height: 112,

    '& $subTitle': {
      width: 180,
      fontSize: 14,
      lineHeight: '18px',
      marginTop: 21,
    },

    [breakpoints.down('sm')]: {
      position: 'initial',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: 'auto',
      marginBottom: 30,

      '& img': {
        width: 45,
        height: 45,
        marginRight: 15,
      },

      '& $subTitle': {
        marginTop: 0,
        width: 'auto',
      },
    },
  },
  rightTopLine: {
    height: 1,
    width: 180,
    background: 'linear-gradient(#EB4A97 100%, #8C43F6 100%)',
    opacity: 0.3,
    transform: 'rotate(-45deg)',
    right: -69,
    position: 'absolute',
    top: 27,
  },
  rightCenterLine: {
    height: 1,
    width: 140,
    background: 'linear-gradient(#EB4A97 100%, #8C43F6 100%)',
    opacity: 0.3,
    right: -140,
    top: 300,
    position: 'absolute',
  },
  rightBottomLine: {
    height: 1,
    right: -68,
    width: 176,
    bottom: 31,
    background: 'linear-gradient(#EB4A97 100%, #8C43F6 100%)',
    opacity: 0.3,
    transform: 'rotate(45deg)',
    position: 'absolute',
  },
  footer: {
    marginTop: 20,
    width: '100%',
    backgroundImage: `url("${BackgroundBottom}")`,
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 410,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    [breakpoints.down('sm')]: {
      height: 270,
    },
  },
  footerBar: {
    width: '100%',
    paddingTop: 30,
    height: 250,
    borderTop: '1px solid #212121',
    background: 'black',
    position: 'absolute',
    bottom: 0,

    [breakpoints.down('sm')]: {
      padding: '20px 20px',
      height: 125,
    },
  },
  footerBarInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 'none',

    '& $subTitle': {
      fontSize: 12,
      fontWeight: 400,

      [breakpoints.down('sm')]: {
        marginTop: 16,
        marginBottom: 0,
      },
    },
  },
  footerLine: {
    display: 'flex',
    flexDirection: 'column',
    width: 110,

    '&:last-of-type': {
      width: 150,

      [breakpoints.down('sm')]: {
        width: 'auto',
      },
    },

    '& h1': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '20px',
      marginBottom: 10,
      cursor: 'pointer',
    },

    '& p': {
      fontSize: 12,
      lineHeight: '18px',
      marginBottom: 8,
      fontWeight: 400,
      color: '#646464',
      cursor: 'pointer',
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      '& svg': {
        marginRight: 16,
        width: 16,
        height: 16,
        cursor: 'pointer',
      },
    },
  },
  footerLines: {
    display: 'flex',
    flexDirection: 'row',
  },
  consetellation: {
    position: 'absolute',
    left: 20,
    top: 3,

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  consetellationTwo: {
    position: 'absolute',
    left: 0,
    top: 676,
  },
  consetellationThree: {
    position: 'absolute',
    right: 0,
    top: 676,
  },
  consetellationFour: {
    position: 'absolute',
    top: -149,
    left: -222,
  },
  consetellationTen: {
    position: 'absolute',
    top: -230,
    left: -100,
  },
  consetellationEight: {
    position: 'absolute',
    right: 0,
    top: 3700,
  },
  consetellationNine: {
    position: 'absolute',
    left: 0,
    top: 4500,
  },
  hamburgerIcon: {
    cursor: 'pointer',
  },
}));

const LandingPage: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Container className={classes.container}>
            <PremiaLogo />
            {!mobile && (
              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                className={classes.box}
              >
                <Typography className={classes.menuItem}>
                  Explore Premia
                </Typography>
                <Typography className={classes.menuItem}>
                  Architecture
                </Typography>
                <Typography className={classes.menuItem}>Our Values</Typography>
                <TwitterIcon />
                <DiscordIcon />
                <GithubIcon />
                <MediumIcon />
                <Button className={classes.openApp}>Open App</Button>
              </Box>
            )}
            {mobile && <HamburgerIcon className={classes.hamburgerIcon} />}
          </Container>
        </Toolbar>
      </AppBar>
      <Container className={classes.body}>
        {!mobile && <Consetellation className={classes.consetellation} />}
        <Box className={classes.topSection}>
          <Box className={classes.topSectionLeft}>
            <Typography className={classes.gradientTitle}>
              Permissionless options and metavaults
            </Typography>
            <Typography className={classes.subTitle}>
              Premia enables market-sensitive pricing, next generation capital
              efficiency, and fully-featured peer-to-pool trading
            </Typography>
            <Button className={classes.openAppBig}>Open App</Button>
          </Box>
          <Box className={classes.topSectionRight}></Box>
        </Box>
        {!mobile && <ConsetellationTwo className={classes.consetellationTwo} />}
        <Box className={classes.explorePremia}>
          {mobile && <ConsetellationMobileOne />}
          <Typography className={classes.gradientSubTitle}>
            Explore Premia
          </Typography>
          <Typography className={classes.subTitle}>
            A game changing and intuitive take on decentralized options
          </Typography>
          {mobile && <ConsetellationMobileTwo />}
        </Box>
        {!mobile && (
          <ConsetellationThree className={classes.consetellationThree} />
        )}
        <Box className={classes.tradeOptions}>
          <Box className={classes.leftSide}>
            <LandingTradingIcon />
            <Box className={classes.divider}></Box>
            <Typography className={classes.white}>Trade Options</Typography>
            <Typography
              className={cn(classes.subTitle, classes.tradeOptionsSubTitle)}
            >
              Buy and sell options using Premia’s state of the art automated
              peer-to-pool market making algorithm.
            </Typography>
            {mobile && <Box className={classes.rightSideImage}></Box>}
            <Button
              variant='outlined'
              color='primary'
              className={classes.outlinedButton}
            >
              Trade Options
            </Button>
          </Box>
          {!mobile && <Box className={classes.rightSideImage}></Box>}
          {mobile && (
            <ConsetellationMobileThree
              style={{ position: 'absolute', right: -20, bottom: -70 }}
            />
          )}
        </Box>
        <Box className={classes.earnYield}>
          <Box className={classes.leftSide}>
            <LandingYieldIcon />
            <Box className={classes.divider}></Box>
            <Typography className={classes.white}>Earn Yield</Typography>
            <Typography
              className={cn(classes.subTitle, classes.tradeOptionsSubTitle)}
            >
              Earn top of the market yield on your favorite DeFi assets by
              underwriting on-chain options and other baskets of structured
              finance products.
            </Typography>
            {mobile && <Box className={classes.rightSideImage}></Box>}
            <Button
              variant='outlined'
              color='primary'
              className={classes.outlinedButton}
            >
              Earn Yield
            </Button>
          </Box>
          {!mobile && <Box className={classes.rightSideImage}></Box>}
          {mobile && (
            <ConsetellationMobileFour
              style={{ position: 'absolute', left: -20, bottom: -15 }}
            />
          )}
        </Box>
        <Box className={classes.hedgeRisks}>
          <Box className={classes.leftSide}>
            <LandingHedgeIcon />
            <Box className={classes.divider}></Box>
            <Typography className={classes.white}>Hedge Risks</Typography>
            <Typography
              className={cn(classes.subTitle, classes.tradeOptionsSubTitle)}
            >
              Protect your assets against market volatility, insure your gains.
            </Typography>
            {mobile && (
              <Box className={classes.rightSideImage}>
                {!mobile && (
                  <ConsetellationFour className={classes.consetellationFour} />
                )}
              </Box>
            )}
            <Button
              variant='outlined'
              color='primary'
              className={classes.outlinedButton}
            >
              Protect Assets
            </Button>
          </Box>
          {!mobile && (
            <Box className={classes.rightSideImage}>
              <ConsetellationFour className={classes.consetellationFour} />
            </Box>
          )}
        </Box>
      </Container>
      <Box className={classes.learnMore}>
        {!mobile && <ConsetellationSeven />}
        <Container className={classes.body} style={{ zIndex: 3 }}>
          <Box className={classes.learnMoreBar}>
            <Box>
              {!mobile && <MediumIcon />}
              <Typography>Interested in learning more about Premia?</Typography>
            </Box>
            {!mobile && <Button>Learn More</Button>}
            {mobile && <ArrowCircleIcon />}
          </Box>
        </Container>
        {!mobile && <ConsetellationSix />}
      </Box>
      <Container className={classes.body}>
        <Box className={classes.defiNative}>
          {mobile && (
            <ConsetellationMobileFive
              style={{ position: 'absolute', left: -20, top: 14 }}
            />
          )}
          {mobile && (
            <ConsetellationMobileSix
              style={{ position: 'absolute', left: -20, top: 600 }}
            />
          )}
          <Typography className={classes.gradientSubTitle}>
            A defi-native options architecture
          </Typography>
          <Box>
            <Box className={classes.block}>
              <MarketSensitivePricingIcon />
              <Typography variant='h1'>Market Sensitive Pricing</Typography>
              <Typography>
                Our state of the art pricing model ensures fair pricing for
                buyers and sellers based on the market's supply and demand
              </Typography>
            </Box>
            <Box className={classes.block}>
              <CrowdSourcedLearningIcon />
              <Typography variant='h1'>Crowd-Sourced Learning</Typography>
              <Typography>
                We use a continuous on-chain reinforcement learning algorithm to
                converge to the optimal market price and liquidity utilization
                rate.
              </Typography>
            </Box>
            <Box className={classes.block}>
              <CapitalEfficientMarketIcon />
              <Typography variant='h1'>Capital Efficient Markets</Typography>
              <Typography>
                Our highly capital efficient market ensures even less liquid
                tokens converge to a fair market price, requiring the least
                amount of capital.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className={classes.learnMoreBar}
          style={{ marginBottom: !mobile ? 260 : 60 }}
        >
          <Box>
            <Typography>
              Dive into our open collection of decentralized financial research
            </Typography>
          </Box>
          {!mobile && <Button>Our Research</Button>}
          {mobile && <ArrowCircleIcon />}
        </Box>
        {!mobile && (
          <ConsetellationEight className={classes.consetellationEight} />
        )}
        {!mobile && (
          <ConsetellationNine className={classes.consetellationNine} />
        )}
        <Box className={classes.decentralized}>
          {!mobile && (
            <ConsetellationTen className={classes.consetellationTen} />
          )}
          {mobile && (
            <ConsetellationMobileSeven
              style={{ position: 'absolute', left: -20, top: 156 }}
            />
          )}
          <Box className={classes.ourValues}>
            <Typography className={classes.gradientSubTitle}>
              Our Values
            </Typography>
            <Typography className={classes.subTitle}>
              Take part in discourse with a knowledgable and active network of
              individuals. Explore open opportunities to take part in building
              the next generation of decentralized finance
            </Typography>
          </Box>
          <Box className={classes.gridIcon}>
            <GridIcon className={classes.netIcon} />
            <SmallLogoIcon className={classes.smallIcon} />
            <SubtractIcon className={classes.subtractIcon} />
            <ThreeCirclesIcon className={classes.threeCirclesIcon} />
            {!mobile && (
              <>
                <Box className={classes.keyIcon}>
                  <img src={KeyIcon} alt='key' />
                  <Typography className={classes.subTitle}>
                    Enable universal access to best in class, decentralized
                    financial products
                  </Typography>
                </Box>
                <Box className={classes.rightTopLine}></Box>
                <Box className={classes.labIcon}>
                  <img src={LabIcon} alt='lab' />
                  <Typography className={classes.subTitle}>
                    Build the next generation of financial infrastructure with
                    permissionless access to everyone
                  </Typography>
                </Box>
                <Box className={classes.rightCenterLine}></Box>
                <Box className={classes.coinIcon}>
                  <img src={CoinIcon} alt='coin' />
                  <Typography className={classes.subTitle}>
                    Provide open access to state of the art research and
                    innovation in decentralized finance
                  </Typography>
                </Box>
                <Box className={classes.rightBottomLine}></Box>
              </>
            )}
          </Box>
          {mobile && (
            <>
              <Box className={classes.keyIcon}>
                <img src={KeyIcon} alt='key' />
                <Typography className={classes.subTitle}>
                  Enable universal access to best in class, decentralized
                  financial products
                </Typography>
              </Box>
              <Box className={classes.labIcon}>
                <img src={LabIcon} alt='lab' />
                <Typography className={classes.subTitle}>
                  Build the next generation of financial infrastructure with
                  permissionless access to everyone
                </Typography>
              </Box>
              <Box className={classes.coinIcon}>
                <img src={CoinIcon} alt='coin' />
                <Typography className={classes.subTitle}>
                  Provide open access to state of the art research and
                  innovation in decentralized finance
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Box className={classes.learnMoreBar}>
          <Box>
            <Typography>
              Interested in joining the team? Join us in building the future of
              finance.
            </Typography>
          </Box>
          {!mobile && <Button>Careers</Button>}
          {mobile && <ArrowCircleIcon />}
        </Box>
      </Container>
      <Box className={classes.footer}>
        {mobile && (
          <ConsetellationMobileEight
            style={{ position: 'absolute', right: -20, top: 30 }}
          />
        )}
        <Box className={classes.footerBar}>
          <Container className={classes.footerBarInner}>
            <Box>
              <PremiaLogo />
              <Typography className={classes.subTitle}>
                Premia Finance© All Rights Reserved 2021{' '}
              </Typography>
            </Box>
            <Box className={classes.footerLines}>
              {!mobile && (
                <Box className={classes.footerLine}>
                  <Typography variant='h1'>Misc</Typography>
                  <Typography>Contact Us</Typography>
                  <Typography>Careers</Typography>
                  <Typography>Documentation</Typography>
                  <Typography>Bug Bounty</Typography>
                </Box>
              )}
              {!mobile && (
                <Box className={classes.footerLine}>
                  <Typography variant='h1'>Legal</Typography>
                  <Typography>Privacy Policy</Typography>
                  <Typography>Cookie Policy</Typography>
                  <Typography>Risk Policy</Typography>
                  <Typography>Terms of Service</Typography>
                </Box>
              )}
              <Box className={classes.footerLine}>
                {!mobile && <Typography variant='h1'>Social</Typography>}
                <Box>
                  <TwitterIcon />
                  <DiscordIcon />
                  <GithubIcon />
                  <MediumIcon />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Grid>
  );
};

export default LandingPage;
