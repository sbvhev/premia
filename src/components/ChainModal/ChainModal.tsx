import React from 'react';
import {
  Typography,
  Modal,
  Box,
  Grid,
  Fade,
  Backdrop,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { chainIds, chainLabels, PARAMS } from 'utils';
import { useWeb3 } from 'state/application/hooks';
import { ModalContainer, ContainedButton } from 'components';
import { ReactComponent as EthIcon } from 'assets/svg/ColoredEth.svg';
import { ReactComponent as BSCIcon } from 'assets/svg/BSC.svg';
import { ReactComponent as PolygonIcon } from 'assets/svg/Polygon.svg';
import { ReactComponent as FantomIcon } from 'assets/svg/FantomIcon.svg';

import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    backgroundColor: 'transparent',
  },
  coloredBorderBackgroundForCard: {
    boxSizing: 'border-box',
    position: 'relative',
    left: 0,
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
    top: 26,
    right: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    padding: '12px',
    cursor: 'pointer',
    width: '40px',
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
  testnet: {
    position: 'absolute',
    bottom: -2,
    fontSize: 14,
    fontWeight: 400,
    color: palette.text.secondary,
  },
  tradingButton: {
    width: '100%',
    height: 45,
    margin: 0,
    fontSize: 16,
    boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
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
  const mobile = /Mobi|Android/i.test(navigator.userAgent);

  let testnetLabel = '';
  switch (chainId) {
    case 3:
      testnetLabel = 'Ropsten Testnet';
      break;
    case 42:
      testnetLabel = 'Kovan Testnet';
      break;
    case 4:
      testnetLabel = 'Rinkeby Testnet';
      break;
    case 5:
      testnetLabel = 'Goerli Testnet';
      break;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer size='sm'>
          <Box width={1} className={classes.wrapper}>
            <Box className={classes.coloredBorderBackgroundForCard}>
              <Typography variant='h2' className={classes.title}>
                Select network
              </Typography>
              <Grid container direction='row'>
                {chainIds.map((val, ind) => (
                  <Grid item key={ind} xs={6} sm={3} className={classes.chain}>
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
                      {ind === 0 && <EthIcon />}
                      {ind === 1 && <BSCIcon />}
                      {ind === 2 && <PolygonIcon />}
                      {ind === 3 && <FantomIcon />}
                      {chainLabels[ind]}
                      {(chainId === val ||
                        (ind === 0 && testnetLabel !== '')) && (
                        <Box component='div' className={classes.selected}>
                          Current
                        </Box>
                      )}
                      {testnetLabel !== '' && ind === 0 && (
                        <p className={classes.testnet}>{testnetLabel}</p>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box p={'5px'} width={1}>
                <ContainedButton
                  fullWidth
                  size={!mobile ? 'large' : 'small'}
                  label='Switch to Rinkeby for trading competition'
                  onClick={() => {
                    // const params = {
                    //   chainId: '0x4',
                    //   chainName: 'Rinkeby Testnet',
                    //   nativeCurrency: {
                    //     name: 'Ethereum',
                    //     symbol: 'ETH',
                    //     decimals: 18,
                    //   },
                    //   rpcUrls: ['https://rinkeby.infura.io/v3'],
                    //   blockExplorerUrls: ['https://rinkeby.etherscan.com'],
                    // };
                    // web3?.send('wallet_addEthereumChain', [params, account]);
                  }}
                />
              </Box>
              <Box className={classes.exitContainer} onClick={onClose}>
                <img src={XOut} alt='Exit' />
              </Box>
            </Box>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default ChainModal;
