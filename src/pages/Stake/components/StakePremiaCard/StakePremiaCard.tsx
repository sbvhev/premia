import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Checkbox,
} from '@material-ui/core';
import { formatNumber } from 'utils/formatNumber';

import StakePremiaIcon from 'assets/images/StakePremia-icon2x.png';
import StakePremiaMobile from 'assets/images/StakePremiaMobile-icon2x.png';
import { useDarkModeManager } from 'state/user/hooks';
import { ReactComponent as PremiaWhite } from 'assets/svg/NewLogoWhiteSmall.svg';
import { ReactComponent as CustomCheckBox } from 'assets/svg/CheckBox.svg';
// import TickForCheckBox from 'assets/svg/TickOnCheckBox.svg';

import { ContainedButton } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '642px',
    width: '384px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundcolor: 'transparent',
    margin: '12px',
  },
  wrapperMobile: {
    height: '501px',
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
    height: '577px',
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
  },
  borderedCardMobile: {
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '335px',
    // height: '501px',
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
  },
  stakeImg: {
    position: 'relative',
    top: 75,
    left: 153,
    width: '84px',
    height: '130px',
    zIndex: 2,
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
    marginTop: '20px',
    display: 'flex',
    height: '130px',
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
    height: '262px',
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
    },
  },
  borderedInput: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '46px',
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '13px 50px 13px 40px',
    color: palette.text.primary,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    zIndex: 2,
    '&:hover': {
      backgroundColor: palette.primary.dark,
      border: `1px solid ${palette.primary.main}`,
      color: palette.primary.main,
    },
    '&:focus': {
      borderColor: palette.primary.main,
      outline: 'none',
      boxShadow: 'none',
      borderWidth: '1px',
    },
  },
  inputIcon: {
    '& svg ': {
      position: 'relative',
      top: -30,
      left: 14,
      zIndex: 1,
    },
    '&:hover': {
      '& svg path': {
        fill: palette.primary.main,
      },
    },
  },
  maxButton: {
    width: '74px',
    position: 'relative',
    top: -63,
    right: -269,
    zIndex: 3,
  },
  maxButtonMobile: {
    width: '74px',
    position: 'relative',
    top: -62,
    right: -236,
    zIndex: 3,
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  buttonLeft: {
    width: '48%',
    marginRight: '4px',
    fontSize: '16px',
    fontWeight: 700,
  },
  buttonRight: {
    width: '52%',
    marginLeft: '4px',
    fontSize: '16px',
    fontWeight: 500,
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 16px',
    height: '158px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 20px',
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
  },
  checkbox: {
    margin: '2px 10px 2px 0',
    padding: '0',
    '&:hover': {
      backgroundColor: palette.primary,
    },
  },
  hardwareWalletApprovalText: {
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '24px',
  },
}));

interface StakePremiaCardProps {
  premiaBalance: string | undefined;
  xPremiaBalance: string | undefined;
}

const StakePremiaCard: React.FC<StakePremiaCardProps> = ({
  premiaBalance,
  xPremiaBalance,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { palette } = theme;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [darkMode] = useDarkModeManager();
  const [checkIsOn, setCheckIsOn] = React.useState(false);

  const [stakeAmount, setStakeAmount] = React.useState('');

  const handleChangeStakeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let paddedValue = value.replace(/[^0-9.]/g, '');
    if (value === '') {
      setStakeAmount('');
      return;
    }
    if (value === '.') {
      setStakeAmount('0.');
      return;
    }
    if (value === '0') {
      setStakeAmount('0');
      return;
    }
    if (value.startsWith('0') && value[1] !== '.') {
      const last = value.length;
      paddedValue = value.slice(1, last);
    }
    if (paddedValue) {
      setStakeAmount(paddedValue);
    }
  };

  const handleMax = () => {
    if (premiaBalance) {
      setStakeAmount(premiaBalance);
    }
  };

  const handleDisclaimerCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckIsOn(!checkIsOn);
  };

  return (
    <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
      {!mobile && (
        <img
          src={StakePremiaIcon}
          alt='Stake Premia'
          className={classes.stakeImg}
        />
      )}
      <Box
        className={!mobile ? classes.borderedCard : classes.borderedCardMobile}
        style={
          darkMode
            ? {}
            : {
                borderColor: 'transparent',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.0746353)',
              }
        }
      >
        <Box className={!mobile ? classes.titleBox : classes.titleBoxMobile}>
          {mobile && (
            <img
              src={StakePremiaMobile}
              alt='Stake Premia'
              style={{ height: '80px', width: '52px' }}
            />
          )}
          <Box>
            <Typography
              component='h2'
              color='textPrimary'
              className={classes.title}
            >
              Stake Premia
            </Typography>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.subTitle}
            >
              Earn platform fees
            </Typography>
          </Box>
        </Box>
        <Box
          className={!mobile ? classes.topSection : classes.topSectionMobile}
        >
          <Box
            className={classes.col}
            style={{
              margin: '0 8px 2px',
              justifyContent: 'flex-start',
              width: 'calc(100% - 16px)',
            }}
          ></Box>

          <Box className={classes.col}>
            <Box
              className={classes.horizontalBox}
              style={{ margin: '10px 8px 0', width: 'calc(100% - 16px)' }}
            >
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

            <Box width='100%' height='46px' className={classes.inputIcon}>
              <input
                value={stakeAmount}
                onChange={handleChangeStakeAmount}
                className={classes.borderedInput}
              />
              <PremiaWhite fill={palette.text.primary} />
              <Box
                className={
                  !mobile ? classes.maxButton : classes.maxButtonMobile
                }
              >
                <Button
                  color='primary'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onClick={handleMax}
                >
                  MAX
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className={classes.horizontalBox} style={{ marginTop: '12px' }}>
            <Box className={classes.buttonLeft}>
              <ContainedButton
                label={'Stake'}
                fullWidth
                onClick={() => alert}
              />
            </Box>
            <Button
              color='secondary'
              variant='outlined'
              size='large'
              className={classes.buttonRight}
            >
              Unstake
            </Button>
          </Box>

          <Box display='flex' width='100%' marginTop='12px'>
            <Checkbox
              checked={checkIsOn}
              onChange={handleDisclaimerCheck}
              name='agreeToTerms'
              size='small'
              className={classes.checkbox}
              icon={<CustomCheckBox />}
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
            <Typography
              component='p'
              color='textSecondary'
              className={classes.hardwareWalletApprovalText}
              style={mobile ? { fontSize: '11.5px' } : {}}
            >
              Use Approve (required by some hardware wallets)
            </Typography>
          </Box>
        </Box>

        <Box
          className={!mobile ? classes.botSection : classes.botSectionMobile}
        >
          <Box className={classes.horizontalBox}>
            <Typography
              component='h3'
              color='textPrimary'
              className={classes.secondaryTitle}
            >
              My stats
            </Typography>
          </Box>
          <Box
            className={classes.horizontalBox}
            style={{ alignItems: 'center' }}
          >
            <Typography
              component='p'
              color='textSecondary'
              className={classes.elementHeader}
            >
              xPremia Unlocked
            </Typography>
            {xPremiaBalance ? (
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                {formatNumber(xPremiaBalance)}
              </Typography>
            ) : (
              <CircularProgress size={16} />
            )}
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
  );
};

export default StakePremiaCard;
