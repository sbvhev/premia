import React, { useState, useMemo, useCallback } from 'react';
import {
  Button,
  Typography,
  Modal,
  Box,
  Fade,
  Backdrop,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { formatUnits } from 'ethers/lib/utils';

import { useWeb3 } from 'state/application/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import { useCurrencyBalance } from 'state/wallet/hooks';
import { useUnderlying } from 'state/options/hooks';
import { useApproval, useTransact, usePools } from 'hooks';
import {
  getTokenIcon,
  getTokenCallIcon,
  getTokenPutIcon,
} from 'utils/getTokenIcon';
import { formatCompact } from 'utils/formatNumber';
import floatToBigNumber from 'utils/floatToBigNumber';

import { ModalContainer, ContainedButton } from 'components';
import XOut from 'assets/svg/XOutGrey.svg';
import { ReactComponent as InfoIcon } from 'assets/svg/TooltipQuestionmark.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  borderedCard: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 28,
    width: 364,
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,

    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  wrapper: {
    width: '364px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  mainCard: {
    width: '364px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `2px solid ${palette.divider}`,
  },
  mainCardMobile: {
    width: '340px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `2px solid ${palette.divider}`,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    height: 'auto',
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 30px 20px',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
    color: palette.text.primary,
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '24px',
    textAlign: 'left',
    color: palette.text.secondary,

    '& b': {
      color: palette.primary.main,
      marginLeft: 4,
    },
  },
  anchor: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'left',
    color: `${palette.text.secondary} !important`,
    textDecorationColor: palette.text.secondary,
  },
  checkbox: {
    '&:hover': {
      backgroundColor: palette.primary,
    },
  },
  exitContainer: {
    position: 'absolute',
    top: 21,
    right: 'calc(50% - 168px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 6px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  element: {
    '& svg': {
      width: 14,
      height: 17,
    },

    '& p': {
      lineHeight: '24px',
      fontSize: 14,

      '& svg': {
        position: 'relative',
        top: 4,
        marginLeft: 4,

        '& path': {
          fill: (props: any) => (props.dark ? 'white' : 'black'),
        },
      },
    },

    '& h2': {
      lineHeight: '24px',
      fontSize: 14,
      marginRight: 8,
      fontWeight: 'bold',
    },
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',

    '& img': {
      width: 20,
      height: 24,
      position: 'relative',
      top: -4,
      marginRight: 5,
    },
  },
  col: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  inputIcon: {
    position: 'relative',
    top: '-34px',
    left: 14,
    height: 20,
    width: 20,
    zIndex: 1,

    '& path': {
      fill: '#646464',
    },
  },
  horizontalBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
  },
  maxButton: {
    position: 'absolute',
    top: 4,
    right: 3,
    zIndex: 3,
  },
}));

export interface WithdrawDepositModalProps {
  open: boolean;
  call?: boolean;
  type: 'withdraw' | 'deposit';
  onClose: () => void;
}

const WithdrawDepositModal: React.FC<WithdrawDepositModalProps> = ({
  call = true,
  type = 'deposit',
  open,
  onClose,
}) => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const dark = useIsDarkMode();
  const classes = useStyles({ dark, call });
  const { palette } = useTheme();
  // const gasToken = useGasToken();
  const { account } = useWeb3();
  const { underlying } = useUnderlying();
  const { callPool, callPoolContract, putPool, putPoolContract } = usePools();
  const { callPool: userOwnedCallPool, putPool: userOwnedPutPool } =
    usePools(true);
  const transact = useTransact();

  const activePool = useMemo(
    () => (call ? callPool : putPool),
    [call, callPool, putPool],
  );
  const activePoolContract = useMemo(
    () => (call ? callPoolContract : putPoolContract),
    [call, callPoolContract, putPoolContract],
  );
  const activeToken = useMemo(
    () => (call ? activePool?.underlying : activePool?.base),
    [activePool, call],
  );
  const activeTokenBalance = useCurrencyBalance(account, activeToken);
  // const activeNativeTokenBalance = useCurrencyBalance(account, gasToken);
  const activePoolBalance = useMemo(
    () =>
      Number(
        formatUnits(
          call
            ? userOwnedCallPool?.totalAvailable ?? 0
            : userOwnedPutPool?.totalAvailable ?? 0,
          underlying.decimals,
        ),
      ) * 0.9999999995,
    [call, userOwnedCallPool, userOwnedPutPool, underlying],
  );
  const activeBalance = useMemo(() => {
    // disabled for trading competition
    // if (
    //   ['WETH', 'WBNB'].includes(activeToken?.symbol ?? '') &&
    //   type === 'deposit'
    // ) {
    //   return Number(activeTokenBalance) + Number(activeNativeTokenBalance);
    // }
    return type === 'deposit' ? activeTokenBalance : activePoolBalance;
  }, [
    type,
    // activeToken,
    // activeNativeTokenBalance,
    activeTokenBalance,
    activePoolBalance,
  ]);

  const { allowance, onApprove } = useApproval(
    activeToken?.address,
    activePoolContract?.address,
  );

  const isAmountAllowed = useMemo(
    () => allowance > 0 && allowance > (value ?? 0),
    [allowance, value],
  );

  const UnderlyingIcon = useMemo(
    () => getTokenIcon(activePool?.underlying.symbol),
    [activePool],
  );

  const UnderlyingCallIcon = useMemo(
    () => getTokenCallIcon(activePool?.underlying.symbol),
    [activePool],
  );

  const UnderlyingPutIcon = useMemo(
    () => getTokenPutIcon(activePool?.underlying.symbol),
    [activePool],
  );

  const BaseIcon = useMemo(
    () => getTokenIcon(activePool?.base.symbol),
    [activePool],
  );

  const handleWithdrawDeposit = useCallback(() => {
    if (!value || !activePoolContract || !activeToken) return;

    const depositWithdraw =
      type === 'deposit'
        ? activePoolContract!.deposit
        : activePoolContract!.withdraw;

    const amount = floatToBigNumber(value, activeToken!.decimals);
    const additionalEthNecessary = 0;
    /* disabled for trading competition
      ['WETH', 'WBNB'].includes(activeToken.symbol) &&
      value > Number(activeTokenBalance)
        ? value - Number(activeTokenBalance)
        : 0;
    */

    transact(
      depositWithdraw(amount, call, {
        ...(additionalEthNecessary
          ? {
              value: floatToBigNumber(
                additionalEthNecessary + 0.00005,
                activeToken.decimals,
              ),
            }
          : {}),
      }),
    )
      .then(async (tx) => {
        try {
          await tx?.wait();
          onClose();
        } catch (e) {
          console.error(e);
        }
      })
      .then(onClose);
  }, [
    type,
    value,
    call,
    activeToken,
    // activeTokenBalance,
    activePoolContract,
    transact,
    onClose,
  ]);

  const transactionReady = useMemo(() => {
    return (
      value &&
      Number(value) > 0 &&
      activeBalance &&
      Number(value) <= activeBalance
    );
  }, [activeBalance, value]);

  const activeButtonLabel = useMemo(() => {
    if (!isAmountAllowed) {
      return type === 'deposit' ? 'Confirm Deposit' : 'Confirm withdrawal';
    }
    if (!value || Number(value) === 0) {
      return 'Enter amount';
    }
    if (!activeBalance || Number(value) > activeBalance) {
      return 'Insufficient balance';
    }
    return type === 'deposit' ? 'Confirm Deposit' : 'Confirm withdrawal';
  }, [isAmountAllowed, value, activeBalance, type]);

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
          <Box className={classes.wrapper}>
            <Box className={classes.borderedCard}>
              <Box className={classes.titleBox}>
                <Box height={16} marginRight='8px'>
                  {call ? <UnderlyingCallIcon /> : <UnderlyingPutIcon />}
                </Box>
                <Typography
                  component='h2'
                  color='textPrimary'
                  className={classes.title}
                >
                  {call
                    ? `${activePool?.underlying.symbol} Call pool ${type}`
                    : `${activePool?.underlying.symbol} Put pool ${type}`}
                </Typography>
              </Box>
              <Box className={classes.topSection}>
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
                      {activeToken?.symbol} Amount
                    </Typography>
                    <Typography
                      component='p'
                      color='textSecondary'
                      className={classes.smallInfoText}
                    >
                      Max size available:
                      <b>{formatCompact(activeBalance)}</b>
                    </Typography>
                  </Box>

                  <Box
                    width='100%'
                    height='46px'
                    style={{ position: 'relative' }}
                  >
                    <input
                      value={value}
                      onChange={(event: any) => setValue(event.target.value)}
                      className={classes.borderedInput}
                    />

                    {call ? (
                      <UnderlyingIcon className={classes.inputIcon} />
                    ) : (
                      <BaseIcon className={classes.inputIcon} />
                    )}

                    <Button
                      color='primary'
                      variant='outlined'
                      size='small'
                      className={classes.maxButton}
                      onClick={
                        Number(activeBalance)
                          ? () => setValue(Number(activeBalance))
                          : () => {}
                      }
                    >
                      MAX
                    </Button>
                  </Box>
                </Box>

                <Box
                  className={classes.horizontalBox}
                  style={{ marginTop: '16px' }}
                >
                  {!isAmountAllowed && (
                    <ContainedButton
                      fullWidth
                      color={call ? 'primary' : 'secondary'}
                      size='large'
                      label={`Approve ${activeToken?.symbol}`}
                      onClick={transactionReady ? onApprove : () => {}}
                      endIcon={
                        <Tooltip
                          arrow
                          leaveTouchDelay={1500}
                          title={`You must give Premia permission to use your ${activeToken?.symbol} You only have to do this once per token.`}
                        >
                          <InfoIcon fill={palette.background.paper} />
                        </Tooltip>
                      }
                    />
                  )}
                  <ContainedButton
                    fullWidth
                    disabled={!transactionReady || !isAmountAllowed}
                    color={call ? 'primary' : 'secondary'}
                    size='large'
                    margin='6px 2px 0'
                    label={activeButtonLabel}
                    onClick={handleWithdrawDeposit}
                  />
                </Box>
              </Box>
            </Box>
            <Box onClick={onClose} className={classes.exitContainer}>
              <img src={XOut} alt='Exit' style={{ padding: '6px' }} />
            </Box>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default WithdrawDepositModal;
