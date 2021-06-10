import React, { useState } from 'react';
import {
  Typography,
  Modal,
  Box,
  Button,
  ButtonBase,
  Input,
  Menu,
  MenuItem,
  Tooltip,
  Fade,
  Backdrop
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';

import { ModalContainer } from 'components';

import XOut from 'assets/svg/XOutGrey.svg';
import AAVE from 'assets/images/AAVE-icon.png';
import DAI from 'assets/images/DAI-icon.png';
import ETH from 'assets/images/ETH-icon.png';
import WBTC from 'assets/images/WBTC-icon.png';
import LINK from 'assets/svg/LINK-icon.svg';
import { ReactComponent as Down } from 'assets/svg/DropDownArrow.svg';
import { ReactComponent as Up } from 'assets/svg/DropDownUpArrow.svg'; 
import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsGear.svg'; 
import { ReactComponent as Search } from 'assets/svg/Search.svg'; 
import { ReactComponent as SwitchArrows } from 'assets/svg/SwitchTokensArrows.svg';
import { ReactComponent as InfoIcon } from 'assets/svg/TooltipQuestionmark.svg'; 
import { ReactComponent as ApprovedIcon } from 'assets/svg/ApprovedTick.svg';
import { ReactComponent as UniSwap } from 'assets/svg/UNI-icon.svg';

import { useSwapSettings } from 'state/swap/hooks';

import { SwapSettings } from './components';

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
    justifyContent: 'flex-start',
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
  swapButtonWrapper: {
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
    '&:hover': {
      backgroundColor: palette.background.paper,
    },
  },
  swapButtonWrapperMobile: {
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
  swapTokenButton: {
    transition: 'transform 250ms ease-in-out',

    '&.switched': {
      transform: 'rotate(180deg)',
    },

    '&:hover svg path': {
      fill: palette.text.primary,
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
    height: '45px',
    width: '100%',
    maxWidth: '250px',
    border: `1px solid ${palette.divider}`,
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    padding: '13px 90px 13px 14px',
    color: palette.text.primary,
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      border: `1px solid ${palette.primary.main}`,
      backgroundColor: palette.primary.dark,
      boxShadow: 'none',
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
    height: '45px',
    width: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
    borderLeft: 'none',
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
    border: `1px solid ${palette.divider}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: palette.primary.dark,
      border: `1px solid ${palette.primary.main}`,
      borderLeft: '0px',
      boxShadow: 'none',
      '& .MuiTypography-root': {
        color: palette.primary.main
      },
      '& svg': {
        stroke: palette.primary.main
      },
    },
    '&:before': {
      borderColor: palette.background.paper,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderColor: palette.background.paper,
    },
    '&:after': {
      borderColor: palette.background.paper,
      '& .MuiTypography-root': {
        color: palette.primary.main
      }
    },
    '&:select': {
      paddingRight: '0px',
      '&:after': {
        paddingRight: '0px',
      },
    },
  },
  borderedSelectorActive: {
    height: '45px',
    width: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
    borderLeft: 'none',
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
    border: `1px solid ${palette.divider}`,
    cursor: 'pointer',
    '& .MuiTypography-root': {
      color: palette.primary.main
    },
  },
  tokenTickerInSelector: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
    color: palette.text.primary,
  },
  coloredSelector: {
    height: '45px',
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
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '18px',
    marginLeft: '15px',
    color: palette.background.paper,
  },
  maxButtonContainer: {
    position: 'relative',
    top: -40,
    right: -168,
    zIndex: 5,
    borderRadius: '12px',
    width: '74px',
    height: '35px,',
  },
  maxButtonContainerMobile: {
    position: 'relative',
    top: -40,
    right: -113,
    zIndex: 3,
    borderRadius: '12px',
    width: '74px',
    height: '35px,',
  },
  maxButton: {
    '&:hover': {
      backgroundColor: palette.primary.main,
      color: palette.background.paper,
    },
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
  settingsContainer: {
    position: 'absolute',
    top: 32,
    left: 'calc(50% - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 10px',
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
  settingsContainerMobile: {
    position: 'absolute',
    top: 'calc(20vh + 40px)',
    left: 'calc(50% - 150px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '26px',
    height: '26px',
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
    borderBottom: `1px solid ${palette.divider}`,
  },
  searchAssetMenuContainerMobile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '308px',
    height: '70px',
    padding: '15px 11px 15px 15px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '375px',
    height: '54px',
    paddingRight: '20px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  menuItemMobile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '308px',
    height: '54px',
    paddingRight: '20px',
    borderBottom: `1px solid ${palette.divider}`,
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
      display: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderColor: palette.background.paper,
    },
    '&:after': {
      // 
      display: 'none',
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
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: DAI,
    balance: 556,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: ETH,
    balance: 3543,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    icon: WBTC,
    balance: 2,
  },
  {
    symbol: 'AAVE',
    name: 'Aave',
    icon: AAVE,
    balance: 0,
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    icon: LINK,
    balance: 876,
  },
];

export interface SwapModalProps {
  open: boolean;
  onClose: () => void;
}

const SwapModal: React.FC<SwapModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const [editSettings, setEdditSettings] = React.useState(false);
  const [switched, setSwitched] = useState(false);
  const { palette } = theme;
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
    setSwitched(!switched);
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
      key={item.symbol}
      onClick={() => handleSelectFromToken(index)}
    >
      <Box display='flex' alignItems='center'>
        <img
          src={item.icon}
          alt={item.symbol}
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
            {item.symbol}
          </Typography>
          <Typography className={classes.menuItemAssetName}>
            {item.name}
          </Typography>
        </Box>
      </Box>
      <Typography color='textSecondary'>{item.balance}</Typography>
    </MenuItem>
  ));

  const mappedItemsTo = coinsForSwap.map((item, index) => (
    <MenuItem
      className={!mobile ? classes.menuItem : classes.menuItemMobile}
      key={item.symbol}
      onClick={() => handleSelectToToken(index)}
    >
      <Box display='flex' alignItems='center'>
        <img
          src={item.icon}
          alt={item.symbol}
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
            {item.symbol}
          </Typography>
          <Typography className={classes.menuItemAssetName}>
            {item.name}
          </Typography>
        </Box>
      </Box>
      <Typography color='textSecondary'>{item.balance}</Typography>
    </MenuItem>
  ));

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          {!editSettings ? (
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
                    <Box className={!mobile ? classes.maxButtonContainer : classes.maxButtonContainerMobile}>
                      <Button
                        color='primary'
                        variant='outlined'
                        size='small'
                        onClick={handleMax}
                        style={{ margin: '0px', width: '74px', height: '35px'}}
                        className={classes.maxButton}
                      >
                        MAX
                      </Button>
                    </Box>
                    </Box>

                    {!fromToken ? (
                      <ButtonBase
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
                            <Down stroke={palette.background.paper}/>
                          ) : (
                            <Up stroke={palette.background.paper}/>
                          )}
                        </Box>
                      </ButtonBase>
                    ) : (
                      <ButtonBase
                        className={!fromAssetOpen ? classes.borderedSelector : classes.borderedSelectorActive}
                        onClick={handleChangeFromAsset}
                        style={
                          fromAssetOpen
                            ? { borderColor: palette.primary.main }
                            : {}
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
                            alt={fromToken.symbol}
                            style={{ height: '18px' }}
                          />
                          <Typography
                            className={classes.tokenTickerInSelector}
                            style={{ marginLeft: '7px' }}
                          >
                            {fromToken.symbol}
                          </Typography>
                        </Box>
                        <Box marginRight='20px'>
                          {!fromAssetOpen ? (
                            <Down stroke={palette.secondary.main} />
                            ) : (
                            <Up stroke={palette.primary.main}/>
                          )}
                        </Box>
                      </ButtonBase>
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
                              <Search fill={palette.secondary.main} />
                            </Box>
                          }
                        />
                      </Box>
                      <Box style={{ maxHeight: '22vh', overflowX: 'auto' }}>
                        {mappedItemsFrom}
                      </Box>
                    </Menu>
                  </Box>

                  {fromToken && (
                    <Typography className={classes.smallInfoText}>
                      Balance: {fromToken?.balance} {fromToken?.symbol}
                    </Typography>
                  )}
                </Box>

                <Box
                  className={
                    !mobile ? classes.botSection : classes.botSectionMobile
                  }
                  style={true ? { paddingBottom: '0' } : {}}
                >
                  <Typography className={classes.elementHeader}>To</Typography>

                  <Box marginBottom={2}>
                    <Box
                      style={{
                        boxSizing: 'border-box',
                        width: '100%',
                        height: '46px',
                        display: 'flex',
                        marginTop: '7px',
                        maxWidth: '390px',
                      }}
                    >
                      <Box width='65%' height='46px' maxWidth='250px'>
                        <input
                          value={botInputValue}
                          onChange={handleChangeToAmount}
                          className={classes.borderedInput}
                        />
                      <Box className={!mobile ? classes.maxButtonContainer : classes.maxButtonContainerMobile}>
                        <Button
                          color='primary'
                          variant='outlined'
                          size='small'
                          onClick={handleMax}
                          style={{ margin: '0px', width: '74px', height: '35px'}}
                          className={classes.maxButton}
                        >
                          MAX
                        </Button>
                      </Box>
                      </Box>
                      <>
                        {!toToken ? (
                          <ButtonBase
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
                                <Down stroke={palette.background.paper} />
                                ) : (
                                <Up stroke={palette.background.paper}/>
                              )}
                            </Box>
                          </ButtonBase>
                        ) : (
                          <ButtonBase
                          className={!toAssetOpen ? classes.borderedSelector : classes.borderedSelectorActive}
                          onClick={handleChangeToAsset}
                            style={
                              toAssetOpen
                                ? { borderColor: palette.primary.main }
                                : {}
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
                                alt={toToken.symbol}
                                style={{ height: '18px' }}
                              />
                              <Typography
                                className={classes.tokenTickerInSelector}
                                style={{ marginLeft: '7px' }}
                              >
                                {toToken.symbol}
                              </Typography>
                            </Box>
                            <Box marginRight='20px'>
                              {!toAssetOpen ? (
                                <Down stroke={palette.secondary.main} />
                              ) : (
                                <Up stroke={palette.primary.main}/>
                              )}
                            </Box>
                          </ButtonBase>
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
                                <Search fill={palette.secondary.main} />
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

                    {toToken && (
                      <Box marginTop='2px'>
                        <Typography className={classes.smallInfoText}>
                          Balance: {toToken?.balance} {toToken?.symbol}
                        </Typography>
                      </Box>
                    )}
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
                                  fromToken ? fromToken.symbol : ''
                                } You only have to do this once per token.`}
                              >
                                <InfoIcon fill={palette.background.paper} />
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
                            startIcon={(<ApprovedIcon fill={palette.background.paper} />)}
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

                {!swapReady && (
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
                          <UniSwap fill={palette.secondary.main} />
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

              <Button
                variant='outlined'
                color='secondary'
                className={cx(
                  classes.swapTokenButton,
                  !mobile
                    ? classes.swapButtonWrapper
                    : classes.swapButtonWrapperMobile,
                  {
                    switched: switched,
                  },
                )}
                onClick={handleSwapTokenPositions}
              >
                <SwitchArrows />
              </Button>

              <Box
                id='exitId'
                className={
                  !mobile ? classes.exitContainer : classes.exitContainerMobile
                }
                onClick={onClose}
              >
                <img src={XOut} alt='Exit' style={{ padding: '6px' }} />
              </Box>
              <Box
                className={
                  !mobile
                    ? classes.settingsContainer
                    : classes.settingsContainerMobile
                }
                onClick={() => setEdditSettings(true)}
              >
                <SettingsIcon />
              </Box>
            </Box>
          ) : (
            <SwapSettings goBack={() => setEdditSettings(false)} />
          )}
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default SwapModal;
