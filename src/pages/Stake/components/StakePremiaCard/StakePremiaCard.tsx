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

import { useWeb3 } from 'state/application/hooks';
import { useTransact, useIsHardwareWallet, useApproval } from 'hooks';

import { formatBigNumber } from 'utils/formatNumber';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useStakingBalances } from 'state/staking/hooks';

import { ERC2612PermitMessage, signERC2612Permit } from 'eth-permit/eth-permit';
import { RSV } from 'eth-permit/rpc';
import StakePremiaIcon from 'assets/images/StakePremia-icon2x.png';
import StakePremiaMobile from 'assets/images/StakePremiaMobile-icon2x.png';
import { useDarkModeManager } from 'state/user/hooks';
import { ReactComponent as PremiaWhite } from 'assets/svg/NewLogoWhiteSmall.svg';
import { ReactComponent as CustomCheckBox } from 'assets/svg/CheckBox.svg';

import { ContainedButton } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '643px',
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
    // height: '578px',
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

interface PermitState {
  permit?: ERC2612PermitMessage & RSV;
  permitDeadline?: number;
}

const StakePremiaCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { palette } = theme;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [darkMode] = useDarkModeManager();
  const { web3, account, contracts } = useWeb3();

  const [checkIsOn, setCheckIsOn] = React.useState(false);
  const isHardwareWallet = useIsHardwareWallet();

  const [stakingMode, setStakingMode] = React.useState(true);
  const [shouldApprove, setShouldApprove] = React.useState(isHardwareWallet);
  const [signedAlready, setSignedAlready] = React.useState(false);
  const [approvedAready, setApprovedAready] = React.useState(false);
  const [permitState, setPermitState] = React.useState<PermitState>({});
  const [stakeAmount, setStakeAmount] = React.useState('');
  const [unstakeAmount, setUnstakeAmount] = React.useState('');
  const transact = useTransact();

  const { xPremiaLocked, premiaBalance, xPremiaBalance, underlyingPremia } =
    useStakingBalances();

  const { allowance: stakingAllowance, onApprove: onApproveStaking } =
    useApproval(
      contracts?.PremiaErc20?.address as string,
      contracts?.PremiaStaking?.address as string,
    );

  React.useEffect(() => {
    if (stakingAllowance) {
      setShouldApprove(true);
    }
    if (!stakeAmount) {
      setApprovedAready(false);
    }
    if (stakeAmount && stakingAllowance >= parseFloat(stakeAmount)) {
      setApprovedAready(true);
    }
  }, [stakingAllowance, stakeAmount]);

  const handleChangeStakeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let paddedValue = value.replace(/[^0-9.]/g, '');
    if (paddedValue === '') {
      setStakeAmount('');
      return;
    }
    if (paddedValue === '.') {
      setStakeAmount('0.');
      return;
    }
    if (paddedValue === '0') {
      setStakeAmount('0');
      return;
    }
    if (paddedValue.startsWith('0') && paddedValue[1] !== '.') {
      const last = paddedValue.length;
      paddedValue = paddedValue.slice(1, last);
    }
    if (paddedValue) {
      setStakeAmount(paddedValue);
    }
  };

  // const handleChangeUnstakeAmount = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const { value } = e.target;
  //   let paddedValue = value.replace(/[^0-9.]/g, '');
  //   console.log('value', paddedValue);
  //   if (paddedValue === '') {
  //     setUnstakeAmount('');
  //     return;
  //   }
  //   if (paddedValue === '.') {
  //     setUnstakeAmount('0.');
  //     return;
  //   }
  //   if (paddedValue === '0') {
  //     setUnstakeAmount('0');
  //     return;
  //   }
  //   if (paddedValue.startsWith('0') && paddedValue[1] !== '.') {
  //     const last = paddedValue.length;
  //     paddedValue = paddedValue.slice(1, last);
  //   }
  //   if (paddedValue) {
  //     setUnstakeAmount(paddedValue);
  //   }
  // };

  const handleMax = () => {
    if (stakingMode) {
      if (premiaBalance) {
        setStakeAmount(formatEther(premiaBalance));
      }
    } else {
      if (xPremiaBalance) {
        setUnstakeAmount(formatEther(xPremiaBalance));
      }
    }
  };

  const handleToggleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckIsOn(!checkIsOn);
  };

  const signPermit = async () => {
    if (!stakeAmount) return;
    const token = contracts?.PremiaErc20?.address as string;
    const spender = contracts?.PremiaStaking.address as string;
    const amount = parseEther(stakeAmount);
    const deadline = Math.floor(new Date().getTime() / 1000 + 3600);

    const permit = await signERC2612Permit(
      web3,
      token,
      account,
      spender,
      amount.toString(),
      deadline,
    );
    if (permit && permit.r) {
      setPermitState({ permit, permitDeadline: deadline });
      setSignedAlready(true);
    }
  };

  const handleStakeWithApproval = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) === 0) return;
    const amount = parseEther(stakeAmount);
    await transact(contracts?.PremiaStaking?.enter(amount), {
      description: `Stake ${formatBigNumber(amount)} PREMIA for xPREMIA`,
    });
  };

  const handleStakeWithPermit = async () => {
    if (
      !permitState.permit ||
      !permitState.permitDeadline ||
      !stakeAmount ||
      parseFloat(stakeAmount) === 0
    )
      return;
    const dateNow = Date.now();
    const expirationDate = permitState.permitDeadline * 1000;
    if (dateNow > expirationDate) {
      setPermitState({});
      setSignedAlready(false);
      return;
    }
    const amount = parseEther(stakeAmount);
    await transact(
      contracts?.PremiaStaking?.enterWithPermit(
        amount,
        permitState.permitDeadline,
        permitState.permit.v,
        permitState.permit.r,
        permitState.permit.s,
      ),
      {
        description: `Stake ${formatBigNumber(amount)} PREMIA for xPREMIA`,
      },
    );
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) === 0) return;
    const amount = parseEther(unstakeAmount);
    transact(contracts?.PremiaStaking?.leave(amount), {
      description: `Unstake to withdraw ${formatBigNumber(
        amount,
      )} xPREMIA as PREMIA`,
    });
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
                {`Max size available: ${formatNumber(
                  formatEther(premiaBalance),
                )}`}
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
              {checkIsOn || shouldApprove ? (
                <ContainedButton
                  label={
                    stakeAmount && parseFloat(stakeAmount) !== 0
                      ? !approvedAready
                        ? 'Approve 1/2'
                        : 'Stake'
                      : 'Enter amount'
                  }
                  fullWidth
                  disabled={!stakeAmount || parseFloat(stakeAmount) === 0}
                  onClick={
                    stakeAmount && parseFloat(stakeAmount) !== 0
                      ? !approvedAready
                        ? onApproveStaking
                        : handleStakeWithApproval
                      : () => {}
                  }
                />
              ) : (
                <ContainedButton
                  label={
                    stakeAmount && parseFloat(stakeAmount) === 0
                      ? !signedAlready
                        ? 'Sign Permit 1/2'
                        : 'Stake'
                      : 'Enter amount'
                  }
                  fullWidth
                  disabled={!stakeAmount || parseFloat(stakeAmount) === 0}
                  onClick={
                    stakeAmount && parseFloat(stakeAmount) !== 0
                      ? !signedAlready
                        ? signPermit
                        : handleStakeWithPermit
                      : () => {}
                  }
                />
              )}
            </Box>
            <Button
              color='secondary'
              variant='outlined'
              size='large'
              className={classes.buttonRight}
              onClick={handleUnstake}
            >
              Unstake
            </Button>
          </Box>

          <Box display='flex' width='100%' marginTop='12px'>
            <Checkbox
              checked={checkIsOn}
              onChange={handleToggleCheck}
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
                {formatNumber(formatEther(xPremiaBalance))}
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
              {formatNumber(formatEther(xPremiaLocked))}
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
              {formatNumber(formatEther(xPremiaBalance.add(xPremiaLocked)))}
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
              {formatNumber(formatEther(underlyingPremia))}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StakePremiaCard;
