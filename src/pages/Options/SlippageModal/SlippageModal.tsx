import React, { useState } from 'react';
import { Typography, Modal, Box, Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ModalContainer, ContainedButton } from 'components';
import XOut from 'assets/svg/XOutGrey.svg';
import { ReactComponent as InfoIcon } from 'assets/svg/TooltipQuestionmark.svg';
import { ReactComponent as PercentageIcon } from 'assets/svg/BigPercentage.svg';

import { useSlippagePercentage } from 'state/options/hooks';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    width: '360px',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: '12px',
    backgroundColor: 'transparent',
  },
  mainCard: {
    width: '360px',
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    border: `1px solid ${palette.divider}`,
  },
  topSection: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '26px 26px 21px',
    height: '214px',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
    margin: '0 0 19px',
    color: palette.text.primary,
  },
  elementHeader: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    marginLeft: '8px',
    color: palette.text.primary,
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    margin: '0 0 9px',
    '&:hover svg path': {
      fill: palette.primary.main,
    },
  },
  borderedInput: {
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    height: '45px',
    width: '100%',
    maxWidth: '308px',
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    padding: '14px 33px',
    color: palette.text.primary,
    zIndex: 2,
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    margin: '0',
    '&:hover': {
      border: `1px solid ${palette.primary.main}`,
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
      borderRadius: '12px',
    },
  },
  exitContainer: {
    position: 'absolute',
    top: 16,
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
  exitContainerMobile: {
    position: 'absolute',
    top: 'calc(20vh + 26px)',
    right: 'calc(50% - 160px)',
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
}));

export interface ConfirmTermsModalProps {
  open: boolean;
  onClose: () => void;
}

const SlippageModal: React.FC<ConfirmTermsModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const theme = useTheme();
  const { palette } = theme;
  const { slippagePercentage, setSlippagePercentage } = useSlippagePercentage();
  const [customSlippage, setCustomSlippage] = useState(
    slippagePercentage ? slippagePercentage.toString() : '',
  );

  const handleChangeCustomSlippage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    const valueString = value.replace(/[^0-9.]/g, '');
    setCustomSlippage(valueString);
  };

  const onConfirm = () => {
    if (customSlippage) {
      const customPercentage = Number(customSlippage);
      setSlippagePercentage(customPercentage);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='md'>
        <Box className={classes.wrapper}>
          <Box
            className={classes.mainCard}
            style={palette.type === 'light' ? { border: 'none' } : {}}
          >
            <Box className={classes.topSection}>
              <Typography className={classes.title}>
                Slippage tolerance
              </Typography>
              <Box width='100%'>
                <Box display='flex' width='100%' alignItems='center'>
                  <Typography className={classes.elementHeader}>
                    Max slippage percent
                  </Typography>
                  <Tooltip
                    title='The maximum price slippage you are willing to incur on a trade.'
                    arrow
                  >
                    <InfoIcon
                      fill={palette.secondary.main}
                      style={{ marginLeft: '6px' }}
                    />
                  </Tooltip>
                </Box>
                <Box className={classes.inputContainer}>
                  <input
                    value={customSlippage}
                    onChange={handleChangeCustomSlippage}
                    className={classes.borderedInput}
                    placeholder='Custom'
                  />
                  <PercentageIcon
                    fill={palette.text.secondary}
                    style={
                      !mobile
                        ? {
                            position: 'absolute',
                            marginTop: '15px',
                            height: '16px',
                            width: '14px',
                            left: 59,
                          }
                        : {
                            position: 'absolute',
                            marginTop: '15px',
                            height: '16px',
                            width: '14px',
                            left: 'calc(50% - 140px)',
                          }
                    }
                  />
                </Box>
              </Box>
              <ContainedButton
                label='Confirm'
                disabled={!customSlippage}
                fullWidth
                onClick={onConfirm}
              />
            </Box>
          </Box>
          <Box
            onClick={onClose}
            className={
              !mobile ? classes.exitContainer : classes.exitContainerMobile
            }
          >
            <img src={XOut} alt='Exit' style={{ padding: '6px' }} />
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default SlippageModal;
