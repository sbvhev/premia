import React from 'react';
import { Typography, Modal, Box, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useCurrentTx, useTxStateMsg } from 'state/transactions/hooks';
import { ModalContainer } from 'components';

import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: '274px',
    backgroundColor: 'transparent',
  },
  topIconWraper: {
    position: 'absolute',
    top: 4,
    left: 'calc(50% - 63px)',
    zIndex: 3,
    width: '126px',
    height: '126px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: palette.background.paper,
    borderRadius: '50%',
    border: `1px solid ${palette.divider}`,
  },
  borderedCard: {
    position: 'relative',
    zIndex: 1,
    top: 64,
    left: 0,
    height: '210px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1.5px solid ${palette.divider}`,
    borderRadius: '12px',
    backgroundColor: palette.background.paper,
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

export interface TransactionLoadingModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionLoadingModal: React.FC<TransactionLoadingModalProps> = ({
  open,
  onClose,
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
            style={!mobile ? {} : { top: 'calc(20vh + 3px)' }}
          >
            <CircularProgress size='60px' />
          </Box>
          <Box className={classes.borderedCard}>
            <Box className={classes.textColumn}>
              <Box className={classes.topTextWrapper}>
                <Typography variant='h2' className={classes.title}>
                  Transaction Pending
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
            <Box className={classes.exitContainer} onClick={onClose}>
              <img src={XOut} alt='Exit' />
            </Box>
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default TransactionLoadingModal;
