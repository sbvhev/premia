import React from 'react';
import { Typography, Modal, Box, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { chainIds, chainLabels, PARAMS } from 'utils';
import { useWeb3 } from 'state/application/hooks';
import { ModalContainer } from 'components';
import { ReactComponent as EthIcon } from 'assets/svg/ColoredEth.svg';
import { ReactComponent as BSCIcon } from 'assets/svg/BSC.svg';
import { ReactComponent as PolygonIcon } from 'assets/svg/Polygon.svg';

import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    height: 254,
    backgroundColor: 'transparent',
  },
  coloredBorderBackgroundForCard: {
    boxSizing: 'border-box',
    position: 'relative',
    left: 0,
    height: 254,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    background: palette.background.paper,
    border: `1px solid ${palette.divider}`,
    borderRadius: '12px',
    zIndex: 2,
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
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
      backgroundColor: palette.primary.dark,
    },
  },
  title: {
    fontWeight: 700,
    fontSize: '28px',
    LineHeight: '18px',
    marginBottom: 30,
  },
  chain: {
    width: 140,
    height: 140,
    padding: 5,
    fontSize: 16,
    lineHeight: '18px',
    fontWeight: 700,

    '& > $selected': {
      border: `1px solid ${palette.divider}`,
    },

    '& > div': {
      background: 'rgba(82, 148, 255, 0.1)',
      borderRadius: 12,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',

      '& $selected': {
        background:
          'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
        boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
        transform: 'rotate(45deg)',
        color: 'black',
        height: 24,
        width: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        right: -26,
        top: 18,
        fontSize: 12,
      },

      '&:hover': {
        border: `1px solid ${palette.divider}`,
      },

      '& svg': {
        marginBottom: 16,
      },
    },
  },
  selected: {},
}));

export interface ChainModalProps {
  open: boolean;
  onClose: () => void;
}

const ChainModal: React.FC<ChainModalProps> = ({ open, onClose }) => {
  const { account, web3, chainId } = useWeb3();
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer size='sm'>
        <Box width={1} className={classes.wrapper}>
          <Box className={classes.coloredBorderBackgroundForCard}>
            <Typography variant='h2' className={classes.title}>
              Select network
            </Typography>
            <Grid container direction='row'>
              { chainIds.map((val, ind) => (
                <Grid item key={ind} xs={3} className={classes.chain}>
                  <Box
                    component='div'
                    className={cx({
                      [classes.selected]: chainId === val,
                    })}
                    onClick={() => {
                      const params = PARAMS[val];
                      web3?.send('wallet_addEthereumChain', [
                        params,
                        account,
                      ]);
                    }}
                  >
                    { ind === 0 && <EthIcon /> }
                    { ind === 1 && <BSCIcon /> }
                    { ind === 2 && <PolygonIcon /> }
                    { ind === 3 && <Box width={40} height={40} mb={2} />}
                    { chainLabels[ind] }
                    {chainId === val && (
                      <Box component='div' className={classes.selected}>
                        Current
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Button className={classes.exitContainer} onClick={onClose}>
              <img src={XOut} alt='Exit' />
            </Button>
          </Box>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ChainModal;
