import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  ButtonBase,
  Typography,
  Button,
  CircularProgress,
  Checkbox,
  useMediaQuery,
} from '@material-ui/core';
import { formatNumber } from 'utils/formatNumber';
import cn from 'classnames';

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

import { ContainedButton, SwitchWithGlider } from 'components';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '710px',
    width: '384px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    margin: '12px',
  },
  wrapperMobile: {
    width: '335px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    margin: '12px 12px 30px',
  },
  borderedCard: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '384px',
    height: '645px',
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
    height: '330px',
    padding: '0 16px 12px',
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
  switchButton: {
    borderRadius: 10,
    height: 40,

    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.text.secondary,
    },
    '& .MuiTypography-root': {
      fontWeight: 700,
      fontSize: '14px',
      color: palette.text.secondary,
    },
    '&:hover': {
      '& .MuiTypography-root': {
        color: palette.text.primary,
      },
    },
  },
  switchButtonLeft: {
    marginRight: 7,
  },
  activeSwitch: {
    cursor: 'default',
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.primary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 700,
      fontSize: '14px',
      color: palette.primary.main,
    },
    '&:hover': {
      '& .MuiTypography-root': {
        color: palette.primary.main,
      },
    },
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
  const isHardwareWallet = useIsHardwareWallet();
  const transact = useTransact();

  const [stakingMode, setStakingMode] = useState(true);
  const [checkIsOn, setCheckIsOn] = useState(false);
  const [shouldApprove, setShouldApprove] = useState(isHardwareWallet);
  const [signedAlready, setSignedAlready] = useState(false);
  const [approvedAlready, setApprovedAready] = useState(false);
  const [permitState, setPermitState] = useState<PermitState>({});
  const [stakeAmount, setStakeAmount] = useState('');

  const { xPremiaLocked, premiaBalance, xPremiaBalance, underlyingPremia } =
    useStakingBalances();

  const { allowance: stakingAllowance, onApprove: onApproveStaking } =
    useApproval(
      contracts?.PremiaErc20?.address,
      contracts?.PremiaStaking?.address,
    );

  const StakeButton = () => (
    <Box
      clone
      height={30}
      width={165}
      display='flex'
      alignItems='center'
      justifyContent='center'
      className={cn(classes.switchButton, classes.switchButtonLeft, {
        [classes.activeSwitch]: stakingMode,
      })}
      onClick={() => {
        setStakingMode(true);
        setStakeAmount('0');
      }}
    >
      <ButtonBase>
        <Typography>Stake</Typography>
      </ButtonBase>
    </Box>
  );

  const UnstakeButton = () => (
    <Box
      clone
      height={30}
      width={165}
      display='flex'
      alignItems='center'
      justifyContent='center'
      className={cn(classes.switchButton, {
        [classes.activeSwitch]: !stakingMode,
      })}
      onClick={() => {
        setStakingMode(false);
        setStakeAmount('0');
      }}
    >
      <ButtonBase>
        <Typography>Unstake</Typography>
      </ButtonBase>
    </Box>
  );

  useEffect(() => {
    if (stakingAllowance) {
      setShouldApprove(true);
    }
  }, [stakingAllowance]);

  useEffect(() => {
    if (!stakeAmount) {
      setApprovedAready(false);
    } else if (stakingAllowance >= parseFloat(stakeAmount)) {
      setApprovedAready(true);
    }
  }, [stakingAllowance, stakeAmount]);

  const handleChangeStakeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [setStakeAmount],
  );

  const signPermit = useCallback(async () => {
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
  }, [contracts, stakeAmount, web3, account, setPermitState, setSignedAlready]);

  const handleMax = useCallback(() => {
    if (stakingMode) {
      if (premiaBalance) {
        setStakeAmount(formatEther(premiaBalance));
      }
    } else {
      if (xPremiaBalance) {
        setStakeAmount(formatEther(xPremiaBalance));
      }
    }
  }, [stakingMode, premiaBalance, xPremiaBalance, setStakeAmount]);

  const handleToggleCheck = useCallback(
    () => setCheckIsOn(!checkIsOn),
    [checkIsOn, setCheckIsOn],
  );

  const handleStakeWithApproval = useCallback(async () => {
    console.log('with approval');
    if (!stakeAmount || parseFloat(stakeAmount) === 0) return;

    const amount = parseEther(stakeAmount);

    await transact(contracts?.PremiaStaking?.enter(amount), {
      description: `Stake ${formatBigNumber(amount)} PREMIA for xPREMIA`,
    });
  }, [contracts, stakeAmount, transact]);

  const handleStakeWithPermit = useCallback(async () => {
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
    setSignedAlready(false);
  }, [contracts, permitState, stakeAmount, transact]);

  const handleUnstake = useCallback(async () => {
    if (!stakeAmount || parseFloat(stakeAmount) === 0) return;

    const amount = parseEther(stakeAmount);

    transact(contracts?.PremiaStaking?.leave(amount), {
      description: `Unstake to withdraw ${formatBigNumber(
        amount,
      )} xPREMIA as PREMIA`,
    });
  }, [contracts, stakeAmount, transact]);

  const onClickAction = useMemo(() => {
    if (checkIsOn || shouldApprove) {
      return approvedAlready ? handleStakeWithApproval : onApproveStaking;
    }
    return signedAlready ? handleStakeWithPermit : signPermit;
  }, [
    checkIsOn,
    shouldApprove,
    approvedAlready,
    signedAlready,
    handleStakeWithPermit,
    signPermit,
    handleStakeWithApproval,
    onApproveStaking,
  ]);

  const stakingLabel = useMemo(() => {
    if (!stakeAmount || parseFloat(stakeAmount) === 0) {
      return 'Enter amount';
    }

    if (premiaBalance && parseEther(stakeAmount).gt(premiaBalance)) {
      return 'Not enough Premia';
    }

    if ((checkIsOn || shouldApprove) && !approvedAlready) {
      return 'Approve 1/2';
    }

    if (signedAlready || approvedAlready) {
      return 'Stake';
    }

    return 'Sign permit 1/2';
  }, [
    stakeAmount,
    premiaBalance,
    checkIsOn,
    shouldApprove,
    signedAlready,
    approvedAlready,
  ]);

  const unstakingLabel = useMemo(() => {
    if (!stakeAmount || parseFloat(stakeAmount) === 0) {
      return 'Enter amount';
    }

    if (xPremiaBalance && parseEther(stakeAmount) > xPremiaBalance) {
      return 'Not enough xPremia';
    }

    return 'Unstake';
  }, [stakeAmount, xPremiaBalance]);

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
            width={1}
            marginBottom={!mobile ? 'auto' : 1.5}
            borderRadius={10}
            padding='5px'
            border={`1px solid ${theme.palette.divider}`}
          >
            <SwitchWithGlider
              gliderWidth={!mobile ? 165 : 152}
              gliderHeight={40}
              marginBetweenSwitches={!mobile ? 7 : 0}
              defaultIndex={stakingMode ? 0 : 1}
              elements={[StakeButton, UnstakeButton]}
            />
          </Box>

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
                {stakingMode ? 'Stake quantity' : 'Unstake quantity'}
              </Typography>
              <Typography
                component='p'
                color='textSecondary'
                className={classes.smallInfoText}
              >
                {`Max available: ${formatNumber(
                  formatEther(stakingMode ? premiaBalance : xPremiaBalance),
                )}`}
              </Typography>
            </Box>

            <Box width='100%' height='46px' className={classes.inputIcon}>
              <input
                value={stakeAmount}
                className={classes.borderedInput}
                onChange={handleChangeStakeAmount}
              />
              <PremiaWhite fill={palette.text.primary} />
              <Box
                className={
                  !mobile ? classes.maxButton : classes.maxButtonMobile
                }
              >
                <Button
                  fullWidth
                  color='primary'
                  variant='outlined'
                  size='small'
                  onClick={handleMax}
                >
                  MAX
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className={classes.horizontalBox} style={{ marginTop: '12px' }}>
            {stakingMode ? (
              <ContainedButton
                fullWidth
                label={stakingLabel}
                disabled={
                  !stakeAmount ||
                  parseFloat(stakeAmount) === 0 ||
                  (premiaBalance && parseEther(stakeAmount).gt(premiaBalance))
                }
                onClick={onClickAction}
              />
            ) : (
              <ContainedButton
                fullWidth
                label={unstakingLabel}
                disabled={
                  !stakeAmount ||
                  parseFloat(stakeAmount) === 0 ||
                  (xPremiaBalance && parseEther(stakeAmount).gt(xPremiaBalance))
                }
                onClick={handleUnstake}
              />
            )}
          </Box>

          {stakingMode && !stakingAllowance && (
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
          )}
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
