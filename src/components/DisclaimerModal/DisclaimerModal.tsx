import React from 'react';
import { Typography, Modal, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ModalContainer } from 'components';

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
    height: '46px',
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
      borderColor: palette.primary,
    },
  },
  form: {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
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
    }
  },
  coloredSelector: {
    height: '46px',
    width: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%);`,
    '&:hover': {
      backgroundColor: palette.primary.main,
      background: 'none',
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
  },
  selectorText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    marginLeft: '15px',
    color: palette.common.black,
  },
  maxButton: {
    position: 'relative',
    top: -42.5,
    right: -170,
    zIndex: 3,
    width: '74px',
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
      backgroundColor: palette.primary.dark
    }
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
    zIndex: 1000,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark
    }
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
    borderTop: `1px solid ${palette.divider}`
  },
  swapDetailsSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 16px 0px',
    height: '94px',
    borderTop: `1px solid ${palette.divider}`
  },
  swapDetailsText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
  }
}));

export interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  // const { palette } = theme;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='lg'>
        <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
          <Typography>disclaimer</Typography>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default DisclaimerModal;
