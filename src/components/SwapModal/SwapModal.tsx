import React from 'react';
import {
  Typography,
  Modal,
  Box,
  Button,
  Input,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ModalContainer } from 'components';

import XOut from 'assets/svg/XOutGrey.svg';
import AAVE from 'assets/images/AAVE-icon.png';
import DAI from 'assets/images/DAI-icon.png';
import ETH from 'assets/images/ETH-icon.png';
import WBTC from 'assets/images/WBTC-icon.png';
import LINK from 'assets/svg/LINK-icon.svg';

import { useSwapSettings } from 'state/swap/hooks';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '448px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  wrapperMobile: {
    width: '350px',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: 'transparent',
  },
  mainCard: {
    width: '448px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `2px solid ${palette.divider}`,
    padding: '40px 0 26px',
  },
  mainCardMobile: {
    width: '350px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `2px solid ${palette.divider}`,
    padding: '40px 0 26px',
  },
  title: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '18px',
    color: palette.text.primary,
  },
  elementHeader: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    textAlign: 'left',
    marginLeft: '2px',
    color: palette.text.primary,
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
    textAlign: 'left',
    marginLeft: '2px',
    color: palette.text.secondary,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 26px 30px',
    height: '132px',
    margin: '36px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 12px 30px',
    height: '132px',
    margin: '36px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  switchBtnWrapper: {
    position: 'absolute',
    top: 204,
    width: '45px',
    height: '45px',
    padding: '0px',
    left: 'calc(50% - 22.5px)',
    display: 'flex',
    backgroundColor: palette.background.paper,
    margin: 0,
    borderRadius: '12px',
  },
  switchBtnWrapperMobile: {
    position: 'absolute',
    top: 'calc(20vh + 206px)',
    width: '45px',
    height: '45px',
    padding: '0px',
    left: 'calc(50% - 22.5px)',
    display: 'flex',
    backgroundColor: palette.background.paper,
    margin: 0,
    borderRadius: '12px',
  },
  switchBtnContainer: {
    display: 'flex',
    width: '45px',
    height: '45px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: palette.background.paper,
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 26px 22px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 12px 22px',
  },
  borderedInput: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '47px',
    width: '100%',
    maxWidth: '250px',
    border: `1px solid ${palette.divider}`,
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderRight: 'none',
    padding: '13px 90px 13px 14px',
    color: palette.text.primary,
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
    '&:after': {
      borderColor: palette.primary.dark,
    },
    '&:focus': {
      borderColor: palette.primary.main,
      outline: 'none',
      boxShadow: 'none',
      borderWidth: '1px',
      borderTopLeftRadius: '12px',
      borderBottomLeftRadius: '12px',
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px',
    },
  },
  borderedSelector: {
    height: '46px',
    width: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
    border: `1px solid ${palette.divider}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
    '&:before': {
      borderColor: palette.background.paper,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderColor: palette.background.paper,
    },
    '&:after': {
      borderColor: palette.background.paper,
    },
    '&:select': {
      paddingRight: '0px',
      '&:after': {
        paddingRight: '0px',
      },
    },
    nativeInput: {
      height: '50px',
    },
  },
  coloredSelector: {
    height: '46px',
    width: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
    cursor: 'pointer',
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%);`,
    '&:hover': {
      background: `linear-gradient(121.21deg, ${palette.success.dark} 7.78%, ${palette.success.main} 118.78%);`,
    },
    '&:before': {
      borderColor: palette.background.paper,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderColor: palette.background.paper,
    },
    '&:after': {
      borderColor: palette.background.paper,
    },
    '&:active': {
      backgroundColor: palette.primary.main,
      color: palette.background.paper,
      background: 'none',
      opacity: '1',
    },
  },
  selectorText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    marginLeft: '15px',
    color: palette.background.paper,
  },
  maxButton: {
    position: 'relative',
    top: -43,
    right: -170,
    zIndex: 3,
    width: '74px',
    '&:hover': {
      backgroundColor: palette.primary.main,
      color: palette.background.paper,
    },
  },
  maxButtonMobile: {
    position: 'relative',
    top: -42.5,
    right: -122,
    zIndex: 3,
  },
  exitContainer: {
    position: 'absolute',
    top: 32,
    right: 'calc(50% - 200px)',
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
    top: 'calc(20vh + 40px)',
    right: 'calc(50% - 150px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 6px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
  searchAssetMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '375px',
    height: '70px',
    padding: '15px 11px 15px 15px',
  },
  searchAssetMenuContainerMobile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '308px',
    height: '70px',
    padding: '15px 11px 15px 15px',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '375px',
    height: '54px',
    paddingRight: '20px',
    borderTop: `1px solid ${palette.divider}`,
  },
  menuItemMobile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '308px',
    height: '54px',
    paddingRight: '20px',
    borderTop: `1px solid ${palette.divider}`,
  },
  menuItemAssetName: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '10px',
    marginLeft: '2px',
    color: palette.text.secondary,
  },
  assetSearchInput: {
    height: '42px',
    backgroundColor: palette.secondary.dark,
    border: 'none',
    borderRadius: '12px',
    padding: '0 18px 0 8px',
    width: '100%',
    '&:before': {
      borderColor: palette.background.paper,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderColor: palette.background.paper,
    },
    '&:after': {
      borderColor: palette.background.paper,
      padding: '0 24px 0 8px',
    },
  },
  swapDetailsSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 26px 0px',
    height: '94px',
    borderTop: `1px solid ${palette.divider}`,
  },
  swapDetailsSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 16px 0px',
    height: '94px',
    borderTop: `1px solid ${palette.divider}`,
  },
  swapDetailsText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  },
}));

const coinsForSwap = [
  {
    ticker: 'DAI',
    name: 'Dai Stablecoin',
    icon: DAI,
    number: 556,
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    icon: ETH,
    number: 3543,
  },
  {
    ticker: 'WBTC',
    name: 'Wrapped Bitcoin',
    icon: WBTC,
    number: 2,
  },
  {
    ticker: 'AAVE',
    name: 'Aave',
    icon: AAVE,
    number: 0,
  },
  {
    ticker: 'LINK',
    name: 'Chainlink',
    icon: LINK,
    number: 876,
  },
];

export interface SwapModalProps {
  open: boolean;
  onClose: () => void;
}

const SwapModal: React.FC<SwapModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { palette } = theme;
  const balance = 40012;
  const { fromToken, toToken, fromAmount, toAmount, setSwapSettings } =
    useSwapSettings();
  const [topInputValue, setTopInputValue] =
    React.useState<string | number>('0');
  const [botInputValue, setBotInputValue] =
    React.useState<string | number>('0');
  // const [searchValueFrom, setSearchValueFrom] = React.useState(null);
  // const [searchValueTo, setSearchValueTo] = React.useState(null);
  // const [tokenNeedsapproval, setTokenNeedsapproval] = React.useState(true);
  // const [approved, setApproved] = React.useState(true);
  const [fromAssetOpen, setFromAssetOpen] =
    React.useState<null | HTMLElement>(null);
  const [toAssetOpen, setToAssetOpen] =
    React.useState<null | HTMLElement>(null);

  const swapReady =
    fromToken &&
    toToken &&
    fromAmount &&
    fromAmount !== '0' &&
    toAmount &&
    toAmount !== '0';

  const handleSwapTokenPositions = () => {
    setSwapSettings({
      fromToken: toToken,
      toToken: fromToken,
      fromAmount: toAmount,
      toAmount: fromAmount,
    });
  };

  const handleMax = () => {
    // if (fromToken) {
    //   setSwapSettings({ fromAmount: fromTokenBalance });
    // }
  };

  const handleChangeFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = value.replace(/[^0-9.]/g, '');
    // if (fromTokenBalance && parseFloat(numberValue) <= parseFloat(fromTokenBalance)) {
    //   setSwapSettings({ fromAmount: numberValue });
    // }
    setTopInputValue(numberValue);
    setSwapSettings({ fromAmount: numberValue });
  };

  const handleChangeToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = value.replace(/[^0-9.]/g, '');
    setBotInputValue(numberValue);
    setSwapSettings({ toAmount: numberValue });
  };

  const handleChangeFromAsset = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const top = document.getElementById('topTarget');
    setFromAssetOpen(top);
  };

  const handleChangeToAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
    const bottom = document.getElementById('bottomTarget');
    setToAssetOpen(bottom);
  };

  const handleClosefromAsset = () => {
    setFromAssetOpen(null);
  };

  const handleCloseToAsset = () => {
    setToAssetOpen(null);
  };

  const handleSelectFromToken = (index: number) => {
    setSwapSettings({ fromToken: coinsForSwap[index] });
    handleClosefromAsset();
  };

  const handleSelectToToken = (index: number) => {
    setSwapSettings({ toToken: coinsForSwap[index] });
    handleCloseToAsset();
  };

  const mappedItemsFrom = coinsForSwap.map((item, index) => (
    <MenuItem
      className={!mobile ? classes.menuItem : classes.menuItemMobile}
      key={item.ticker}
      onClick={() => handleSelectFromToken(index)}
    >
      <Box display='flex' alignItems='center'>
        <img
          src={item.icon}
          alt={item.ticker}
          style={{ width: '28px', height: '28px' }}
        />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          marginLeft='6px'
          height='28px'
        >
          <Typography className={classes.elementHeader} color='textPrimary'>
            {item.ticker}
          </Typography>
          <Typography className={classes.menuItemAssetName}>
            {item.name}
          </Typography>
        </Box>
      </Box>
      <Typography color='textSecondary'>{item.number}</Typography>
    </MenuItem>
  ));

  const mappedItemsTo = coinsForSwap.map((item, index) => (
    <MenuItem
      className={!mobile ? classes.menuItem : classes.menuItemMobile}
      key={item.ticker}
      onClick={() => handleSelectToToken(index)}
    >
      <Box display='flex' alignItems='center'>
        <img
          src={item.icon}
          alt={item.ticker}
          style={{ width: '28px', height: '28px' }}
        />
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          marginLeft='6px'
          height='28px'
        >
          <Typography className={classes.elementHeader} color='textPrimary'>
            {item.ticker}
          </Typography>
          <Typography className={classes.menuItemAssetName}>
            {item.name}
          </Typography>
        </Box>
      </Box>
      <Typography color='textSecondary'>{item.number}</Typography>
    </MenuItem>
  ));

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='lg'>
        <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
          <Box
            width={1}
            className={!mobile ? classes.mainCard : classes.mainCardMobile}
          >
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Typography color='primary' className={classes.title}>
                Swap
              </Typography>
            </Box>

            <Box
              className={
                !mobile ? classes.topSection : classes.topSectionMobile
              }
            >
              <Typography className={classes.elementHeader}>From</Typography>

              <Box
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '46px',
                  display: 'flex',
                  margin: '7px 2px 2px',
                }}
                id='topTarget'
              >
                <Box width='65%' height='46px' maxWidth='250px'>
                  <input
                    value={topInputValue}
                    onChange={handleChangeFromAmount}
                    className={classes.borderedInput}
                  />
                  <Button
                    color='primary'
                    variant='outlined'
                    size='small'
                    className={
                      !mobile ? classes.maxButton : classes.maxButtonMobile
                    }
                    onClick={handleMax}
                  >
                    MAX
                  </Button>
                </Box>

                {!fromToken ? (
                  <Box
                    className={classes.coloredSelector}
                    onClick={handleChangeFromAsset}
                    style={
                      fromAssetOpen
                        ? {
                            background: 'none',
                            backgroundColor: palette.primary.main,
                          }
                        : {}
                    }
                  >
                    <Typography
                      className={classes.selectorText}
                      style={mobile ? { marginLeft: '8px' } : {}}
                    >
                      Select token
                    </Typography>
                    <Box marginRight={!mobile ? '20px' : '16px'}>
                      {!fromAssetOpen ? (
                        <svg
                          width='12'
                          height='7'
                          viewBox='0 0 12 7'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M11 1L6 6L1 1'
                            stroke={palette.background.paper}
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      ) : (
                        <svg
                          width='12'
                          height='7'
                          viewBox='0 0 12 7'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M11 6L6 1L1 6'
                            stroke={palette.background.paper}
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className={classes.borderedSelector}
                    onClick={handleChangeFromAsset}
                    style={
                      fromAssetOpen ? { borderColor: palette.primary.main } : {}
                    }
                  >
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      marginLeft='12px'
                      alignItems='center'
                    >
                      <img
                        src={fromToken.icon}
                        alt={fromToken.ticker}
                        style={{ height: '18px' }}
                      />
                      <Typography
                        component='span'
                        color='textPrimary'
                        style={{ marginLeft: '7px' }}
                      >
                        {fromToken.ticker}
                      </Typography>
                    </Box>
                    <Box marginRight='20px'>
                      {!fromAssetOpen ? (
                        <svg
                          width='12'
                          height='7'
                          viewBox='0 0 12 7'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M11 1L6 6L1 1'
                            stroke={palette.secondary.main}
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      ) : (
                        <svg
                          width='12'
                          height='7'
                          viewBox='0 0 12 7'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M11 6L6 1L1 6'
                            stroke={palette.secondary.main}
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      )}
                    </Box>
                  </Box>
                )}

                <Menu
                  id='simple-menu'
                  anchorEl={fromAssetOpen}
                  keepMounted
                  open={Boolean(fromAssetOpen)}
                  onClose={handleClosefromAsset}
                  style={{ marginTop: '85px' }}
                >
                  <Box
                    className={
                      !mobile
                        ? classes.searchAssetMenuContainer
                        : classes.searchAssetMenuContainerMobile
                    }
                  >
                    <Input
                      className={classes.assetSearchInput}
                      // value={searchValueFrom}
                      placeholder='Search...'
                      endAdornment={
                        <Box>
                          <svg
                            width='16'
                            height='17'
                            viewBox='0 0 16 17'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M7.04606 0.0878906C3.16097 0.0878906 0 3.24886 0 7.13395C0 11.0193 3.16097 14.18 7.04606 14.18C8.75506 14.18 10.3239 13.5685 11.5452 12.5527L14.8897 15.8973C15.0168 16.0244 15.1831 16.0879 15.3496 16.0879C15.5159 16.0879 15.6824 16.0244 15.8094 15.8973C16.0635 15.6435 16.0635 15.2315 15.8094 14.9776L12.4649 11.6331C13.4806 10.4118 14.0921 8.84295 14.0921 7.13395C14.0921 3.24886 10.9314 0.0878906 7.04606 0.0878906ZM7.04606 12.8792C3.87816 12.8792 1.30081 10.3019 1.30081 7.13398C1.30081 3.96608 3.87816 1.3887 7.04606 1.3887C10.214 1.3887 12.7913 3.96605 12.7913 7.13395C12.7913 10.3019 10.214 12.8792 7.04606 12.8792Z'
                              fill='#646464'
                            />
                          </svg>
                        </Box>
                      }
                    />
                  </Box>
                  <Box style={{ maxHeight: '22vh', overflowX: 'auto' }}>
                    {mappedItemsFrom}
                  </Box>
                </Menu>
              </Box>

              <Typography
                className={classes.smallInfoText}
              >{`Balance: ${balance}`}</Typography>
            </Box>

            <Box
              className={
                !mobile ? classes.botSection : classes.botSectionMobile
              }
              style={true ? { paddingBottom: '0' } : {}}
            >
              <Typography className={classes.elementHeader}>To</Typography>
              <Box
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '46px',
                  display: 'flex',
                  margin: '7px 0px 18px',
                  maxWidth: '390px',
                }}
              >
                <Box width='65%' height='46px' maxWidth='250px'>
                  <input
                    value={botInputValue}
                    onChange={handleChangeToAmount}
                    className={classes.borderedInput}
                  />
                </Box>
                <>
                  {!toToken ? (
                    <Box
                      className={classes.coloredSelector}
                      onClick={handleChangeToAsset}
                      style={
                        toAssetOpen
                          ? {
                              background: 'none',
                              backgroundColor: palette.primary.main,
                            }
                          : {}
                      }
                    >
                      <Typography
                        className={classes.selectorText}
                        style={mobile ? { marginLeft: '8px' } : {}}
                      >
                        Select token
                      </Typography>
                      <Box marginRight={!mobile ? '20px' : '16px'}>
                        {!toAssetOpen ? (
                          <svg
                            width='12'
                            height='7'
                            viewBox='0 0 12 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M11 1L6 6L1 1'
                              stroke={palette.background.paper}
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        ) : (
                          <svg
                            width='12'
                            height='7'
                            viewBox='0 0 12 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M11 6L6 1L1 6'
                              stroke={palette.background.paper}
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      className={classes.borderedSelector}
                      onClick={handleChangeToAsset}
                      style={
                        toAssetOpen ? { borderColor: palette.primary.main } : {}
                      }
                    >
                      <Box
                        display='flex'
                        justifyContent='space-between'
                        marginLeft='12px'
                        alignItems='center'
                      >
                        <img
                          src={toToken.icon}
                          alt={toToken.ticker}
                          style={{ height: '18px' }}
                        />
                        <Typography
                          component='span'
                          color='textPrimary'
                          style={{ marginLeft: '7px' }}
                        >
                          {toToken.ticker}
                        </Typography>
                      </Box>
                      <Box marginRight='20px'>
                        {!toAssetOpen ? (
                          <svg
                            width='12'
                            height='7'
                            viewBox='0 0 12 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M11 1L6 6L1 1'
                              stroke={palette.secondary.main}
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        ) : (
                          <svg
                            width='12'
                            height='7'
                            viewBox='0 0 12 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M11 6L6 1L1 6'
                              stroke={palette.secondary.main}
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        )}
                      </Box>
                    </Box>
                  )}
                </>
                <Menu
                  id='simple-menu2'
                  anchorEl={toAssetOpen}
                  keepMounted
                  open={Boolean(toAssetOpen)}
                  onClose={handleCloseToAsset}
                  style={{ marginTop: '21px' }}
                >
                  <Box
                    className={
                      !mobile
                        ? classes.searchAssetMenuContainer
                        : classes.searchAssetMenuContainerMobile
                    }
                  >
                    <Input
                      className={classes.assetSearchInput}
                      // value={searchValueFrom}
                      placeholder='Search...'
                      endAdornment={
                        <Box>
                          <svg
                            width='16'
                            height='17'
                            viewBox='0 0 16 17'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M7.04606 0.0878906C3.16097 0.0878906 0 3.24886 0 7.13395C0 11.0193 3.16097 14.18 7.04606 14.18C8.75506 14.18 10.3239 13.5685 11.5452 12.5527L14.8897 15.8973C15.0168 16.0244 15.1831 16.0879 15.3496 16.0879C15.5159 16.0879 15.6824 16.0244 15.8094 15.8973C16.0635 15.6435 16.0635 15.2315 15.8094 14.9776L12.4649 11.6331C13.4806 10.4118 14.0921 8.84295 14.0921 7.13395C14.0921 3.24886 10.9314 0.0878906 7.04606 0.0878906ZM7.04606 12.8792C3.87816 12.8792 1.30081 10.3019 1.30081 7.13398C1.30081 3.96608 3.87816 1.3887 7.04606 1.3887C10.214 1.3887 12.7913 3.96605 12.7913 7.13395C12.7913 10.3019 10.214 12.8792 7.04606 12.8792Z'
                              fill='#646464'
                            />
                          </svg>
                        </Box>
                      }
                    />
                  </Box>
                  <Box
                    style={{
                      maxHeight: '20vh',
                      overflowX: 'auto',
                      borderBottomLeftRadius: '12px',
                      WebkitBorderBottomRightRadius: '12px',
                    }}
                  >
                    {mappedItemsTo}
                  </Box>
                </Menu>
              </Box>
              <>
                {true && (
                  <>
                    {!true ? (
                      <Button
                        color='primary'
                        variant='contained'
                        id='bottomTarget'
                        size='large'
                        endIcon={
                          <Tooltip
                            arrow
                            leaveTouchDelay={1500}
                            title={`You must give Premia permission to use your ${
                              fromToken ? fromToken.ticker : ''
                            } You only have to do this once per token.`}
                          >
                            <svg
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.89675 8.46456L6.92942 7.59344C7.43031 7.58618 7.87131 7.5027 8.25242 7.343C8.63353 7.1833 8.93479 6.94011 9.15619 6.61344C9.3776 6.28678 9.48831 5.873 9.48831 5.37211C9.48831 4.88574 9.38123 4.47378 9.16708 4.13622C8.95294 3.79867 8.65894 3.53915 8.28508 3.35767C7.91123 3.17619 7.48112 3.08544 6.99475 3.08544C6.47208 3.08544 6.02382 3.18344 5.64997 3.37944C5.27612 3.57544 4.99119 3.84404 4.79519 4.18522C4.59919 4.52641 4.50482 4.91478 4.51208 5.35033H5.82964C5.82964 5.00915 5.93127 4.73874 6.13453 4.53911C6.33779 4.33948 6.6209 4.23967 6.98386 4.23967C7.33231 4.23967 7.61179 4.33948 7.82231 4.53911C8.03282 4.73874 8.13808 5.01278 8.13808 5.36122C8.13808 5.72418 8.04734 6.00004 7.86586 6.18878C7.68438 6.37752 7.44119 6.50456 7.13631 6.56989C6.83142 6.63522 6.49386 6.66789 6.12364 6.66789H5.62275L5.66631 8.46456H6.89675ZM6.28697 10.9146C6.54105 10.9146 6.74794 10.8347 6.90764 10.675C7.06734 10.5153 7.14719 10.3229 7.14719 10.0979C7.14719 9.86559 7.06734 9.66959 6.90764 9.50989C6.74794 9.35019 6.54105 9.27033 6.28697 9.27033C6.0329 9.27033 5.82419 9.35019 5.66086 9.50989C5.49753 9.66959 5.41586 9.86559 5.41586 10.0979C5.41586 10.3229 5.49753 10.5153 5.66086 10.675C5.82419 10.8347 6.0329 10.9146 6.28697 10.9146Z'
                                fill={palette.background.default}
                              />
                            </svg>
                          </Tooltip>
                        }
                        style={{ marginBottom: '10px' }}
                      >
                        {`Approve ${`Link`}`}
                      </Button>
                    ) : (
                      <Button
                        color='primary'
                        variant='contained'
                        id='bottomTarget'
                        disabled
                        size='large'
                        startIcon={
                          <svg
                            width='12'
                            height='9'
                            viewBox='0 0 12 9'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M4.59551 8.82662C4.48097 8.93791 4.32468 9 4.16234 9C4 9 3.84372 8.93791 3.72917 8.82662L0.269748 5.48465C-0.0892649 5.13789 -0.0892649 4.57558 0.269748 4.22947L0.702919 3.81096C1.06204 3.4642 1.64353 3.4642 2.00255 3.81096L4.16234 5.8972L9.99843 0.260075C10.3576 -0.0866916 10.9396 -0.0866916 11.2981 0.260075L11.7312 0.678579C12.0902 1.02535 12.0902 1.58754 11.7312 1.93377L4.59551 8.82662Z'
                              fill={palette.background.paper}
                            />
                          </svg>
                        }
                        style={{ marginBottom: '10px' }}
                      >
                        Approved
                      </Button>
                    )}
                  </>
                )}
                <Button
                  color='primary'
                  variant='contained'
                  disabled={false}
                  id='bottomTarget'
                  size='large'
                  style={{ marginBottom: '20px' }}
                >
                  Swap
                </Button>
              </>
            </Box>

            {swapReady && (
              <Box
                className={
                  !mobile
                    ? classes.swapDetailsSection
                    : classes.swapDetailsSectionMobile
                }
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography
                    className={classes.swapDetailsText}
                    color='textSecondary'
                  >
                    Minimum Receive
                  </Typography>
                  <Typography
                    className={classes.swapDetailsText}
                    color='textPrimary'
                  >
                    {4.474}
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography
                    className={classes.swapDetailsText}
                    color='textSecondary'
                  >
                    Price Slippage
                  </Typography>
                  <Typography
                    className={classes.swapDetailsText}
                    color='textPrimary'
                  >
                    {`${0.5}%`}
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography
                    className={classes.swapDetailsText}
                    color='textSecondary'
                  >
                    Route
                  </Typography>
                  <Box display='flex' alignItems='center' height='18px'>
                    <Box style={{ margin: '2px 6px 0px 0px' }}>
                      <svg
                        width='16'
                        height='18'
                        viewBox='0 0 16 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          id='Combined Shape Copy 5'
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M0.892928 1.36554C2.93716 3.84845 6.08685 7.7088 6.24478 7.91936C6.37638 8.09483 6.32374 8.26153 6.1044 8.38436C5.98157 8.45455 5.72714 8.52474 5.60431 8.52474C5.46393 8.52474 5.29724 8.45455 5.18318 8.34049C5.10422 8.26153 4.76205 7.76144 3.98998 6.55947C3.40216 5.63825 2.90206 4.87495 2.89329 4.86618C2.8894 4.86423 2.88594 4.8625 2.88433 4.86357C2.87134 4.87212 2.97681 5.06058 3.92853 6.7612L3.92857 6.76126C4.60413 7.96323 4.82347 8.39313 4.82347 8.44577C4.82347 8.55983 4.78837 8.62124 4.64799 8.77917C4.41111 9.04237 4.30583 9.34067 4.22687 9.96359C4.13913 10.6567 3.90225 11.148 3.22668 11.9815C2.83188 12.4728 2.77046 12.5606 2.67395 12.7623C2.55112 13.008 2.51603 13.1484 2.49848 13.4642C2.48094 13.7976 2.51603 14.0082 2.61254 14.324C2.70027 14.6048 2.79678 14.789 3.03367 15.1487C3.23546 15.4646 3.35829 15.7015 3.35829 15.7892C3.35829 15.8594 3.37583 15.8594 3.69168 15.7892C4.4462 15.6137 5.06912 15.3154 5.41129 14.947C5.62186 14.7188 5.6745 14.596 5.6745 14.2802C5.6745 14.0784 5.66572 14.0345 5.61308 13.9117C5.52535 13.7187 5.35865 13.5607 4.99894 13.3151C4.52517 12.9905 4.32337 12.7273 4.27073 12.3763C4.22687 12.078 4.27951 11.8762 4.54271 11.3235C4.81469 10.7532 4.88488 10.5163 4.92875 9.93727C4.95507 9.56878 4.99894 9.41963 5.10422 9.30558C5.21827 9.18275 5.31478 9.13888 5.58676 9.10379C6.03421 9.04237 6.32374 8.92832 6.55185 8.70898C6.75364 8.52473 6.84137 8.34049 6.85015 8.06851L6.85892 7.86672L6.74487 7.74389C6.33251 7.27012 0.620949 0.988281 0.594629 0.988281C0.589269 0.988281 0.639564 1.05048 0.717516 1.14689C0.767176 1.20831 0.828059 1.2836 0.892928 1.36554ZM3.5863 13.8415C3.68281 13.6748 3.63017 13.4642 3.47224 13.3589C3.32309 13.2624 3.09498 13.3063 3.09498 13.4379C3.09498 13.473 3.11253 13.5081 3.16517 13.5256C3.24413 13.5695 3.25291 13.6134 3.19149 13.7099C3.13008 13.8064 3.13008 13.8941 3.20904 13.9555C3.33187 14.0521 3.49856 13.9994 3.5863 13.8415ZM6.38514 4.85739C6.2009 4.83107 6.19212 4.8223 6.27986 4.81352C6.44655 4.7872 6.83259 4.8223 7.10457 4.88371C7.73626 5.03286 8.30654 5.41889 8.91191 6.09446L9.06984 6.2787L9.29795 6.24361C10.2718 6.08568 11.272 6.20851 12.1055 6.59455C12.3336 6.69983 12.6933 6.91039 12.7372 6.96303C12.7547 6.98058 12.781 7.09464 12.7986 7.20869C12.86 7.62105 12.8337 7.92812 12.7021 8.16501C12.6319 8.29661 12.6319 8.3317 12.6758 8.44576C12.7108 8.53349 12.8161 8.59491 12.9126 8.59491C13.1232 8.59491 13.3425 8.26152 13.4478 7.79652L13.4917 7.61227L13.5707 7.70001C14.0181 8.2001 14.369 8.89321 14.4217 9.38453L14.4392 9.51613L14.3603 9.40207C14.2287 9.20028 14.1058 9.06868 13.9391 8.95462C13.6408 8.75283 13.325 8.69142 12.4915 8.64755C11.737 8.60368 11.3071 8.54227 10.886 8.40189C10.1665 8.16501 9.79804 7.85793 8.94701 6.72615C8.56975 6.22606 8.33286 5.95408 8.09598 5.72597C7.57834 5.22588 7.0607 4.96267 6.38514 4.85739ZM12.9215 5.97163C12.939 5.63824 12.9829 5.4189 13.0794 5.21711C13.1145 5.13815 13.1496 5.06796 13.1584 5.06796C13.1672 5.06796 13.1496 5.12938 13.1233 5.19956C13.0531 5.39258 13.0443 5.66456 13.0882 5.97163C13.1496 6.36644 13.1759 6.41908 13.5971 6.84899C13.7901 7.05078 14.0182 7.30521 14.1059 7.41049L14.2551 7.60351L14.1059 7.46313C13.9217 7.28766 13.5006 6.95427 13.404 6.9104C13.3426 6.87531 13.3339 6.87531 13.29 6.91918C13.2549 6.95427 13.2461 7.00691 13.2461 7.26134C13.2373 7.65615 13.1847 7.90181 13.0531 8.15624C12.9829 8.28784 12.9741 8.26152 13.0356 8.11237C13.0794 7.99832 13.0882 7.94568 13.0882 7.56842C13.0882 6.80512 13.0005 6.62088 12.4653 6.3138C12.3337 6.23484 12.1056 6.12078 11.974 6.05937C11.8336 5.99796 11.7283 5.94531 11.7371 5.94531C11.7546 5.92777 12.2723 6.07692 12.4741 6.16465C12.7811 6.28748 12.8338 6.29626 12.8689 6.28748C12.8952 6.26116 12.9127 6.19097 12.9215 5.97163ZM6.19222 5.39259C6.13957 5.98041 6.37646 6.77003 6.74495 7.27889C7.03447 7.6737 7.48192 7.98078 7.81532 8.01587C8.03466 8.03342 8.09607 7.96323 7.99956 7.82285C7.85918 7.62984 7.69249 7.32276 7.64862 7.19116C7.6223 7.1122 7.56088 6.86654 7.51702 6.65597C7.36787 5.93655 7.20994 5.64702 6.859 5.43646C6.7274 5.35749 6.45542 5.25221 6.2975 5.22589L6.20976 5.20834L6.19222 5.39259ZM12.4739 11.0954C10.7368 10.3935 10.1226 9.78812 10.1226 8.76162C10.1226 8.61247 10.1314 8.48964 10.1314 8.48964C10.1373 8.48964 10.1665 8.51303 10.2087 8.54683L10.2087 8.54683L10.2089 8.54693C10.23 8.5638 10.2543 8.58326 10.2806 8.6037C10.6315 8.88445 11.0263 9.00728 12.123 9.1652C12.7635 9.26171 13.132 9.3319 13.4653 9.44595C14.5269 9.7969 15.185 10.5163 15.3429 11.4902C15.3867 11.7709 15.3604 12.3061 15.2902 12.5869C15.2288 12.8062 15.0534 13.2098 15.0095 13.2186C15.0007 13.2186 14.9832 13.1747 14.9832 13.1045C14.9656 12.736 14.7814 12.3851 14.4743 12.1131C14.1058 11.7973 13.632 11.5604 12.4739 11.0954ZM11.1579 11.0164C11.1842 11.0866 11.2281 11.2533 11.2456 11.3849C11.386 12.2096 10.9561 12.8852 10.0875 13.1571C9.99981 13.1922 9.64887 13.2624 9.3067 13.3151C8.61359 13.4379 8.29775 13.5168 7.99067 13.666C7.77134 13.7713 7.49936 13.9292 7.5169 13.9468C7.52568 13.9555 7.57832 13.938 7.63096 13.9204C8.02577 13.7801 8.46444 13.7099 9.12246 13.6748C9.34266 13.6601 9.58743 13.6393 9.72318 13.6277L9.72335 13.6277L9.78925 13.6221C10.3771 13.5432 10.7894 13.3677 11.1053 13.0431C11.2807 12.8588 11.386 12.6921 11.4738 12.4553C11.5264 12.3061 11.5352 12.2447 11.5352 11.9815C11.5352 11.7095 11.5352 11.6569 11.4738 11.4902C11.3948 11.2708 11.3071 11.1129 11.193 10.9813L11.114 10.8848L11.1579 11.0164ZM12.0441 12.7975C11.816 12.2974 11.7633 11.8236 11.8861 11.3761C11.9037 11.3323 11.9212 11.2884 11.9388 11.2884C11.9563 11.2884 12.009 11.3147 12.0616 11.3498C12.1669 11.42 12.3862 11.5428 12.9477 11.8499C13.6584 12.236 14.062 12.5343 14.3427 12.8764C14.5884 13.1747 14.7375 13.5169 14.8077 13.938C14.8516 14.1749 14.8253 14.7452 14.7639 14.9821C14.5708 15.7278 14.1322 16.3244 13.4917 16.6666C13.3952 16.7192 13.3162 16.7543 13.3075 16.7543C13.2987 16.7543 13.3338 16.6666 13.3864 16.5613C13.597 16.1138 13.6233 15.6839 13.4654 15.2014C13.3689 14.9031 13.1671 14.5434 12.7635 13.938C12.281 13.2361 12.1669 13.0519 12.0441 12.7975ZM7.69233 14.4293C6.95535 14.5522 6.15696 14.9382 5.50772 15.4822L5.32348 15.6576L5.49017 15.6839C6.36752 15.8156 6.60441 15.9384 7.21856 16.5701C7.5695 16.9298 7.69233 17.0088 7.98185 17.0877C8.41176 17.2018 8.83288 17 8.98203 16.6139C9.04345 16.4385 9.03467 16.1577 8.96449 16.0173C8.78902 15.6752 8.27138 15.5699 8.02572 15.8156C7.82393 16.0173 7.88534 16.3332 8.13978 16.3858C8.16354 16.3898 8.17658 16.392 8.17727 16.3899C8.17811 16.3875 8.16073 16.3788 8.12223 16.3595C8.00817 16.3069 7.95553 16.2367 7.95553 16.1226C7.94676 15.8506 8.25383 15.7103 8.53458 15.8331C8.74515 15.9296 8.82411 16.0524 8.82411 16.263C8.82411 16.5876 8.54336 16.8421 8.21874 16.7982C8.04327 16.7719 7.8327 16.6666 7.71865 16.535C7.43789 16.2191 7.54318 15.7015 7.94676 15.5085C8.25383 15.3593 8.65741 15.4032 8.97326 15.605C9.33297 15.8419 9.4909 16.0524 9.79797 16.7631C9.90325 17 10.0261 17.2544 10.0875 17.3421C10.377 17.7808 10.7367 18.0002 11.1579 18.0002C11.3948 18.0002 11.5702 17.9651 11.7896 17.851C11.9475 17.772 12.1844 17.6141 12.1668 17.5966C12.1668 17.5897 12.1232 17.6045 12.0661 17.624L12.0177 17.6404C11.5527 17.8159 11.0789 17.8071 10.8069 17.6054C10.6315 17.4737 10.4911 17.2281 10.4209 16.9122L10.4123 16.8622C10.3956 16.7658 10.3615 16.5686 10.3332 16.3771C10.2366 15.7717 10.1401 15.4997 9.92957 15.1839C9.71024 14.8592 9.28911 14.596 8.82411 14.4732C8.53458 14.3942 8.00817 14.3767 7.69233 14.4293ZM6.66586 9.74427C6.72727 9.51616 6.92907 9.28805 7.13963 9.22663C7.28001 9.18277 7.55198 9.20909 7.68359 9.27927C7.93802 9.41088 8.12226 9.7004 8.0784 9.91097C8.03453 10.1654 7.62217 10.376 7.13963 10.376C6.89397 10.376 6.80624 10.3409 6.70973 10.218C6.64831 10.1391 6.63077 9.88465 6.66586 9.74427ZM7.61325 9.36699C7.74485 9.44595 7.77117 9.56 7.70098 9.66529C7.64834 9.73547 7.49042 9.80566 7.37636 9.80566C7.20089 9.80566 7.01665 9.68283 7.01665 9.56878C7.01665 9.34067 7.37636 9.21784 7.61325 9.36699Z'
                          fill={palette.secondary.main}
                        />
                      </svg>
                    </Box>
                    <Typography
                      className={classes.swapDetailsText}
                      color='textPrimary'
                    >
                      {`${'LINK'} > ${'USDC'} > ${'ETH'}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            className={
              !mobile
                ? classes.switchBtnWrapper
                : classes.switchBtnWrapperMobile
            }
            onClick={handleSwapTokenPositions}
          >
            <Box className={classes.switchBtnContainer}>
              <svg
                width='15'
                height='21'
                viewBox='0 0 15 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.00022 17.1559L5.00022 7.50107C5.00022 7.04084 4.62713 6.66775 4.16689 6.66775C3.70666 6.66775 3.33357 7.04084 3.33357 7.50107L3.33357 17.1559L1.42283 15.2451C1.0974 14.9197 0.569746 14.9197 0.244316 15.2451C-0.0811133 15.5706 -0.0811133 16.0982 0.244316 16.4237L3.57764 19.757C3.59705 19.7764 3.61748 19.7948 3.63873 19.8122C3.64834 19.8201 3.6585 19.827 3.66838 19.8344C3.68025 19.8433 3.69186 19.8524 3.70424 19.8607C3.71607 19.8687 3.72838 19.8755 3.74053 19.8828C3.7517 19.8895 3.76264 19.8965 3.77416 19.9027C3.78654 19.9093 3.79932 19.9149 3.81197 19.9209C3.82396 19.9265 3.83576 19.9325 3.84807 19.9376C3.86037 19.9427 3.87295 19.9469 3.88545 19.9513C3.89861 19.956 3.91158 19.9611 3.92502 19.9651C3.93752 19.9689 3.95021 19.9717 3.96287 19.9749C3.97658 19.9783 3.99014 19.9822 4.00412 19.9849C4.01877 19.9878 4.03354 19.9896 4.04826 19.9917C4.06041 19.9934 4.0724 19.9957 4.08471 19.9969C4.13939 20.0023 4.19451 20.0023 4.2492 19.9969C4.2615 19.9957 4.27346 19.9934 4.28564 19.9917C4.30037 19.9896 4.31518 19.9878 4.32979 19.9849C4.34377 19.9821 4.35729 19.9783 4.371 19.9748C4.38365 19.9717 4.39635 19.9689 4.40885 19.9651C4.42229 19.961 4.43529 19.956 4.44842 19.9513C4.46092 19.9468 4.4735 19.9427 4.4858 19.9376C4.49811 19.9325 4.50986 19.9265 4.52186 19.9208C4.53451 19.9149 4.54729 19.9092 4.55971 19.9026C4.57119 19.8964 4.58209 19.8894 4.59326 19.8828C4.60545 19.8755 4.61775 19.8686 4.62963 19.8607C4.64197 19.8524 4.65353 19.8433 4.66541 19.8344C4.67533 19.827 4.68549 19.8201 4.69514 19.8122C4.71623 19.7949 4.7365 19.7766 4.75576 19.7574C4.75592 19.7572 4.75607 19.7571 4.75619 19.757L8.08951 16.4237C8.41494 16.0982 8.41494 15.5706 8.08951 15.2451C7.76408 14.9197 7.23643 14.9197 6.911 15.2451L5.00022 17.1559Z'
                  fill='#8D97A0'
                />
                <path
                  d='M10.695 0.18957C10.6853 0.181602 10.6751 0.174726 10.6651 0.167266C10.6533 0.158438 10.6418 0.149259 10.6295 0.141055C10.6176 0.133086 10.6053 0.126211 10.5931 0.118945C10.5819 0.112305 10.571 0.105312 10.5596 0.0991793C10.5472 0.0925388 10.5344 0.086875 10.5217 0.0808983C10.5097 0.0752344 10.4979 0.0692968 10.4857 0.0641794C10.4734 0.0591011 10.4608 0.0549603 10.4483 0.0505075C10.4351 0.0457811 10.4222 0.0407419 10.4087 0.0366793C10.3962 0.0328903 10.3835 0.030117 10.3709 0.0269527C10.3572 0.0234766 10.3436 0.0196486 10.3297 0.0168753C10.315 0.0139847 10.3003 0.0122662 10.2855 0.0101175C10.2734 0.00839901 10.2614 0.00605488 10.2491 0.00484371C10.1944 -0.000546455 10.1393 -0.000546455 10.0846 0.00484371C10.0723 0.00605488 10.0603 0.00835991 10.0481 0.0101175C10.0334 0.0122271 10.0186 0.0139456 10.004 0.0168753C9.99002 0.0196486 9.9765 0.0234766 9.96279 0.0269527C9.95014 0.030117 9.93744 0.0328903 9.92494 0.0366793C9.9115 0.0407419 9.8985 0.0457811 9.88537 0.0505075C9.87287 0.0549994 9.86029 0.0591011 9.84799 0.0641794C9.83572 0.0692577 9.82396 0.0752344 9.81201 0.0808983C9.79932 0.086875 9.7865 0.0924997 9.77408 0.0991793C9.76264 0.105312 9.75174 0.112305 9.74061 0.118945C9.72842 0.126211 9.71607 0.133125 9.7042 0.141055C9.69189 0.149298 9.68033 0.158438 9.66854 0.167266C9.65857 0.174726 9.64838 0.181641 9.63869 0.18957C9.61779 0.206718 9.59768 0.224844 9.57854 0.243945C9.57822 0.244219 9.57791 0.244492 9.57764 0.244765L6.24432 3.57809C5.91889 3.90352 5.91889 4.43117 6.24432 4.7566C6.56975 5.08203 7.0974 5.08203 7.42283 4.7566L9.33357 2.84586V12.5007C9.33357 12.9609 9.70666 13.334 10.1669 13.334C10.6271 13.334 11.0002 12.9609 11.0002 12.5007V2.84586L12.911 4.7566C13.2364 5.08203 13.764 5.08203 14.0895 4.7566C14.4149 4.43117 14.4149 3.90352 14.0895 3.57809L10.7562 0.244765C10.7558 0.244452 10.7555 0.244219 10.7553 0.243945C10.736 0.224844 10.7159 0.206718 10.695 0.18957Z'
                  fill='#8D97A0'
                />
              </svg>
            </Box>
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
    </Modal>
  );
};

export default SwapModal;
