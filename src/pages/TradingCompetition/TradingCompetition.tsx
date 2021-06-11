import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Container,
  Divider,
  Typography,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import { useDarkModeManager } from 'state/user/hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { EligibleTradingModal, InEligibleTradingModal, ClaimTokensModal } from 'components';
import TradingCompetitionBanner from 'assets/images/TradingCompetitionBanner.png';
import PrizeFirst from 'assets/svg/PrizeFirst.svg';
import PrizeSecond from 'assets/svg/PrizeSecond.svg';
import PrizeThird from 'assets/svg/PrizeThird.svg';
import { ReactComponent as TwitterIcon } from 'assets/svg/TwitterIcon.svg';
import { ReactComponent as TelegramIcon } from 'assets/svg/Telegram.svg';
import { ReactComponent as FacebookIcon } from 'assets/svg/Facebook.svg';
import { ReactComponent as DiscordIcon } from 'assets/svg/DiscordIcon.svg';
import { ReactComponent as SocialIcon1 } from 'assets/svg/SocialIcon1.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  title: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '23px',
  },
  competitionContainer: {
    marginTop: (props: any) => props.mobile ? 19 : 29,
    marginBottom: 50,
  },
  competitionContent: {
    borderRadius: 12,
    '& img': {
      width: '100%',
    },
    '& > div': {
      padding: (props: any) => props.mobile ? '18px 7px 21px 12px' : '31px 29px 22px 26px',
      '& h3': {
        color: palette.text.primary,
        fontSize: 18,
        lineHeight: 1,
        fontWeight: 'bold',
        marginBottom: 6
      },
      '& p, & ol li': {
        fontSize: 14,
        lineHeight: '24px',
        fontWeight: 500,
        color: palette.text.secondary
      },
      '& ol': {
        padding: '0 0 0 14px',
        margin: 0
      }
    }
  },
  competitionButtons: {
    '& button': {
      width: '100%',
      height: 45,
      marginBottom: 11,
    }
  },
  competitionPrize: {
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      padding: (props: any) => props.mobile ? '14px 10px' : '17px 12px',
      '&:first-child': {
        padding: (props: any) => props.mobile ? '19px 11px' : '24px 19px',
        justifyContent: 'space-between',
      },
      '& h3': {
        margin: 0,
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 1,
        color: palette.text.primary
      },
      '& a': {
        color: palette.text.secondary,
        fontSize: 14,
        lineHeight: '18px',
      },
      '& p': {
        fontSize: 14,
        lineHeight: '18px',
      },
      '& > p': {
        marginLeft: 17,
        color: palette.text.primary
      },
      '& > div': {
        width: 51,
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '& > div': {
          position: 'absolute',
          top: 0,
          left: 0, 
          borderRadius: 8,
        },
        '& p': {
          marginLeft: 4,
        }
      },
      '&:nth-of-type(2)': {
        '& > div': {
          '& > div': {
            background: 'linear-gradient(115.58deg, #FFA15E 8.45%, #EFFF8E 101.04%)',
            opacity: (props: any) => props.dark ? 0.1 : 0.2,
          },
          '& p': {
            background: 'linear-gradient(115.58deg, #FF5E5E 8.45%, #FFED8E 101.04%)',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
          }
        }
      },
      '&:nth-of-type(3)': {
        '& > div': {
          '& > div': {
            background: 'linear-gradient(115.58deg, #DEDEDE 8.45%, #CCCCCC 101.04%)',
            opacity: (props: any) => props.dark ? 0.1 : 0.3,
          },
          '& p': {
            background: 'linear-gradient(115.58deg, #858585 8.45%, #E6E6E6 101.04%)',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
          }
        }
      },
      '&:nth-of-type(4)': {
        '& > div': {
          '& > div': {
            background: 'linear-gradient(115.58deg, rgba(196, 111, 85, 0.1) 8.45%, rgba(153, 52, 52, 0.1) 101.04%)'
          },
          '& p': {
            background: 'linear-gradient(115.58deg, #C46F55 8.45%, #993434 101.04%)',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
          }
        }
      }
    },
  },
  socialContainer: {
    marginTop: 19,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '24px',
      color: palette.text.primary
    },
    '& > div': {
      marginTop: 6,
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
        '&:last-child': {
          marginRight: 0
        },
        '& svg path': {
          fill: palette.text.secondary
        },
        '&:hover, &:active': {
          '& svg path': {
            fill: palette.text.primary
          },
        },
      }
    }
  }
}));

const TradingCompetition: React.FC = () => {
  const [darkMode] = useDarkModeManager();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ darkMode, mobile });
  const [ claimTokensModalOpen, setClaimTokensModalOpen ] = useState(false);
  const [ eligibleTradingModalOpen, setEligibleTradingModalOpen ] = useState(false);
  const [ inEligibleTradingModalOpen, setInEligibleTradingModalOpen ] = useState(false);

  return (
    <>
      <ClaimTokensModal
        open={claimTokensModalOpen}
        onClose={() => {
          setClaimTokensModalOpen(false)
        }}
      />
      <EligibleTradingModal
        open={eligibleTradingModalOpen}
        showClaimToken={() => {
          setClaimTokensModalOpen(true)
          setEligibleTradingModalOpen(false)
        }}
        onClose={() => {
          setEligibleTradingModalOpen(false)
        }}
      />
      <InEligibleTradingModal
        open={inEligibleTradingModalOpen}
        onClose={() => {
          setInEligibleTradingModalOpen(false)
        }}
      />
      <Typography
        component='h1'
        color='textPrimary'
        className={classes.title}
      >
        Premia trading competition
      </Typography>
      <Grid container className={classes.competitionContainer} spacing={3}>
        <Grid item sm={8}>
          <Container fixed className={classes.competitionContent}>
            <img src={TradingCompetitionBanner} alt='Trading Competition Banner' />
            <Box width={1}>
              <Typography component='h3'>
                Description
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam venenatis ipsum justo. Sed metus metus, faucibus vel ipsum eget, auctor ultricies mi. Aliquam condimentum consectetur maximus. Morbi orci lacus, accumsan nec laoreet sit amet, laoreet in sapien. Mauris sit amet elit orci. Quisque et erat id sapien mollis iaculis ut eget lorem. 
              </Typography>
            </Box>
            <Divider />
            <Box width={1}>
              <Typography component='h3'>
                Rules
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam venenatis ipsum justo. Sed metus metus, faucibus vel ipsum eget, auctor ultricies mi. Aliquam condimentum consectetur maximus. Morbi orci lacus, accumsan nec laoreet sit amet, laoreet in sapien. Mauris sit amet elit orci:
              </Typography>
              <ol>
                <li>Etiam venenatis ipsum justo.</li>
                <li>Etiam venenatis ipsum justo.</li>
                <li>Etiam venenatis ipsum justo.</li>
                <li>Etiam venenatis ipsum justo.</li>
                <li>Etiam venenatis ipsum justo.</li>
              </ol>
            </Box>
          </Container>
        </Grid>
        <Grid item sm={4} className={classes.competitionButtons}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setEligibleTradingModalOpen(true);
            }}
          >
            Check if I am eligible
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setClaimTokensModalOpen(true);
            }}
          >
            Claim tokens
          </Button>
          <Button variant='outlined'>Switch to Rinkeby testnet</Button>
          <Container fixed className={classes.competitionPrize}>
            <Box>
              <Typography component='h3'>Prizes</Typography>
              <Link to='/'>View leaderboard</Link>
            </Box>
            <Divider />
            <Box>
              <Box>
                <Box width={1} height={1} />
                <img src={PrizeFirst} alt='Prize First' />
                <Typography>1</Typography>
              </Box>
              <Typography>$50,000</Typography>
            </Box>
            <Divider />
            <Box>
              <Box>
                <Box width={1} height={1} />
                <img src={PrizeSecond} alt='Prize Second' />
                <Typography>2</Typography>
              </Box>
              <Typography>$25,000</Typography>
            </Box>
            <Divider />
            <Box>
              <Box>
                <Box width={1} height={1} />
                <img src={PrizeThird} alt='Prize Third' />
                <Typography>3</Typography>
              </Box>
              <Typography>$15,000</Typography>
            </Box>
          </Container>
          <Box className={classes.socialContainer}>
            <Typography>Share on:</Typography>
            <Box>
              <Container fixed><TwitterIcon /></Container>
              <Container fixed><TelegramIcon /></Container>
              <Container fixed><FacebookIcon /></Container>
              <Container fixed><DiscordIcon /></Container>
              <Container fixed><SocialIcon1 /></Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TradingCompetition;
