import React from 'react';
import { Typography, Box, Button, Tooltip } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import SpaceOptionsHero from 'assets/svg/SpaceOptionsHeroRed.svg';

import { useCurrentTx, useTxStateMsg } from 'state/transactions/hooks';

const useStyles = makeStyles({
  title: {
    fontFamily: '"Poppins"',
    fontWeight: 600,
    fontSize: 26,
  },

  paragraph: {
    fontFamily: '"Poppins"',
    fontSize: 13,
  },

  subtitle: {
    fontFamily: '"Inter"',
    fontSize: 18,
    marginTop: 8,
    height: 24,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  button: {
    background: 'black',
  },

  link: {
    textDecoration: 'none',
  },

  notifycontainer: {
    maxWidth: 600,
    width: '100%',
  },

  notifycontent: {
    padding: 24,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export interface TransactionFailedNotificationProps {
  open: boolean;
  onClose: () => void;
}

const TransactionFailedNotification: React.FC<TransactionFailedNotificationProps> =
  ({ open, onClose }) => {
    const { txLink } = useCurrentTx();
    const { txStateMsg } = useTxStateMsg();
    // const { txOption } = useTxOption();
    const classes = useStyles();

    return (
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={onClose}
      >
        <div className={classes.notifycontainer}>
          <img src={SpaceOptionsHero} alt='Hero' width='100%' />
          <div className={classes.notifycontent}>
            <Box height={1}>
              <Typography
                component='h1'
                variant='h2'
                color='textPrimary'
                className={classes.title}
              >
                Transaction Failed
              </Typography>

              {/* {txOption && <OptionTitle small option={txOption} />} */}

              <Tooltip title={txStateMsg || ''}>
                <Typography
                  component='h3'
                  color='textPrimary'
                  className={classes.subtitle}
                >
                  {txStateMsg}
                </Typography>
              </Tooltip>
            </Box>

            {txLink && (
              <a
                href={txLink}
                target='_blank'
                rel='noreferrer'
                className={classes.link}
              >
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.button}
                >
                  View Transaction
                </Button>
              </a>
            )}
          </div>
        </div>
      </Snackbar>
    );
  };

export default TransactionFailedNotification;
