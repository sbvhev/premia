import React from 'react';
import { Typography, Modal, Box } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useCurrentTx, useTxStateMsg } from 'state/transactions/hooks';

import { ModalContainer } from 'components';

import MostOuterSuccessRadial from 'assets/svg/SuccessIconOuterRadial.svg';
import SecondSuccessRadial from 'assets/svg/SuccessIconSecondOuterRadial.svg';
import SuccessIcon from 'assets/svg/SuccessIconCore.svg';
import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '274px',
    backgroundColor: 'transparent',
  },
  topIconWraper: {
    position: 'absolute',
    top: 5,
    left: 'calc(50% - 63px)',
    width: '126px',
    height: '126px',
    display: 'flex',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  firstOuterRadial: {
    position: 'absolute',
    top: 6,
    left: 'calc(50% - 62px)',
    zIndex: 4,
    width: '124px',
    height: '123px',
  },
  secondOuterRadial: {
    position: 'absolute',
    top: 11.5,
    left: 'calc(50% - 56px)',
    zIndex: 5,
    width: '112px',
    height: '112px',
  },
  innerMainBorderedCircle: {
    width: '98px',
    height: '98px',
    background: `linear-gradient(316.57deg, ${palette.success.dark} 18.89%, ${palette.success.main} 95.84%);`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.6',
    zIndex: 5,
  },
  innerMainTransparent: {
    width: '96px',
    height: '96px',
    position: 'absolute',
    top: 20,
    left: 'calc(50% - 48px)',
    zIndex: 4,
    backgroundColor: palette.background.paper,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCoreBackgroundFill: {
    backgroundColor: palette.background.paper,
    borderRadius: '12px',
    position: 'absolute',
    top: 42.5,
    left: 'calc(50% - 25px)',
    zIndex: 4,
    width: '50px',
    height: '50px',
  },
  iconCore: {
    position: 'absolute',
    top: 25.5,
    left: 'calc(50% - 42px)',
    zIndex: 10,
    width: '84px',
    height: '84px',
  },
  coloredBorderBackgroundForCard: {
    boxSizing: 'border-box',
    position: 'relative',
    top: 64,
    left: 0,
    height: '210px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(316.57deg, ${palette.success.dark} 18.89%, ${palette.success.main} 95.84%);`,
    borderRadius: '12px',
    zIndex: 2,
  },
  mainCard: {
    boxSizing: 'border-box',
    display: 'flex',
    width: 'calc(100% - 3px)',
    height: 'calc(100% - 3px)',
    backgroundColor: palette.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
  },
  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'DM Sans',
  },
  topTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'DM Sans',
  },
  title: {
    fontWeight: 700,
    fontSize: '28px',
    LineHeight: '18px',
  },
  subTitle: {
    fontWeight: 500,
    fontSize: '14px',
    LineHeight: '24px',
  },
  anchor: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12px',
    color: palette.text.secondary,
    textDecorationColor: palette.text.secondary,
  },
  hyperlink: {
    fontWeight: 500,
    fontSize: '14px',
    LineHeight: '24px',
  },
  exitContainer: {
    position: 'absolute',
    top: 30,
    right: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  },
}));

export interface TransactionSuccessModalProps {
  open: boolean;
  onClose: () => void;
  swapModal?: boolean;
}

const TransactionSuccessModal: React.FC<TransactionSuccessModalProps> = ({
  open,
  onClose,
  swapModal,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { txLink } = useCurrentTx();
  const { txStateMsg } = useTxStateMsg();
  const { palette } = theme;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='md'>
        <Box width={1} className={classes.wrapper}>
          <Box
            className={classes.topIconWraper}
            style={!mobile ? {} : { top: 'calc(20vh + 5px)' }}
          >
            <Box className={classes.innerMainBorderedCircle}></Box>
          </Box>
          <img
            src={MostOuterSuccessRadial}
            alt='---'
            className={classes.firstOuterRadial}
            style={!mobile ? {} : { top: 'calc(20vh + 5.5px)' }}
          />
          <img
            src={SecondSuccessRadial}
            alt='--'
            className={classes.secondOuterRadial}
            style={!mobile ? {} : { top: 'calc(20vh + 12px)' }}
          />
          <img
            src={SuccessIcon}
            alt='Success'
            className={classes.iconCore}
            style={!mobile ? {} : { top: 'calc(20vh + 25.5px)' }}
          />
          <Box
            className={classes.innerMainTransparent}
            style={!mobile ? {} : { top: 'calc(20vh + 20px)' }}
          />
          <Box
            className={classes.innerCoreBackgroundFill}
            style={!mobile ? {} : { top: 'calc(20vh + 42.5px)' }}
          />
          <Box
            className={classes.coloredBorderBackgroundForCard}
            style={
              palette && palette.type === 'light' ? { background: 'none' } : {}
            }
          >
            <Box className={classes.mainCard}>
              <Box className={classes.textColumn}>
                <Box className={classes.topTextWrapper}>
                  <Typography variant='h2' className={classes.title}>
                    {!swapModal ? 'Transaction successful' : 'Swap successful'}
                  </Typography>
                  <Typography color='secondary' className={classes.subTitle}>
                    {txStateMsg}
                  </Typography>
                </Box>
                {txLink && (
                  <a
                    href={'test.com'}
                    target='_blank'
                    rel='noreferrer'
                    className={classes.anchor}
                  >
                    <Typography color='secondary' className={classes.hyperlink}>
                      Transaction link
                    </Typography>
                    <Box marginLeft='4px'>
                      <svg
                        width='9'
                        height='10'
                        viewBox='0 0 9 10'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M8.23459 7.47869C8.22839 7.73333 8.01668 7.93524 7.76187 7.92888C7.50691 7.92268 7.30548 7.7108 7.31152 7.456L7.44064 2.57654L0.917449 9.09973C0.737242 9.27994 0.444733 9.27994 0.264526 9.09973C0.0843197 8.91952 0.0843195 8.62702 0.264526 8.44681L6.77727 1.93407L1.9081 2.05257C1.65313 2.05878 1.44142 1.85719 1.43522 1.60222C1.43212 1.47082 1.48419 1.35084 1.57037 1.26466C1.65133 1.1837 1.76217 1.1326 1.88557 1.12967L7.44668 0.994348C7.69332 0.994185 7.92511 1.09016 8.0996 1.26466C8.27409 1.43915 8.37007 1.67094 8.36975 1.92884L8.23459 7.47869Z'
                          fill={palette.text.secondary}
                        />
                      </svg>
                    </Box>
                  </a>
                )}
              </Box>
            </Box>
            <Box className={classes.exitContainer} onClick={onClose}>
              <img src={XOut} alt='Exit' />
            </Box>
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default TransactionSuccessModal;
