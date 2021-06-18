import React, { useState } from 'react';
import {
  Typography,
  Modal,
  Box,
  Button,
  Fade,
  Backdrop,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { shortenAddress } from 'utils';
import { ModalContainer } from 'components';
import { useWeb3, useDisconnect } from 'state/application/hooks';
import { useTxHistory } from 'state/transactions/hooks';
import { getTxLink } from 'utils/getTxLink';

import SuccessIcon from 'assets/images/SuccessSubtract.png';
import CancelIcon from 'assets/images/CancelSubtract.png';
import XOut from 'assets/svg/XOutGrey.svg';
import { Check as CheckIcon } from '@material-ui/icons';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '364px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  wrapperMobile: {
    width: '340px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  mainCard: {
    width: '364px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
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
    alignItems: 'center',
    padding: '26px 28px 25px',
    height: '138px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '26px 18px 25px',
    height: '138px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '18px 14px 2px 28px',
    marginBottom: '16px',
    maxHeight: '238px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '18px',
    overflowY: 'auto',
  },
  transactionListContainer: {
    overflowY: 'auto',
    maxHeight: '180px',
    padding: '0 14px 0 28px',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
    marginLeft: '6px',
    color: palette.text.primary,
  },
  sectionHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    color: palette.text.primary,
  },
  addressText: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '24px',
    color: palette.primary.main,
  },
  greyText: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '24px',
    color: palette.text.secondary,
  },
  borderedBox: {
    boxSizing: 'border-box',
    display: 'flex',
    height: '40px',
    padding: '10px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    cursor: 'pointer',
    '&.MuiButton-root': {
      minWidth: '40px',
      width: '40px',
    },

    '& svg': {
      width: 13,
      height: 15,
    },
  },
  borderedBoxLarge: {
    boxSizing: 'border-box',
    display: 'flex',
    height: '40px',
    padding: '10px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    cursor: 'pointer',
    '&.MuiButton-root': {
      width: '130px',
      minWidth: '130px',
    },
  },
  insideButtons: {
    '&:hover': {
      borderColor: palette.primary.main,
    },
  },
  addressAnchor: {
    height: '18px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  anchor: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '24px',
    color: `${palette.text.secondary} !important`,
    textDecoration: 'none',
  },
  clear: {
    padding: '6px',
    cursor: 'pointer',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  txCompleteIconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%);`,
    '&:hover': {
      background: `linear-gradient(121.21deg, ${palette.success.dark} 7.78%, ${palette.success.main} 118.78%);`,
    },
  },
  txErrorIconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: `linear-gradient(316.57deg, ${palette.error.dark} 18.89%, ${palette.error.main} 95.84%);`,
    '&:hover': {
      background: `linear-gradient(316.57deg, ${palette.error.main} 18.89%, ${palette.error.dark} 95.84%);`,
    },
  },
  exitContainer: {
    position: 'absolute',
    top: 22,
    right: 'calc(50% - 164px)',
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
  exitContainerMobile: {
    position: 'absolute',
    top: 'calc(20vh + 30px)',
    right: 'calc(50% - 150px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 6px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1000,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  accountLink: {
    textDecoration: 'none',
  },
  noRecentTransaction: {
    display: 'flex',
    margin: 'auto',

    '& p': {
      fontWeight: 400,
    },
  },
}));

export interface TransactionsModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionsModal: React.FC<TransactionsModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const [check, setCheck] = useState(false);
  const disconnect = useDisconnect();
  const { account, chainId } = useWeb3();
  const { txHistory = [], clearTxHistory } = useTxHistory();
  const { palette } = theme;

  const shortenTx = (tx: string) => {
    if (tx.length) {
      const txLength = tx.length;
      const first = tx.slice(0, 6);
      const last = tx.slice(txLength - 6, txLength);
      return `${first}...${last}`;
    }
    return '';
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  const onCopy = () => {
    navigator.clipboard.writeText(`https://etherscan.io/address/${account}`);
    setCheck(true);
  };

  const moreThanFiveTXs = txHistory.length > 5;

  const mappedRecentTransactions = txHistory.map((item, index) => (
    <Box
      display='flex'
      key={`${index}${item.hash}`}
      justifyContent='space-between'
      alignItems='center'
      margin={moreThanFiveTXs ? '10px 4px 10px 0' : '10px 0px'}
    >
      <a
        className={classes.anchor}
        href={getTxLink(item.hash, chainId)}
        target='_blank'
        rel='noreferrer'
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography style={{ fontSize: '14px' }}>
            {shortenTx(item.hash)}
          </Typography>
          <Box
            marginLeft='4px'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                opacity='0.5'
                d='M12.6142 3.45291C12.613 3.44043 12.6106 3.42835 12.6089 3.41604C12.6068 3.40145 12.6051 3.38679 12.6022 3.37228C12.5994 3.35825 12.5955 3.34466 12.5921 3.33091C12.5889 3.31834 12.5861 3.30569 12.5824 3.29326C12.5783 3.27978 12.5732 3.26671 12.5685 3.25351C12.564 3.24105 12.5599 3.22854 12.5549 3.21625C12.5497 3.20396 12.5438 3.19214 12.5381 3.18015C12.5321 3.1675 12.5265 3.15476 12.5199 3.14239C12.5137 3.13087 12.5067 3.11991 12.5 3.10875C12.4928 3.09659 12.4859 3.0843 12.478 3.07248C12.4697 3.06008 12.4604 3.04842 12.4515 3.03649C12.4442 3.02669 12.4374 3.01658 12.4295 3.00699C12.3946 2.96451 12.3557 2.92554 12.3132 2.89068C12.3036 2.88283 12.2936 2.87601 12.2837 2.86864C12.2718 2.85971 12.2601 2.85046 12.2477 2.8422C12.2359 2.83427 12.2236 2.82742 12.2114 2.82019C12.2003 2.81348 12.1893 2.80646 12.1778 2.8003C12.1654 2.79367 12.1527 2.78804 12.14 2.7821C12.128 2.77643 12.1162 2.77044 12.1039 2.76533C12.0917 2.76025 12.0791 2.75616 12.0667 2.75171C12.0535 2.74696 12.0404 2.74188 12.0269 2.73782C12.0145 2.73406 12.0018 2.7313 11.9893 2.72813C11.9755 2.72465 11.9619 2.72081 11.9479 2.71802C11.9334 2.71514 11.9187 2.71343 11.9041 2.71133C11.8918 2.70956 11.8797 2.70724 11.8673 2.706C11.8404 2.70335 11.8133 2.70194 11.7863 2.70191C11.7859 2.70189 11.7855 2.70186 11.7851 2.70186L7.07105 2.70186C6.61082 2.70186 6.23771 3.07497 6.23771 3.53519C6.23771 3.99542 6.61082 4.36853 7.07105 4.36853L9.77324 4.36853L2.94627 11.1955C2.62083 11.5209 2.62083 12.0486 2.94627 12.374C3.2717 12.6994 3.79932 12.6994 4.12476 12.374L10.9517 5.54702V8.24922C10.9517 8.70945 11.3248 9.08256 11.7851 9.08256C12.2453 9.08256 12.6184 8.70945 12.6184 8.24922V3.53519C12.6184 3.53475 12.6184 3.53437 12.6184 3.53398C12.6182 3.50685 12.6168 3.47981 12.6142 3.45291Z'
                fill={palette.secondary.main}
              />
            </svg>
          </Box>
        </Box>
      </a>
      {/* {item.status === 'complete' ? (<SuccessTxIcon />) : (<ErrorTxIcon />)} */}
      {item.complete ? (
        <img
          src={SuccessIcon}
          alt='Complete'
          style={{ height: '18px', width: '18px' }}
        />
      ) : (
        <img
          src={CancelIcon}
          alt='Incomplete'
          style={{ height: '18px', width: '18px' }}
        />
      )}
    </Box>
  ));

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
        <ModalContainer size='sm'>
          <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
            <Box
              className={!mobile ? classes.mainCard : classes.mainCardMobile}
            >
              <Box
                className={
                  !mobile ? classes.topSection : classes.topSectionMobile
                }
              >
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <Box marginTop='6px'>
                    <svg
                      width='13'
                      height='15'
                      viewBox='0 0 13 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M6.04184 6.59351C4.22392 6.59351 2.74503 5.11462 2.74503 3.29675C2.74503 1.47889 4.22392 0 6.04184 0C7.85975 0 9.33864 1.47889 9.33864 3.29675C9.33864 5.11462 7.85975 6.59351 6.04184 6.59351ZM12.0837 14.2122C12.0837 14.6474 11.7309 15.0002 11.2957 15.0002H0.788069C0.352845 15.0002 0 14.6474 0 14.2122C0 10.8807 2.71038 8.17031 6.04186 8.17031C9.37334 8.17031 12.0837 10.8807 12.0837 14.2122Z'
                        fill='#646464'
                      />
                    </svg>
                  </Box>
                  <a
                    className={classes.accountLink}
                    href={`https://etherscan.io/address/${account}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Typography className={classes.title}>Account</Typography>
                  </a>
                </Box>
                <Box
                  width='100%'
                  marginTop='24px'
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                  >
                    <Typography
                      className={classes.greyText}
                      style={{ fontWeight: 400, lineHeight: '12px' }}
                    >
                      Address
                    </Typography>
                    <a
                      className={classes.addressAnchor}
                      href={`https://etherscan.io/address/${account}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Typography className={classes.addressText}>
                        {shortenAddress(account ?? '')}
                      </Typography>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          opacity='0.5'
                          d='M12.6142 3.45291C12.613 3.44043 12.6106 3.42835 12.6089 3.41604C12.6068 3.40145 12.6051 3.38679 12.6022 3.37228C12.5994 3.35825 12.5955 3.34466 12.5921 3.33091C12.5889 3.31834 12.5861 3.30569 12.5824 3.29326C12.5783 3.27978 12.5732 3.26671 12.5685 3.25351C12.564 3.24105 12.5599 3.22854 12.5549 3.21625C12.5497 3.20396 12.5438 3.19214 12.5381 3.18015C12.5321 3.1675 12.5265 3.15476 12.5199 3.14239C12.5137 3.13087 12.5067 3.11991 12.5 3.10875C12.4928 3.09659 12.4859 3.0843 12.478 3.07248C12.4697 3.06008 12.4604 3.04842 12.4515 3.03649C12.4442 3.02669 12.4374 3.01658 12.4295 3.00699C12.3946 2.96451 12.3557 2.92554 12.3132 2.89068C12.3036 2.88283 12.2936 2.87601 12.2837 2.86864C12.2718 2.85971 12.2601 2.85046 12.2477 2.8422C12.2359 2.83427 12.2236 2.82742 12.2114 2.82019C12.2003 2.81348 12.1893 2.80646 12.1778 2.8003C12.1654 2.79367 12.1527 2.78804 12.14 2.7821C12.128 2.77643 12.1162 2.77044 12.1039 2.76533C12.0917 2.76025 12.0791 2.75616 12.0667 2.75171C12.0535 2.74696 12.0404 2.74188 12.0269 2.73782C12.0145 2.73406 12.0018 2.7313 11.9893 2.72813C11.9755 2.72465 11.9619 2.72081 11.9479 2.71802C11.9334 2.71514 11.9187 2.71343 11.9041 2.71133C11.8918 2.70956 11.8797 2.70724 11.8673 2.706C11.8404 2.70335 11.8133 2.70194 11.7863 2.70191C11.7859 2.70189 11.7855 2.70186 11.7851 2.70186L7.07105 2.70186C6.61082 2.70186 6.23771 3.07497 6.23771 3.53519C6.23771 3.99542 6.61082 4.36853 7.07105 4.36853L9.77324 4.36853L2.94627 11.1955C2.62083 11.5209 2.62083 12.0486 2.94627 12.374C3.2717 12.6994 3.79932 12.6994 4.12476 12.374L10.9517 5.54702V8.24922C10.9517 8.70945 11.3248 9.08256 11.7851 9.08256C12.2453 9.08256 12.6184 8.70945 12.6184 8.24922V3.53519C12.6184 3.53475 12.6184 3.53437 12.6184 3.53398C12.6182 3.50685 12.6168 3.47981 12.6142 3.45291Z'
                          fill='#5294FF'
                        />
                      </svg>
                    </a>
                  </Box>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    width='174px'
                  >
                    <Button
                      variant='outlined'
                      color='secondary'
                      className={classes.borderedBox}
                      onClick={onCopy}
                      startIcon={
                        <Box margin='2px 0 0 8px'>
                          {check ? (
                            <CheckIcon />
                          ) : (
                            <svg
                              width='13'
                              height='15'
                              viewBox='0 0 13 15'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M10.7201 0H4.4183C3.50291 0 2.75815 0.74476 2.75815 1.66015V1.8639H1.66015C0.74476 1.8639 0 2.60866 0 3.52404V13.3399C0 14.2552 0.74476 15 1.66015 15H7.96198C8.87736 15 9.62205 14.2552 9.62205 13.3399V13.1361H10.7201C11.6354 13.1361 12.3802 12.3913 12.3802 11.476V1.66015C12.3803 0.74476 11.6355 0 10.7201 0ZM8.55124 13.3399C8.55124 13.6648 8.28688 13.9291 7.96205 13.9291H1.66015C1.33524 13.9291 1.07088 13.6648 1.07088 13.3399V3.52397C1.07088 3.19907 1.33524 2.93471 1.66015 2.93471H7.96198C8.28688 2.93471 8.55117 3.19907 8.55117 3.52397V13.3399H8.55124ZM11.3094 11.476C11.3094 11.8009 11.045 12.0652 10.7201 12.0652H9.62212V3.52397C9.62212 2.60859 8.87736 1.86383 7.96205 1.86383H3.82903V1.66007C3.82903 1.33517 4.09339 1.07081 4.4183 1.07081H10.7201C11.045 1.07081 11.3094 1.33517 11.3094 1.66007V11.476Z'
                                fill={palette.secondary.main}
                              />
                            </svg>
                          )}
                        </Box>
                      }
                    ></Button>
                    <Button
                      variant='outlined'
                      color='secondary'
                      className={classes.borderedBoxLarge}
                      onClick={handleDisconnect}
                      endIcon={
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          marginTop='2px'
                        >
                          <svg
                            width='18'
                            height='19'
                            viewBox='0 0 18 19'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              opacity='0.5'
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M12.6914 15.6875V14.2812C12.6914 13.8929 12.3766 13.5781 11.9883 13.5781C11.5999 13.5781 11.2852 13.8929 11.2852 14.2812V15.6875C11.2852 16.4629 10.6543 17.0938 9.87891 17.0938H2.8125C2.03714 17.0938 1.40625 16.4629 1.40625 15.6875V3.3125C1.40625 2.53714 2.03714 1.90625 2.8125 1.90625H9.87891C10.6543 1.90625 11.2852 2.53714 11.2852 3.3125V4.71875C11.2852 5.10712 11.5999 5.42188 11.9883 5.42188C12.3766 5.42188 12.6914 5.10712 12.6914 4.71875V3.3125C12.6914 1.76164 11.4298 0.5 9.87891 0.5H2.8125C1.26164 0.5 0 1.76164 0 3.3125V15.6875C0 17.2384 1.26164 18.5 2.8125 18.5H9.87891C11.4298 18.5 12.6914 17.2384 12.6914 15.6875ZM15.9107 6.71771L17.4852 8.29219C18.1706 8.9776 18.1706 10.0927 17.4852 10.7781L15.9107 12.3526C15.7733 12.4899 15.5934 12.5586 15.4134 12.5586C15.2335 12.5586 15.0536 12.4899 14.9163 12.3526C14.6416 12.0781 14.6416 11.6329 14.9163 11.3583L16.0362 10.2383H7.59375C7.20538 10.2383 6.89062 9.92352 6.89062 9.53516C6.89062 9.14679 7.20538 8.83203 7.59375 8.83203H16.0362L14.9163 7.71198C14.6416 7.43745 14.6416 6.99223 14.9163 6.71771C15.1908 6.44305 15.636 6.44305 15.9107 6.71771Z'
                              fill={palette.secondary.main}
                            />
                          </svg>
                        </Box>
                      }
                    >
                      Disconnect
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box
                className={
                  !mobile ? classes.botSection : classes.botSectionMobile
                }
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  marginRight='8px'
                >
                  {!!txHistory.length && (
                    <Typography className={classes.sectionHeader}>
                      Recent transactions
                    </Typography>
                  )}
                  {!!txHistory.length && (
                    <Box className={classes.clear} onClick={clearTxHistory}>
                      <Typography className={classes.greyText}>
                        Clear all
                      </Typography>
                    </Box>
                  )}
                  {!txHistory.length && (
                    <Box className={classes.noRecentTransaction}>
                      <Typography className={classes.greyText}>
                        No recent transactions
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              {!!txHistory.length && (
                <Box
                  className={classes.transactionListContainer}
                  style={!moreThanFiveTXs ? { marginRight: '14px' } : {}}
                >
                  {mappedRecentTransactions}
                </Box>
              )}
            </Box>

            <Box
              id='exitId'
              className={
                !mobile ? classes.exitContainer : classes.exitContainerMobile
              }
              onClick={onClose}
            >
              <img src={XOut} alt='Exit' style={{ padding: '6px' }} />
            </Box>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default TransactionsModal;
