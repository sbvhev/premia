import React from 'react';
import {
  Typography,
  Modal,
  Box,
  Button,
  Paper,
  Container,
  Divider,
  Grid,
} from '@material-ui/core';
import cx from 'classnames';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from '@material-ui/icons';
import { useCurrentTx } from 'state/transactions/hooks';
import { ModalContainer } from 'components';

import { formatNumber } from 'utils/formatNumber';
import VaultIcon from 'assets/svg/VaultIcon.svg';
import MostOuterSuccessRadial from 'assets/svg/SuccessIconOuterRadial.svg';
import SecondSuccessRadial from 'assets/svg/SuccessIconSecondOuterRadial.svg';
import SuccessIcon from 'assets/svg/SuccessIconCore.svg';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as TwitterIcon } from 'assets/svg/TwitterIcon.svg';
import { ReactComponent as TelegramIcon } from 'assets/svg/Telegram.svg';
import { ReactComponent as FacebookIcon } from 'assets/svg/Facebook.svg';
import { ReactComponent as DiscordIcon } from 'assets/svg/Discord.svg';
import { ReactComponent as ForumIcon } from 'assets/svg/Forum.svg';
import XOut from 'assets/svg/XOutGrey.svg';
import theme from 'theme';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: 510,
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
    top: 64,
    left: 0,
    height: 430,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(316.57deg, ${palette.success.dark} 18.89%, ${palette.success.main} 95.84%);`,
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
    padding: 32,
  },
  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: '50px',
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
    whiteSpace: 'nowrap',
    fontWeight: 500,
    fontSize: '14px',
    LineHeight: '24px',
    marginBottom: 24,
  },
  hyperlink: {
    fontWeight: 500,
    fontSize: '14px',
    LineHeight: '24px',
    textDecoration: 'underline'
  },
  exitContainer: {
    position: 'absolute',
    top: 30,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px',
    cursor: 'pointer',
    width: '20px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  paperWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20
  },
  tableCellIcon: {
    marginRight: 4,
    marginBottom: -3,
    filter: 'grayScale(1)',
  },
  typeBox: {
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'capitalize',
    position: 'relative',
    '& div': {
      width: '100%',
      height: '100%',
      opacity: 0.1,
      position: 'absolute',
      borderRadius: 12,
      top: 0,
      left: 0,
    },
    '& svg, & img': {
      marginRight: 4,
    },
  },
  vault: {
    color: palette.primary.main,
    '& div': {
      background: palette.primary.main,
    },
  },
  call: {
    color: palette.success.dark,
    '& div': {
      background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    },
  },
  put: {
    color: palette.error.main,
    '& div': {
      background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`,
    },
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: '0 8px',

    '& img': {
      width: 16,
      marginLeft: 4,
    },
  },
  boxWrapper: {
    textAlign: 'left',
    padding: '24px 0 24px 22px',

    '&:last-child': {
      padding: '24px 22px',
      borderLeft: `1px solid ${palette.divider}`,
    },

    '&:nth-child(4)': {
      paddingRight: 22,
    },

    '& $subTitle': {
      marginBottom: 8,
    },
  },
  boxLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,

    '& svg': {
      width: 20,
      height: 20,
      marginRight: 8,
    },
  },
  callBox: {
    background: 'rgba(82, 148, 255, 0.1)',
    borderRadius: 8,
    padding: '9px 11px',
    color: '#5294FF',
    position: 'relative',
    top: -5,

    '& svg': {
      width: 16,
      height: 14,

      '& path': {
        fill: '#5294FF',
      },
    },

    '& p': {
      fontSize: 14,
      lineHeight: '18px',
      background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
  },
  profitBox: {
    '& p': {
      fontSize: 28,
      lineHeight: '24px',
      background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'center',

    '& svg': {
      width: 35,
      height: 35,
      padding: 10,
      borderRadius: 12,
      border: `1px solid ${palette.divider}`,
      marginRight: 10,
      cursor: 'pointer',

      '&:hover': {
        border: `1px solid ${palette.secondary.main}`,

        '& path': {
          fill: palette.secondary.main
        }
      },

      '&:last-child': {
        marginRight: 0
      },

      '& path': {
        fill: palette.text.secondary
      }
    }
  }
}));

export interface PositionModalProps {
  open: boolean;
  onClose: () => void;
}

const PositionModal: React.FC<PositionModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { txLink } = useCurrentTx();
  const txStateMsg = 'Tell your friends about Premia and earn fees';
  const { palette } = theme;
  const item = {
    tokenIcon: UniswapIcon,
    symbol: 'Uni',
    capital: 15002,
    option: 'call',
    type: 'vault',
    name: 'call',
    earned: 100,
    apy: 24,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='sm'>
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
              palette && palette.type === 'light' ? { background: 'none' } : {}
            }
          >
            <Box className={classes.mainCard}>
              <Box className={classes.textColumn}>
                <Box className={classes.topTextWrapper}>
                  <Typography variant='h2' className={classes.title}>
                    Position closed
                  </Typography>
                  <Typography color='secondary' className={classes.subTitle}>
                    {txStateMsg}
                  </Typography>
                  <Paper className={classes.paperWrapper}>
                    <Box className={classes.boxWrapper}>
                      <Typography
                        color='secondary'
                        className={classes.subTitle}
                      >
                        Asset
                      </Typography>
                      <Box className={classes.boxLine}>
                        <UniswapIcon />
                        <Typography>Uni</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.boxWrapper}>
                      <Typography
                        color='secondary'
                        className={classes.subTitle}
                      >
                        Type
                      </Typography>
                      <Box className={cx(classes.boxLine, classes.callBox)}>
                        <ArrowUpwardIcon />
                        <Typography>Call</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.boxWrapper}>
                      <Typography
                        color='secondary'
                        className={classes.subTitle}
                      >
                        Purchase price
                      </Typography>
                      <Box className={classes.boxLine}>
                        <DaiIcon />
                        <Typography>15,002</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.boxWrapper}>
                      <Typography
                        color='secondary'
                        className={classes.subTitle}
                      >
                        Exit price
                      </Typography>
                      <Box className={classes.boxLine}>
                        <DaiIcon />
                        <Typography>18,002</Typography>
                      </Box>
                    </Box>
                    <Box className={classes.boxWrapper}>
                      <Typography className={classes.subTitle}>
                        Profit
                      </Typography>
                      <Box className={cx(classes.boxLine, classes.profitBox)}>
                        <Typography>15%</Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Typography style={{ marginBottom: 8 }}>
                    Share on:
                  </Typography>
                  <Box className={classes.socialLinks}>
                    <TwitterIcon />
                    <TelegramIcon />
                    <FacebookIcon />
                    <DiscordIcon />
                    <ForumIcon />
                  </Box>
                  <Typography color="secondary" className={classes.hyperlink}>
                    Not right now
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button className={classes.exitContainer} onClick={onClose}>
              <img src={XOut} alt='Exit' />
            </Button>
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default PositionModal;
