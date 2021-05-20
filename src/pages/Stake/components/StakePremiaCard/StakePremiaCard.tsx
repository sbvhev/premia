import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  Box,
  Typography,
  Button,
} from '@material-ui/core';

import StakePremiaIcon from 'assets/images/stakePremia-icon.png';
import StakePremiaMobile from 'assets/images/StakePremiaMobile.png';
import greyLogo from 'assets/svg/PremiaLogoSmallGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '610px',
    width: '384px',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundcolor: 'transparent',
    margin: '12px',
  },
  wrapperMobile: {
    height: '480px',
    width: '335px',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundcolor: 'transparent',
    margin: '12px 12px 50px',
  },
  borderedCard: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '384px',
    height: '545px',
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
    borderRadius: '12px',
  },
  borderedCardMobile: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '335px',
    height: '480px',
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
    borderRadius: '12px',
  },
  stakeImg: {
    position: 'relative',
    top: 75,
    left: 153,
    width: '84px',
    height: '130px',
    zIndex: 10,
  },
  titleBox: {
    marginTop: '98px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  titleBoxMobile: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
  },
  secondaryTitle: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    margin: '7px 0 9px',
  },
  subTitle: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
  },
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  horizontalBox: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 16px 12px',
    height: '230px',
    margin: '22px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 8px 12px',
    margin: '22px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  borderedBox: {
    boxSizing: 'border-box',
    height: '46px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '3px',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  inputAmount: {
    backgroundColor: palette.background.default,
    boxShadow: 'none',
    border: 'none',
    marginLeft: '8px',
    color: palette.text.primary,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  buttonLeft: {
    width: '48%',
    marginRight: '4px',
  },
  buttonRight: {
    width: '52%',
    marginLeft: '4px',
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    height: '158px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 8px',
  },
  progressBarAndTime: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progressContainer: {
    display: 'flex',
    width: '145px',
    height: '5px',
    background: 'rgb(100,100,100, 0.4)',
    borderRadius: '5px',
    marginRight: '8px',
  },
  progressBar: {
    display: 'flex',
    height: '5px',
    background: '#FF9152',
    boxShadow: '0px 0px 11px rgba(255, 139, 63, 0.767701)',
    borderRadius: '5px',
  }
}));

const StakePremiaCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
      {!mobile && <img
          src={StakePremiaIcon}
          alt='Stake premia'
          className={classes.stakeImg}
        />}
      <Box className={!mobile ? classes.borderedCard : classes.borderedCardMobile}>
        <Box className={!mobile ? classes.titleBox : classes.titleBoxMobile}>
          {mobile && <img
            src={StakePremiaMobile}
            alt='Stake premia'
          />}
          <Typography
            component='h2'
            color='textPrimary'
            className={classes.title}
          >
            Stake premia
          </Typography>
          <Typography
            component='p'
            color='textSecondary'
            className={classes.subTitle}
          >
            Earn platform fees
          </Typography>
        </Box>
        <Box className={!mobile ? classes.topSection : classes.topSectionMobile}>
          <Box className={classes.col} style={{ margin: '0 8px 2px', justifyContent: 'flex-start', width: 'calc(100% - 16px)' }}>
          </Box>

          <Box className={classes.col}>
            <Box className={classes.horizontalBox} style={{ margin: '10px 8px 0', width: 'calc(100% - 16px)' }}>
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                Stake quantity
              </Typography>
              <Typography
                component='p'
                color='textSecondary'
                className={classes.smallInfoText}
              >
                {'Max size available: 124,098'}
              </Typography>
            </Box>
              <Box className={classes.borderedBox}>
              <Box display="flex" alignItems="center">
                <img
                  src={greyLogo}
                  alt='Select Amount'
                  style={{ marginLeft: '10px' }}
                />
                <input
                  value={'100'}
                  onChange={() => {}}
                  className={classes.inputAmount}
                />
              </Box>
                <Button color="primary" variant="outlined" size="small" >
                  MAX
                </Button>
              </Box>
          </Box>

          <Box className={classes.horizontalBox} style={{ marginTop: '12px' }}>
            <Button  size="large" color="primary" variant="contained" className={classes.buttonLeft}>
              Stake
            </Button>
            <Button color="secondary" variant="outlined" size="large" className={classes.buttonRight}>
              Unstake
            </Button>
          </Box>

        </Box>

        <Box className={!mobile ? classes.botSection : classes.botSectionMobile}>

          <Box className={classes.horizontalBox}>
            <Typography
              component='h3'
              color='textPrimary'
              className={classes.secondaryTitle}
            >
              My stats
            </Typography>
          </Box>
          <Box className={classes.horizontalBox} style={{ alignItems: 'center' }}>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              xPremia Unlocked
            </Typography>
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                {`1000`}
              </Typography>
            </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              xPremia Locked
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              className={classes.elementHeader}
            >
              {`100`}
            </Typography>
          </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              Total xPremia
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              className={classes.elementHeader}
            >
              {`12`}
            </Typography>
          </Box>
          <Box className={classes.horizontalBox}>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              Underlying Premia
            </Typography>
            <Typography
              component='p'
              color='textPrimary'
              className={classes.elementHeader}
            >
              {`11`}
            </Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  )
};

export default StakePremiaCard;
