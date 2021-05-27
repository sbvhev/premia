import React, { useState } from 'react';
import { Button, Typography, Modal, Box, Checkbox } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ReactComponent as UniswapIcon } from 'assets/svg/Uniswap.svg';
import { ReactComponent as HelpIcon } from 'assets/svg/Help.svg';

import { ModalContainer } from 'components';
import XOut from 'assets/svg/XOutGrey.svg';

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
    padding: '16px 26px 16px 26px',
    height: '185px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  topSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '24px 16px 24px',
    height: '185px',
    borderBottom: `1px solid ${palette.divider}`,
  },
  botSection: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 30px 20px',
  },
  botSectionMobile: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 16px 24px',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
    margin: '8px 0 10px',
    color: palette.text.primary,
  },
  smallInfoText: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'left',
    color: palette.text.secondary,
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
    top: 22,
    right: 'calc(50% - 106px)',
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
	element: {
		'& svg': {
			width: 14,
			height: 17
		},

		'& p': {
			lineHeight: '24px',
			fontSize: 14,

			'& svg': {
				position: 'relative',
				top: 4,
				marginLeft: 4
			}
		},

		'& h2': {
			lineHeight: '24px',
			fontSize: 14,
			marginRight: 8,
			fontWeight: 'bold'
		}
	}
}));

export interface BuyConfirmationModalProps {
  open: boolean;
  onClose: () => void;
}

const BuyConfirmationModal: React.FC<BuyConfirmationModalProps> = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [checkIsOn, setCheckIsOn] = useState(false);

  const handleChangeAgree = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='md'>
        <Box className={!mobile ? classes.wrapper : classes.wrapperMobile}>
          <Box className={!mobile ? classes.mainCard : classes.mainCardMobile}>
            <Box
              className={
                !mobile ? classes.topSection : classes.topSectionMobile
              }
            >
              <Typography className={classes.title}>
                Buy confirmation
              </Typography>
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                flexWrap='wrap'
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  width='50%'
                  className={classes.element}
                >
                  <Typography color='secondary'>Option size</Typography>
                  <Box display='flex' flexDirection='row'>
                    <Typography component="h2">321</Typography>
                    <Typography color='secondary'>Uni</Typography>
                    <UniswapIcon />
                  </Box>
                </Box>
                <Box
                  display='flex'
                  flexDirection='column'
                  width='50%'
                  textAlign='right'
                  className={classes.element}
                >
                  <Typography color='secondary'>Maturity</Typography>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-end'
                  >
                    <Typography component="h2">27 March</Typography>
                  </Box>
                </Box>
                <Box
                  display='flex'
                  flexDirection='column'
                  width='50%'
									mt={1}
                  className={classes.element}
                >
                  <Typography color='secondary'>Breakeven</Typography>
                  <Box display='flex' flexDirection='row'>
                    <Typography component="h2">$1,700</Typography>
                  </Box>
                </Box>
                <Box
                  display='flex'
                  flexDirection='column'
                  width='50%'
									mt={1}
                  textAlign='right'
                  className={classes.element}
                >
                  <Typography color='secondary'>
                    Slippage
                    <HelpIcon />
                  </Typography>
                  <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-end'
                  >
                    <Typography component="h2">2.29%</Typography>
                  </Box>
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
                justifyContent='center'
                alignItems='center'
                margin='0px 0 4px'
              >
                <Checkbox
                  checked={checkIsOn}
                  onChange={() => setCheckIsOn(!checkIsOn)}
                  name='agreeToTerms'
                  size='small'
                  className={classes.checkbox}
                  icon={
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
                    </svg>
                  }
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
                <Typography className={classes.smallInfoText}>
                  Do not show confirmation again
                </Typography>
              </Box>

              <Button
                color='primary'
                variant='contained'
                size='large'
                onClick={handleChangeAgree}
              >
                Buy for $1,749.37
              </Button>
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

export default BuyConfirmationModal;
