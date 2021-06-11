import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ScrollAnimation from 'react-animate-on-scroll';
import { Parallax } from 'react-scroll-parallax';
import cn from 'classnames';
import { throttle } from 'lodash';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as PremiaLogo } from 'assets/svg/NewLogoComboDark.svg';
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
import TradeOptionsSVGBackground from 'assets/images/TradeOptions.svg';
import VaultsBasicSVGBackground from 'assets/images/VaultBasic.svg';
import VaultsProSVGBackground from 'assets/images/VaultPro.svg';
import BackgroundTop from 'assets/images/BackgroundTop.png';
import BackgroundBottom from 'assets/images/BackgroundBottom.png';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  mainContainer: {
    '& a': {
      transition: 'all 0.3s',
      display: 'flex',
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'none',
        opacity: 1,

        '& p': {
          opacity: 1,
          color: 'white',
        },

        '& svg': {
          opacity: 1,

          '& path': {
            fill: 'white',
          },
        },
      },

      '&:active': {
        opacity: 1,

        '& p': {
          opacity: 1,
          color: 'rgba(255, 255, 255, 0.8)',
        },

        '& svg': {
          opacity: 1,

          '& path': {
            fill: 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
    },

    '& figure': {
      margin: 'auto 0',
    },
  },
  container: {
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    [breakpoints.down('md')]: {
      padding: 0,
    },
  },

  box: {
    '& svg': {
      margin: 0,

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
    border: '1px solid #5294FF',

    '&:hover': {
      color: '#5294FF',
      borderColor: '#5294FF',
      background: 'transparent',
    },
  },
  appBar: {
    background: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(8px)',
    top: 0,
    position: 'fixed',
    width: '100%',
    boxShadow: '2px 5px 4px rgba(0, 0, 0, 0.25)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.13)',
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

    '&$selected': {
      color: '#5294FF',
      position: 'relative',

      '&:after': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: 2,
        background: '#5294FF',
        left: 0,
        bottom: -24,
      },
    },
  },
  selected: {},
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'relative',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  topSectionRight: {
    '& iframe': {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      border: 'none',
    },

    [breakpoints.down('sm')]: {
      width: '100%',
      position: 'relative',
      height: 260,
      top: 0,
      left: 0,
      opacity: 0.6,
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
    fontSize: 53,
    lineHeight: '51px',
    fontWeight: 700,
    background:
      '-webkit-linear-gradient(-61deg, #FFFFFF 0%, #5294FF 59%, #EB4A97 130%)',
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
    marginBottom: 50,

    [breakpoints.down('sm')]: {
      marginBottom: 11,
    },
  },
  openAppBig: {
    color: '#000000',
    fontSize: 16,
    lineHeight: '18px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    padding: '16px 55px',
    borderRadius: 12,
    border: '1px solid #5294FF',
    width: 'auto',

    '&:hover': {
      color: '#5294FF',
      borderColor: '#5294FF',
      background: 'transparent',
    },

    [breakpoints.down('sm')]: {
      width: 140,
      height: 40,
      fontSize: 16,
      lineHeight: '18px',
    },
  },
  body: {
    paddingTop: 56,
    border: 'none',

    [breakpoints.down('sm')]: {
      padding: '56px 20px 0 20px',
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
  },
  tradeOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,
    position: 'relative',

    '& $rightSideImage': {
      backgroundImage: `url("${TradeOptionsSVGBackground}")`,
    },

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
      backgroundImage: `url("${VaultsBasicSVGBackground}")`,
    },

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  hedgeRisks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,

    '& $rightSideImage': {
      backgroundImage: `url("${VaultsProSVGBackground}")`,
    },

    [breakpoints.down('sm')]: {
      marginBottom: 0,
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

    [breakpoints.down('sm')]: {
      marginBottom: 0,
      fontSize: 12,
      lineHeight: '16px',
      position: 'relative',
      top: -20,
    },
  },
  white: {
    fontSize: 42,
    fontWeight: 500,
    lineHeight: '54px',
    marginBottom: 9,
    color: 'white',
    marginTop: 90,

    [breakpoints.down('sm')]: {
      fontSize: 22,
      lineHeight: '54px',
      marginTop: 33,
    },
  },
  rightSideImage: {
    width: '100%',
    height: 450,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    right: 0,
    transition: 'all 1s ease',

    '& svg:first-of-type': {
      zIndex: 300000,
    },

    [breakpoints.down('sm')]: {
      width: '100%',
      height: 300,
      marginTop: 40,
      position: 'relative',
      right: 0,
      backgroundPosition: 'center',

      '& svg': {
        width: '100%',
        height: '100%',
      },
    },
  },
  leftSide: {
    position: 'relative',
    width: '45%',
    paddingLeft: 74,
    height: 450,

    '& > svg': {
      position: 'absolute',
      top: 90,
      left: 0,

      [breakpoints.down('sm')]: {
        width: 40,
        height: 40,
        top: 40,
      },
    },

    '& > button': {
      [breakpoints.down('sm')]: {
        margin: 'auto',
        marginTop: 40,
      },
    },

    '& $divider': {
      height: 'calc(100% + 120px)',
      position: 'absolute',
      left: 30,
      top: 150,

      [breakpoints.down('sm')]: {
        left: 20,
        top: 80,
        height: 'calc(100% - 40px)',
      },
    },

    [breakpoints.down('sm')]: {
      width: '100%',
      paddingLeft: 56,
      paddingRight: 40,
      height: 570,
      display: 'flex',
      flexDirection: 'column',
    },
  },
  outlinedButton: {
    marginBottom: 60,
    borderRadius: 12,
    border: '1px solid #5294FF',
    padding: '10px 30px',
    width: 200,
    height: 45,
    fontSize: 16,
    lineHeight: '18px',
    fontWeight: 700,
    background: 'transparent',

    '&:hover': {
      border: '1px solid #5294FF',
      background: '#5294FF',
      color: 'black',
    },

    '&:active': {
      color: 'black',
      background: '#5294FF',
    },
  },
  divider: {
    borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
  },
  learnMore: {
    width: '100%',
    backgroundImage: `url("${BackgroundTop}")`,
    backgroundSize: '100% auto',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    height: 440,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    '& figure': {
      '&:first-of-type': {
        '& svg': {
          position: 'absolute',
          left: 0,
          top: -50,
        },
      },

      '&:last-of-type': {
        '& svg': {
          position: 'absolute',
          right: 0,
          bottom: -200,
        },
      },
    },

    [breakpoints.down('sm')]: {
      top: -80,
      height: 100,

      '& > div': {
        position: 'absolute',
        top: 75,
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
      border: '1px solid #5294FF',

      '&:hover': {
        color: '#5294FF',
        borderColor: '#5294FF',
        background: 'transparent',
      },
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
    zIndex: 100000,

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
    marginBottom: 380,
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
      width: 210,
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
      width: 210,
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
      width: 210,
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
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    height: 440,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    [breakpoints.down('sm')]: {
      height: 270,
      marginTop: -20,
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

    [breakpoints.down('md')]: {
      marginTop: 25,
    },
  },
  consetellation: {
    position: 'absolute',
    left: 20,
    top: 3,

    [breakpoints.between('md', 'lg')]: {
      left: -60,
    },

    [breakpoints.down('md')]: {
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
    marginRight: 0,
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
  closeIcon: {
    cursor: 'pointer',

    '& path': {
      fill: '#646464',
    },
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 12,

    '& svg': {
      margin: 'auto 8px',
    },
  },
  stickyImages: {
    position: 'absolute',
    width: '55%',
    top: 0,
    right: 0,
    height: '100%',

    '& > div': {
      position: 'sticky',
      height: 'calc(100vh - 400px)',
      top: 150,
      bottom: 250,
      left: 0,
    },

    '& $rightSideImage': {
      '&:first-of-type': {
        backgroundImage: `url("${TradeOptionsSVGBackground}")`,
      },

      '&:nth-of-type(2)': {
        backgroundImage: `url("${VaultsBasicSVGBackground}")`,
      },

      '&:last-of-type': {
        backgroundImage: `url("${VaultsProSVGBackground}")`,
      },
    },
  },
  mobileMenu: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    background: 'black',
    width: '100%',
    position: 'fixed',
    top: 56,
    zIndex: 60000,
    borderTop: '1px solid #212121',

    '& > div': {
      '&:first-of-type': {
        padding: '12px 20px',
        borderBottom: '1px solid #212121',

        '& button': {
          width: '100%',
          height: 40,
        },
      },

      '&:nth-of-type(2)': {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #212121',
        padding: '12px 20px',

        '& p': {
          margin: 0,
          paddingTop: 12,
          paddingBottom: 12,
        },
      },

      '&:last-of-type': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #212121',
        padding: '16px 0',

        '& svg': {
          margin: '0 20px',
        },
      },
    },
  },
  sectionImages: {
    position: 'relative',
  },
}));

const LandingPage: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [currentNav, setCurrentNav] = useState('');
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const preventDefault = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [mobile]);

  const listener = (e: any) => {
    if (window.scrollY > 400 && window.scrollY < 2000) {
      setCurrentNav('Explore Premia');
    } else if (window.scrollY > 2700 && window.scrollY < 3100) {
      setCurrentNav('Architecture');
    } else if (window.scrollY > 3600 && window.scrollY < 4300) {
      setCurrentNav('Our Values');
    } else {
      setCurrentNav('');
    }
    setScrollPos(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(listener, 100));
    return () => {
      window.removeEventListener('scroll', throttle(listener, 100));
    };
  });

  return (
    <Grid container className={classes.mainContainer}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Container className={classes.container}>
            <AnchorLink href='#hero' onClick={preventDefault}>
              <PremiaLogo />
            </AnchorLink>

            {!mobile && (
              <Box
                flexDirection='row'
                display='flex'
                alignItems='center'
                className={classes.box}
              >
                <AnchorLink
                  href='#explore-premia'
                  offset='100'
                  onClick={preventDefault}
                >
                  <Typography
                    className={cn(
                      currentNav === 'Explore Premia' ? classes.selected : '',
                      classes.menuItem,
                    )}
                  >
                    Explore Premia
                  </Typography>
                </AnchorLink>
                <AnchorLink
                  offset='100'
                  href='#definative-architecture'
                  onClick={preventDefault}
                >
                  <Typography
                    className={cn(
                      currentNav === 'Architecture' ? classes.selected : '',
                      classes.menuItem,
                    )}
                  >
                    Architecture
                  </Typography>
                </AnchorLink>
                <AnchorLink
                  href='#our-values'
                  offset='200'
                  onClick={preventDefault}
                >
                  <Typography
                    className={cn(
                      currentNav === 'Our Values' ? classes.selected : '',
                      classes.menuItem,
                    )}
                  >
                    Our Values
                  </Typography>
                </AnchorLink>
                <Box className={classes.headerIcons}>
                  <AnchorLink
                    href='https://twitter.com/PremiaFinance'
                    onClick={preventDefault}
                  >
                    <TwitterIcon />
                  </AnchorLink>
                  <AnchorLink
                    href='https://discord.com/invite/6MhRmzmdHN'
                    onClick={preventDefault}
                  >
                    <DiscordIcon />
                  </AnchorLink>
                  <AnchorLink
                    href='https://github.com/PremiaFinance'
                    onClick={preventDefault}
                  >
                    <GithubIcon />
                  </AnchorLink>
                  <AnchorLink
                    href='https://premia.medium.com/'
                    onClick={preventDefault}
                  >
                    <MediumIcon />
                  </AnchorLink>
                </Box>
                <Button
                  className={classes.openApp}
                  onClick={() =>
                    window.open('https://v1.premia.finance', '_blank')
                  }
                >
                  Open App
                </Button>
              </Box>
            )}
            {mobile && !menuOpen && (
              <HamburgerIcon
                className={classes.hamburgerIcon}
                onClick={() => setMenuOpen(true)}
              />
            )}
            {mobile && menuOpen && (
              <CloseIcon
                className={classes.closeIcon}
                onClick={() => setMenuOpen(false)}
              />
            )}
          </Container>
        </Toolbar>
      </AppBar>
      {menuOpen && mobile && (
        <Box className={classes.mobileMenu}>
          <Box>
            <Button
              className={classes.openApp}
              onClick={() => window.open('https://v1.premia.finance', '_blank')}
            >
              Open App
            </Button>
          </Box>
          <Box>
            <AnchorLink
              href='#explore-premia'
              offset='100'
              onClick={preventDefault}
            >
              <Typography className={classes.menuItem}>
                Explore Premia
              </Typography>
            </AnchorLink>
            <AnchorLink
              href='#definative-architecture'
              offset='100'
              onClick={preventDefault}
            >
              <Typography className={classes.menuItem}>Architecture</Typography>
            </AnchorLink>
            <AnchorLink
              href='#our-values'
              offset='300'
              onClick={preventDefault}
            >
              <Typography className={classes.menuItem}>Our Values</Typography>
            </AnchorLink>
          </Box>
          <Box>
            <AnchorLink
              href='https://twitter.com/PremiaFinance'
              onClick={preventDefault}
            >
              <TwitterIcon />
            </AnchorLink>
            <AnchorLink
              href='https://discord.com/invite/6MhRmzmdHN'
              onClick={preventDefault}
            >
              <DiscordIcon />
            </AnchorLink>
            <AnchorLink
              href='https://github.com/PremiaFinance'
              onClick={preventDefault}
            >
              <GithubIcon />
            </AnchorLink>
            <AnchorLink
              href='https://premia.medium.com/'
              onClick={preventDefault}
            >
              <MediumIcon />
            </AnchorLink>
          </Box>
        </Box>
      )}
      <Container className={classes.body}>
        {!mobile && (
          <Parallax
            className={classes.consetellation}
            y={[0, 0]}
            x={[-30, 30]}
            tagOuter='figure'
          >
            <Consetellation />
          </Parallax>
        )}
        <Box className={classes.topSection} id='hero'>
          <Box className={classes.topSectionLeft}>
            <Typography className={classes.gradientTitle}>
              Next-generation options and metavaults
            </Typography>
            <Typography className={classes.subTitle}>
              Premia's automated options market enables best-in-class pricing
              based on realtime supply and demand, bringing fully-featured
              peer-to-pool trading and capital efficiency to DeFi options.
            </Typography>
            <Button
              className={classes.openAppBig}
              onClick={() => window.open('https://v1.premia.finance', '_blank')}
            >
              Open App
            </Button>
          </Box>
          <Box className={classes.topSectionRight}>
            <iframe src='./iframe.html' title='top right image'></iframe>
          </Box>
        </Box>
        {!mobile && (
          <Parallax
            className={classes.consetellationTwo}
            y={[-50, 50]}
            x={[0, 0]}
            tagOuter='figure'
          >
            <ConsetellationTwo />
          </Parallax>
        )}
        <ScrollAnimation
          delay={1}
          duration={1}
          animateOnce={true}
          animateIn='fadeIn'
        >
          <Box className={classes.explorePremia} id='explore-premia'>
            {mobile && (
              <Parallax
                y={[-30, 30]}
                x={[0, 0]}
                tagOuter='figure'
                styleOuter={{ left: -20, top: 0, position: 'absolute' }}
              >
                <ConsetellationMobileOne />
              </Parallax>
            )}
            <Typography className={classes.gradientSubTitle}>
              Explore Premia
            </Typography>
            <Typography className={classes.subTitle}>
              A game changing and intuitive take on decentralized options
            </Typography>
            {mobile && (
              <Parallax
                y={[-30, 30]}
                x={[0, 0]}
                tagOuter='figure'
                styleOuter={{ position: 'absolute', right: -20, bottom: -60 }}
              >
                <ConsetellationMobileTwo />
              </Parallax>
            )}
          </Box>
        </ScrollAnimation>
        {!mobile && (
          <Parallax
            className={classes.consetellationThree}
            y={[-50, 50]}
            x={[0, 0]}
            tagOuter='figure'
          >
            <ConsetellationThree />
          </Parallax>
        )}
        <Box className={classes.sectionImages}>
          <ScrollAnimation
            duration={1}
            offset={100}
            animateOnce={true}
            animateIn='fadeIn'
          >
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
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  Trade Options
                </Button>
              </Box>
              {mobile && (
                <Parallax
                  y={[-30, 30]}
                  x={[0, 0]}
                  tagOuter='figure'
                  styleOuter={{ position: 'absolute', right: -20, bottom: -70 }}
                >
                  <ConsetellationMobileThree />
                </Parallax>
              )}
            </Box>
          </ScrollAnimation>
          <ScrollAnimation
            duration={1}
            offset={100}
            animateOnce={true}
            animateIn='fadeIn'
          >
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
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  Earn Yield
                </Button>
              </Box>
              {mobile && (
                <Parallax
                  y={[-50, 50]}
                  x={[0, 0]}
                  tagOuter='figure'
                  styleOuter={{ position: 'absolute', left: -20, bottom: -15 }}
                >
                  <ConsetellationMobileFour />
                </Parallax>
              )}
            </Box>
          </ScrollAnimation>
          <ScrollAnimation
            duration={1}
            offset={100}
            animateOnce={true}
            animateIn='fadeIn'
          >
            <Box className={classes.hedgeRisks}>
              <Box className={classes.leftSide}>
                <LandingHedgeIcon />
                <Box className={classes.divider}></Box>
                <Typography className={classes.white}>Hedge Risks</Typography>
                <Typography
                  className={cn(classes.subTitle, classes.tradeOptionsSubTitle)}
                >
                  Protect your assets against market volatility, insure your
                  gains.
                </Typography>
                {mobile && (
                  <Box className={classes.rightSideImage}>
                    {!mobile && (
                      <Parallax
                        className={classes.consetellationFour}
                        y={[-50, 50]}
                        x={[0, 0]}
                        tagOuter='figure'
                      >
                        <ConsetellationFour />
                      </Parallax>
                    )}
                  </Box>
                )}
                <Button
                  variant='outlined'
                  color='primary'
                  className={classes.outlinedButton}
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  Protect Assets
                </Button>
              </Box>
            </Box>
          </ScrollAnimation>
          {!mobile && (
            <Box className={classes.stickyImages}>
              <Box>
                <Box
                  style={{
                    height: '100vh',
                    position: 'relative',
                  }}
                >
                  <Box
                    className={classes.rightSideImage}
                    onClick={() => {
                      history.push('/');
                    }}
                    style={{ opacity: scrollPos > 200 ? 1 : 0 }}
                  ></Box>
                  <Box
                    className={classes.rightSideImage}
                    onClick={() => {
                      history.push('/');
                    }}
                    style={{ opacity: scrollPos > 900 ? 1 : 0 }}
                  ></Box>
                  <Box
                    className={classes.rightSideImage}
                    onClick={() => {
                      history.push('/');
                    }}
                    style={{ opacity: scrollPos > 1600 ? 1 : 0 }}
                  ></Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
      <Box className={classes.learnMore} id='learn-more'>
        {!mobile && (
          <Parallax y={[-50, 50]} x={[0, 0]} tagOuter='figure'>
            <ConsetellationSeven />
          </Parallax>
        )}
        <Container className={classes.body} style={{ zIndex: 3 }}>
          <Box className={classes.learnMoreBar}>
            <Box>
              {!mobile && <MediumIcon />}
              <Typography>Interested in learning more about Premia?</Typography>
            </Box>
            {!mobile && (
              <Button
                onClick={() =>
                  window.open('https://premia.medium.com', '_blank')
                }
              >
                Learn More
              </Button>
            )}
            {mobile && (
              <ArrowCircleIcon
                onClick={() =>
                  window.open('https://premia.medium.com', '_blank')
                }
              />
            )}
          </Box>
        </Container>
        {!mobile && (
          <Parallax y={[-50, 50]} x={[0, 0]} tagOuter='figure'>
            <ConsetellationSix />
          </Parallax>
        )}
      </Box>
      <Container className={classes.body} id='definative-architecture'>
        <ScrollAnimation
          delay={1}
          duration={1}
          animateOnce={true}
          animateIn='fadeIn'
        >
          <Box className={classes.defiNative}>
            {mobile && (
              <Parallax
                y={[-50, 50]}
                x={[0, 0]}
                tagOuter='figure'
                styleOuter={{ position: 'absolute', left: -20, top: 14 }}
              >
                <ConsetellationMobileFive />
              </Parallax>
            )}
            {mobile && (
              <Parallax
                y={[-50, 50]}
                x={[0, 0]}
                tagOuter='figure'
                styleOuter={{ position: 'absolute', left: -20, top: 600 }}
              >
                <ConsetellationMobileSix />
              </Parallax>
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
                  We use a continuous on-chain reinforcement learning algorithm
                  to converge to the optimal market price and liquidity
                  utilization rate.
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
        </ScrollAnimation>
        <Box
          className={classes.learnMoreBar}
          style={{ marginBottom: !mobile ? 260 : 60 }}
        >
          <Box>
            <Typography>Explore our platform documentation</Typography>
          </Box>
          {!mobile && (
            <Button
              onClick={() =>
                window.open('https://docs.premia.finance', '_blank')
              }
            >
              Our Documentation
            </Button>
          )}
          {mobile && (
            <ArrowCircleIcon
              onClick={() =>
                window.open('https://docs.premia.finance', '_blank')
              }
            />
          )}
        </Box>
        {!mobile && (
          <Parallax
            className={classes.consetellationEight}
            y={[-50, 50]}
            x={[0, 0]}
            tagOuter='figure'
          >
            <ConsetellationEight />
          </Parallax>
        )}
        {!mobile && (
          <Parallax
            className={classes.consetellationNine}
            y={[-50, 50]}
            x={[0, 0]}
            tagOuter='figure'
          >
            <ConsetellationNine />
          </Parallax>
        )}
        <ScrollAnimation
          delay={1}
          duration={1}
          animateOnce={true}
          animateIn='fadeIn'
        >
          <Box className={classes.decentralized} id='our-values'>
            {!mobile && (
              <Parallax
                className={classes.consetellationTen}
                y={[-50, 50]}
                x={[0, 0]}
                tagOuter='figure'
              >
                <ConsetellationTen />
              </Parallax>
            )}
            {mobile && (
              <Parallax
                className={classes.consetellationTen}
                y={[-50, 50]}
                x={[0, 0]}
                tagOuter='figure'
                styleOuter={{ position: 'absolute', left: -20, top: 156 }}
              >
                <ConsetellationMobileSeven />
              </Parallax>
            )}
            <Box className={classes.ourValues}>
              <Typography className={classes.gradientSubTitle}>
                Our Values
              </Typography>
              <Typography className={classes.subTitle}>
                Explore open opportunities to take part in building the next
                generation of decentralized finance
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
        </ScrollAnimation>
        <Box className={classes.learnMoreBar}>
          <Box>
            <Typography>
              Interested in joining the team? Join us in building the future of
              finance.
            </Typography>
          </Box>
          {!mobile && (
            <Button
              onClick={() =>
                window.open('https://careers.premia.com', '_blank')
              }
            >
              Careers
            </Button>
          )}
          {mobile && (
            <ArrowCircleIcon
              onClick={() =>
                window.open('https://careers.premia.com', '_blank')
              }
            />
          )}
        </Box>
      </Container>
      <Box className={classes.footer}>
        {mobile && (
          <ConsetellationMobileEight
            style={{ position: 'absolute', right: 0, top: 30 }}
          />
        )}
        <Box className={classes.footerBar}>
          <Container className={classes.footerBarInner}>
            <Box>
              <AnchorLink href='#hero' onClick={preventDefault}>
                <PremiaLogo />
              </AnchorLink>
              <Box className={classes.footerLines}>
                {mobile && (
                  <Box className={classes.footerLine}>
                    <AnchorLink
                      href='mailto:dev@premia.finance'
                      onClick={preventDefault}
                    >
                      <Typography variant='h1'>Misc</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='mailto:dev@premia.finance'
                      onClick={preventDefault}
                    >
                      <Typography>Contact Us</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='mailto:careers@premia.finance'
                      onClick={preventDefault}
                    >
                      <Typography>Careers</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='https://docs.premia.finance/'
                      onClick={preventDefault}
                    >
                      <Typography>Documentation</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='mailto:dev@premia.finance'
                      onClick={preventDefault}
                    >
                      <Typography>Bug Bounty</Typography>
                    </AnchorLink>
                  </Box>
                )}
                {mobile && (
                  <Box className={classes.footerLine}>
                    <AnchorLink href='#' onClick={preventDefault}>
                      <Typography variant='h1'>Legal</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='https://files.premia.finance/$/Sfhhw'
                      onClick={preventDefault}
                    >
                      <Typography>Privacy Policy</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='https://files.premia.finance/$/a4dmU'
                      onClick={preventDefault}
                    >
                      <Typography>Cookie Policy</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='https://files.premia.finance/$/hijbM'
                      onClick={preventDefault}
                    >
                      <Typography>Risk Policy</Typography>
                    </AnchorLink>
                    <AnchorLink
                      href='https://files.premia.finance/$/SNZrK'
                      onClick={preventDefault}
                    >
                      <Typography>Terms of Service</Typography>
                    </AnchorLink>
                  </Box>
                )}
                <Box className={classes.footerLine}>
                  {mobile && <Typography variant='h1'>Social</Typography>}
                  {mobile && (
                    <Box>
                      <AnchorLink
                        href='https://twitter.com/PremiaFinance'
                        onClick={preventDefault}
                      >
                        <TwitterIcon />
                      </AnchorLink>
                      <AnchorLink
                        href='https://discord.com/invite/6MhRmzmdHN'
                        onClick={preventDefault}
                      >
                        <DiscordIcon />
                      </AnchorLink>
                      <AnchorLink
                        href='https://github.com/PremiaFinance'
                        onClick={preventDefault}
                      >
                        <GithubIcon />
                      </AnchorLink>
                      <AnchorLink
                        href='https://premia.medium.com/'
                        onClick={preventDefault}
                      >
                        <MediumIcon />
                      </AnchorLink>
                    </Box>
                  )}
                </Box>
              </Box>
              <Typography className={classes.subTitle}>
                Premia Finance© All Rights Reserved 2021{' '}
              </Typography>
            </Box>
            <Box className={classes.footerLines}>
              {!mobile && (
                <Box className={classes.footerLine}>
                  <AnchorLink
                    href='mailto:dev@premia.finance'
                    onClick={preventDefault}
                  >
                    <Typography variant='h1'>Misc</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='mailto:dev@premia.finance'
                    onClick={preventDefault}
                  >
                    <Typography>Contact Us</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='mailto:careers@premia.finance'
                    onClick={preventDefault}
                  >
                    <Typography>Careers</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='https://docs.premia.finance/'
                    onClick={preventDefault}
                  >
                    <Typography>Documentation</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='mailto:dev@premia.finance'
                    onClick={preventDefault}
                  >
                    <Typography>Bug Bounty</Typography>
                  </AnchorLink>
                </Box>
              )}
              {!mobile && (
                <Box className={classes.footerLine}>
                  <AnchorLink href='#' onClick={preventDefault}>
                    <Typography variant='h1'>Legal</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='https://files.premia.finance/$/Sfhhw'
                    onClick={preventDefault}
                  >
                    <Typography>Privacy Policy</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='https://files.premia.finance/$/a4dmU'
                    onClick={preventDefault}
                  >
                    <Typography>Cookie Policy</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='https://files.premia.finance/$/hijbM'
                    onClick={preventDefault}
                  >
                    <Typography>Risk Policy</Typography>
                  </AnchorLink>
                  <AnchorLink
                    href='https://files.premia.finance/$/SNZrK'
                    onClick={preventDefault}
                  >
                    <Typography>Terms of Service</Typography>
                  </AnchorLink>
                </Box>
              )}
              <Box className={classes.footerLine}>
                {!mobile && <Typography variant='h1'>Social</Typography>}
                {!mobile && (
                  <Box>
                    <AnchorLink
                      href='https://twitter.com/PremiaFinance'
                      onClick={preventDefault}
                    >
                      <TwitterIcon />
                    </AnchorLink>
                    <AnchorLink
                      href='https://discord.com/invite/6MhRmzmdHN'
                      onClick={preventDefault}
                    >
                      <DiscordIcon />
                    </AnchorLink>
                    <AnchorLink
                      href='https://github.com/PremiaFinance'
                      onClick={preventDefault}
                    >
                      <GithubIcon />
                    </AnchorLink>
                    <AnchorLink
                      href='https://premia.medium.com/'
                      onClick={preventDefault}
                    >
                      <MediumIcon />
                    </AnchorLink>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Grid>
  );
};

export default LandingPage;
