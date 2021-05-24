import React from 'react';
import { Typography, Modal, Box, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ModalContainer } from 'components';

import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '418px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
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
    color: palette.text.primary,
  },
  smallInfoText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
    textAlign: 'left',
    color: palette.text.secondary,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 24px 12px',
    height: '132px',
    // margin: '22px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 24px 12px',
    margin: '22px 0 0',
    borderBottom: `1px solid ${palette.divider}`,
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px 12px',
    height: '158px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 8px',
  },

  borderedInput: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '46px',
    width: '100%',
    border: `1px solid ${palette.divider}`,
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    padding: '13px 50px 13px 40px',
    color: palette.text.primary,
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  maxButton: {
    position: 'relative',
    top: -43,
    right: -260,
    zIndex: 3,
  },
  maxButtonMobile: {
    position: 'relative',
    top: -43,
    right: -227,
    zIndex: 3,
  },
  exitContainer: {
    position: 'absolute',
    top: 30,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px',
    cursor: 'pointer',
    width: '20px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  },
}));

export interface SwapModalProps {
  open: boolean;
  onClose: () => void;
}

const SwapModal: React.FC<SwapModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { palette } = theme;
  const balance = 40012;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='md'>
        <Box width={1} className={classes.wrapper}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography color="primary" className={classes.title}>Swap</Typography>
          </Box>

          <Box className={!mobile ?  classes.topSection : classes.topSectionMobile}>
            <Typography className={classes.elementHeader}>From</Typography>
            <Box width="100%" height="46px">
              <Box width="65%" height="46px">
                <input
                  value={'0'}
                  onChange={() => {}}
                  className={classes.borderedInput}
                />
                <Button color="primary" variant="outlined" size="small" className={!mobile ? classes.maxButton : classes.maxButtonMobile}>
                  MAX
                </Button>
              </Box>
              <Box>

              </Box>
            </Box>
            <Typography className={classes.smallInfoText}>{`Balance: ${balance}`}</Typography>
          </Box>

          <Box className={!mobile ?  classes.botSection : classes.botSectionMobile}>
            <Typography className={classes.elementHeader}>To</Typography>
            <Box width="100%" height="46px">
              <Box width="65%" height="46px">
                <input
                  value={'0'}
                  onChange={() => {}}
                  className={classes.borderedInput}
                />
              </Box>
              <Box>

              </Box>
            </Box>
            <Button
              color="primary"
              variant="contained"
              disabled={true}
            >Enter an amount</Button>
          </Box>

          <Button className={classes.exitContainer} onClick={onClose}>
            <img
              src={XOut}
              alt="Exit"
            />
          </Button>
          </Box>
      </ModalContainer>
    </Modal>
  );
};

export default SwapModal;
