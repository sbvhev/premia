import React, { useState } from 'react';
import { Typography, Modal, Box, Button, Grid, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { ModalContainer } from 'components';
import { ReactComponent as DaiIcon } from 'assets/svg/Dai.svg';
import { ReactComponent as EthIcon } from 'assets/svg/EthIcon.svg';
import { ReactComponent as WBTCIcon } from 'assets/svg/wBTCIcon.svg';
import { ReactComponent as LinkIcon } from 'assets/svg/LinkIcon.svg';
import { ReactComponent as YFIIcon } from 'assets/svg/YFIIcon.svg';
import { ReactComponent as SushiIcon } from 'assets/svg/SushiIcon.svg';

import XOut from 'assets/svg/XOutGrey.svg';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    backgroundColor: 'transparent',
    maxWidth: 481,
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
    '& h2': {
      fontSize: 28,
      lineHeight: '18px',
      fontWeight: 700,
      marginTop: 15,
      color: palette.text.primary
    },
    '& p': {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 500,
      color: palette.text.secondary,
      marginBottom: 17,
    }
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
  tokenItem: {
    marginBottom: 8,
    background: 'rgba(82, 148, 255, 0.1)',
    borderRadius: 12,
    width: 137,
    height: 141,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    '&$selected': {
      background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      '& p': {
        color: 'black'
      },
      '& svg': {
        '& path': {
          fill: 'black'
        },
      }
    },

    '&:hover': {
      border: `1px solid ${palette.divider}`,
    },

    '& p': {
      margin: 0,
      fontSize: 16,
      lineHeight: '18px',
      fontWeight: 'bold',
      color: palette.text.primary
    },

    '& svg': {
      marginBottom: 19,
      width: 34,
      height: 34,
    },
  },
  testnet: {
    position: 'absolute',
    bottom: -2,
    fontSize: 14,
    fontWeight: 400,
    color: palette.text.secondary
  },
  tradingButton: {
    width: '100%',
    maxWidth: 220,
    height: 45,
    margin: '12px auto 0',
    fontSize: 16,
    boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)'
  },
  selected: {},
}));

export interface ClaimTokensModalProps {
  open: boolean;
  onClose: () => void;
}

const ClaimTokensModal: React.FC<ClaimTokensModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const [ selectedToken, setSelectedToken ] = useState(0);
  const tokens = [
    {
      icon: <DaiIcon />,
      text: 'Dai'
    },
    {
      icon: <EthIcon />,
      text: 'WETH'
    },
    {
      icon: <WBTCIcon />,
      text: 'WBTC'
    },
    {
      icon: <LinkIcon />,
      text: 'LINK'
    },
    {
      icon: <YFIIcon />,
      text: 'YFI'
    },
    {
      icon: <SushiIcon />,
      text: 'Sushi'
    }
  ]

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
        <ModalContainer size='sm'>
          <Box width={1} className={classes.wrapper}>
            <Box className={classes.coloredBorderBackgroundForCard}>
              <Typography variant='h2'>
                Claim token
              </Typography>
              <Typography>
                Select token that you will use in trading competition
              </Typography>
              <Grid container justify='space-between'>
                { tokens.map((val, ind) => (
                  <Box
                    key={ind} 
                    className={cx({
                      [classes.selected]: selectedToken === ind,
                    }, classes.tokenItem)}
                    onClick={() => {
                      setSelectedToken(ind);
                    }}
                  >
                    { val.icon }
                    <Typography>{ val.text }</Typography>
                  </Box>
                ))}
              </Grid>
              <Button
                variant='contained'
                color='primary'
                className={classes.tradingButton}
              >
                Claim Tokens
              </Button>
              <Button className={classes.exitContainer} onClick={onClose}>
                <img src={XOut} alt='Exit' />
              </Button>
            </Box>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default ClaimTokensModal;
