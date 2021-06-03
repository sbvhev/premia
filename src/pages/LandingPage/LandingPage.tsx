import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
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
import KeyIcon from 'assets/svg/Key.svg';
import CoinIcon from 'assets/svg/Coin.svg';
import LabIcon from 'assets/svg/Lab.svg';
import TradeOptionsImage from 'assets/images/TradeOptions.png';
import VaultsBasicImage from 'assets/images/Vaults.png';
import VaultsProImage from 'assets/images/VaultsPro.png';
import HeroImage from 'assets/images/HeroImage.png';
import BackgroundTop from 'assets/images/BackgroundTop.png';
import BackgroundBottom from 'assets/images/BackgroundBottom.png';

const useStyles = makeStyles(({ palette }) => ({
  container: {
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    cursor: 'pointer',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topSectionRight: {
    width: '50%',
    backgroundImage: `url("${HeroImage}")`,
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  topSectionLeft: {
    width: '50%',
    padding: '160px 0',
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
  },
  body: {
    border: 'none',
  },
  explorePremia: {
    padding: '80px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tradeOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,
  },
  earnYield: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,

    '& $rightSideImage': {
      backgroundImage: `url("${VaultsBasicImage}")`,
    },
  },
  hedgeRisks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,

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
  },
  rightSideImage: {
    width: '45%',
    height: 360,
    backgroundImage: `url("${TradeOptionsImage}")`,
    backgroundSize: 'auto 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  leftSide: {
    position: 'relative',
    width: '45%',
    paddingLeft: 74,

    '& > svg': {
      position: 'absolute',
      top: 40,
      left: 0,
    },

    '& $divider': {
      height: 'calc(100% + 120px)',
      position: 'absolute',
      left: 30,
      top: 100,
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
  },
  learnMoreBar: {
    height: 80,
    maxWidth: 1300,
    width: '100%',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255,255, 255, 0.05)',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,

    '& p': {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '54px',
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
    },
  },
  defiNative: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 196,

    '& > p': {
      marginBottom: 129,
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'row',
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
  },
  subtractIcon: {
    right: 0,
  },
  ourValues: {
    maxWidth: 280,
  },
  decentralized: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 400,
    position: 'relative',
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
  },
  footerBar: {
    width: '100%',
    paddingTop: 30,
    height: 250,
    borderTop: '1px solid #212121',
    background: 'black',
    position: 'absolute',
    bottom: 0,
  },
  footerBarInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 'none',

    '& $subTitle': {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  footerLine: {
    display: 'flex',
    flexDirection: 'column',
    width: 110,

    '&:last-of-type': {
      width: 150,
    },

    '& h1': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '20px',
      marginBottom: 10,
    },

    '& p': {
      fontSize: 12,
      lineHeight: '18px',
      marginBottom: 8,
      fontWeight: 400,
      color: '#646464',
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      '& svg': {
        marginRight: 16,
        width: 16,
        height: 16,
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
}));

const LandingPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Container fixed className={classes.container}>
            <PremiaLogo />
            <Box
              flexDirection='row'
              display='flex'
              alignItems='center'
              className={classes.box}
            >
              <Typography className={classes.menuItem}>
                Explore Premia
              </Typography>
              <Typography className={classes.menuItem}>Architecture</Typography>
              <Typography className={classes.menuItem}>Our Values</Typography>
              <TwitterIcon />
              <DiscordIcon />
              <GithubIcon />
              <MediumIcon />
              <Button className={classes.openApp}>Open App</Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Container fixed className={classes.body}>
        <Consetellation className={classes.consetellation} />
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
        <ConsetellationTwo className={classes.consetellationTwo} />
        <Box className={classes.explorePremia}>
          <Typography className={classes.gradientSubTitle}>
            Explore Premia
          </Typography>
          <Typography className={classes.subTitle}>
            A game changing and intuitive take on decentralized options
          </Typography>
        </Box>
        <ConsetellationThree className={classes.consetellationThree} />
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
            <Button
              variant='outlined'
              color='primary'
              className={classes.outlinedButton}
            >
              Trade Options
            </Button>
          </Box>
          <Box className={classes.rightSideImage}></Box>
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
            <Button
              variant='outlined'
              color='primary'
              className={classes.outlinedButton}
            >
              Earn Yield
            </Button>
          </Box>
          <Box className={classes.rightSideImage}></Box>
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
            <Button
              variant='outlined'
              color='primary'
              className={classes.outlinedButton}
            >
              Protect Assets
            </Button>
          </Box>
          <Box className={classes.rightSideImage}>
            <ConsetellationFour className={classes.consetellationFour} />
          </Box>
        </Box>
      </Container>
      <Box className={classes.learnMore}>
        <ConsetellationSeven />
        <Box className={classes.learnMoreBar}>
          <Box>
            <MediumIcon />
            <Typography>Interested in learning more about Premia?</Typography>
          </Box>
          <Button>Learn More</Button>
        </Box>
        <ConsetellationSix />
      </Box>
      <Container fixed className={classes.body}>
        <Box className={classes.defiNative}>
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
        <Box className={classes.learnMoreBar} style={{ marginBottom: 260 }}>
          <Box>
            <Typography>
              Dive into our open collection of decentralized financial research
            </Typography>
          </Box>
          <Button>Our Research</Button>
        </Box>
        <ConsetellationEight className={classes.consetellationEight} />
        <ConsetellationNine className={classes.consetellationNine} />
        <Box className={classes.decentralized}>
          <ConsetellationTen className={classes.consetellationTen} />
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
            <GridIcon />
            <SmallLogoIcon />
            <SubtractIcon className={classes.subtractIcon} />
            <ThreeCirclesIcon />
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
                Provide open access to state of the art research and innovation
                in decentralized finance
              </Typography>
            </Box>
            <Box className={classes.rightBottomLine}></Box>
          </Box>
        </Box>
        <Box className={classes.learnMoreBar}>
          <Box>
            <Typography>
              Interested in joining the team? Join us in building the future of
              finance.
            </Typography>
          </Box>
          <Button>Careers</Button>
        </Box>
      </Container>
      <Box className={classes.footer}>
        <Box className={classes.footerBar}>
          <Container fixed className={classes.footerBarInner}>
            <Box>
              <PremiaLogo />
              <Typography className={classes.subTitle}>
                Premia Finance© All Rights Reserved 2021{' '}
              </Typography>
            </Box>
            <Box className={classes.footerLines}>
              <Box className={classes.footerLine}>
                <Typography variant='h1'>Misc</Typography>
                <Typography>Contact Us</Typography>
                <Typography>Careers</Typography>
                <Typography>Documentation</Typography>
                <Typography>Bug Bounty</Typography>
              </Box>
              <Box className={classes.footerLine}>
                <Typography variant='h1'>Legal</Typography>
                <Typography>Privacy Policy</Typography>
                <Typography>Cookie Policy</Typography>
                <Typography>Risk Policy</Typography>
                <Typography>Terms of Service</Typography>
              </Box>
              <Box className={classes.footerLine}>
                <Typography variant='h1'>Social</Typography>
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
