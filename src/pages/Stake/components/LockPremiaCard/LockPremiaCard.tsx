import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Box, Typography, Button, Menu, MenuItem } from '@material-ui/core';

import LockPremiaIcon from 'assets/images/LockPremia-icon2x.png';
import LockPremiaMobile from 'assets/images/LockPremiaMobile-icon2x.png';
import calendarIcon from 'assets/svg/CalendarIcon.svg';
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
    height: '566px',
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
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
  },
  borderedCardMobile: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '335px',
    height: '566px',
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
  },
  lockImg: {
    position: 'relative',
    top: 82,
    left: 143,
    width: '99px',
    height: '136px',
    zIndex: 2,
  },
  titleBox: {
    marginTop: '98px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  titleBoxMobile: {
    marginTop: '24px',
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
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
    '&:focus': {
      borderColor: palette.primary.main,
      outline: 'none',
      boxShadow: 'none',
      borderWidth: '1px',
    },
  },
  inputIcon: {
    position: 'relative',
    top: -38,
    left: 14,
    zIndex: 1,
  },
  maxButton: {
    position: 'relative',
    top: -43,
    right: -260,
    zIndex: 3,
    '&:hover': {
      backgroundColor: palette.primary.main,
      color: palette.background.paper,
    },
  },
  maxButtonMobile: {
    position: 'relative',
    top: -43,
    right: -227,
    zIndex: 3,
    '&:hover': {
      backgroundColor: palette.primary.main,
      color: palette.background.paper,
    },
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
    background: 'rgb(141, 151, 160, 0.4)',
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
  selectionItem: {
    color: palette.text.secondary,
    fontSize: '14px',
    height: '44px',
    lineHeight: '18px',
    borderBottom: `1px ${palette.divider} solid`,
    '&:hover': {
      color: palette.text.primary,
    },
  },
  selectionItemLast: {
    color: palette.text.secondary,
    fontSize: '14px',
    height: '44px',
    lineHeight: '18px',
    '&:hover': {
      color: palette.text.primary,
    },
  },
}));

const LockPremiaCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const progress = '75%';
  const { palette } = theme;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
      {!mobile && (
        <img
          src={LockPremiaIcon}
          alt='Lock premia'
          className={classes.lockImg}
        />
      )}
      <Box
        className={!mobile ? classes.borderedCard : classes.borderedCardMobile}
      >
        <Box className={!mobile ? classes.titleBox : classes.titleBoxMobile}>
          {mobile && (
            <img
              src={LockPremiaMobile}
              alt='Stake premia'
              style={{ height: '80px', width: '58.24px' }}
            />
          )}
          <Box>
            <Typography
              component='h2'
              color='textPrimary'
              className={classes.title}
            >
              Lock premia
            </Typography>
            <Typography
              component='p'
              color='textSecondary'
              className={classes.subTitle}
            >
              Reduce your transaction costs
            </Typography>
          </Box>
        </Box>
        <Box
          className={!mobile ? classes.topSection : classes.topSectionMobile}
        >
          <Box className={classes.col}>
            <Box
              display='flex'
              style={{ margin: '0 8px 2px', justifyContent: 'flex-start' }}
            >
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                Lock period
              </Typography>
            </Box>
            <Box className={classes.borderedBox} onClick={handleClick}>
              <Typography
                component='p'
                color='textSecondary'
                className={classes.subTitle}
                style={{ marginLeft: '10px' }}
              >
                Select period
              </Typography>
              <img
                src={calendarIcon}
                alt='Pick a date'
                style={{ marginRight: '10px' }}
              />
            </Box>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                className={classes.selectionItem}
                style={!mobile ? { width: '350px' } : { width: '315px' }}
              >
                1 Month
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                className={classes.selectionItem}
                style={!mobile ? { width: '350px' } : { width: '315px' }}
              >
                3 Months
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                className={classes.selectionItem}
                style={!mobile ? { width: '350px' } : { width: '315px' }}
              >
                6 Months
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                className={classes.selectionItemLast}
                style={!mobile ? { width: '350px' } : { width: '315px' }}
              >
                12 Months
              </MenuItem>
            </Menu>
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
                Stake quantity
              </Typography>
              <Typography
                component='p'
                color='textSecondary'
                className={classes.smallInfoText}
              >
                {'Max size available: 8,912'}
              </Typography>
            </Box>

            <Box width='100%' height='46px'>
              <input
                value={'100'}
                onChange={() => {}}
                className={classes.borderedInput}
              />
              <img
                src={greyLogo}
                alt='Select Amount'
                className={classes.inputIcon}
              />
              <Button
                color='primary'
                variant='outlined'
                size='small'
                className={
                  !mobile ? classes.maxButton : classes.maxButtonMobile
                }
              >
                MAX
              </Button>
            </Box>
          </Box>

          <Box className={classes.horizontalBox} style={{ marginTop: '12px' }}>
            <Button
              color='secondary'
              variant='contained'
              size='large'
              className={classes.buttonLeft}
            >
              Lock
            </Button>
            <Button
              color='secondary'
              variant='outlined'
              size='large'
              className={classes.buttonRight}
            >
              Unlock
            </Button>
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
              Time till unlock
            </Typography>
            <Box className={classes.progressBarAndTime}>
              <Box className={classes.progressContainer}>
                <Box
                  className={classes.progressBar}
                  style={{ width: progress }}
                />
              </Box>
              <Typography
                component='p'
                color='textPrimary'
                className={classes.elementHeader}
              >
                {`3m 25d`}
              </Typography>
            </Box>
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
              Fee Discount
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
              Lock Multiplier
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

export default LockPremiaCard;
