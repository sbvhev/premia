import React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import SpaceOptionsHero from 'assets/svg/SpaceOptionsHeroYellow.svg';

import { useCurrentTx } from 'state/transactions/hooks';

const useStyles = makeStyles({
  title: {
    fontFamily: '"Poppins"',
    fontWeight: 600,
    fontSize: 25,
  },

  paragraph: {
    fontFamily: '"Poppins"',
    fontSize: 13,
  },

  subtitle: {
    fontFamily: '"Inter"',
    fontSize: 17,
    marginTop: 8,
  },

  button: {
    background: 'black',
  },

  link: {
    textDecoration: 'none',
  },

  notifycontainer: {
    maxWidth: 500,
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
    justifyContent: 'space-between'
  },
});

export interface TransactionSentNotificationProps {
  open: boolean;
  onClose: () => void;
}

const TransactionSentNotification: React.FC<TransactionSentNotificationProps> = ({
  open,
  onClose
}) => {
  const { txLink } = useCurrentTx();
  const classes = useStyles();

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={onClose}>
      <div className={classes.notifycontainer}>
        <img
          src={SpaceOptionsHero}
          alt='Hero'
          width='100%'
        />
        <div className={classes.notifycontent}>
          <Box height={1}>
            <Typography
              component='h1'
              variant='h2'
              color='textPrimary'
              className={classes.title}
            >
              Transaction Sent
            </Typography>
          </Box>
          {txLink &&
            <a
              href={txLink}
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              <Button
                variant='contained'
                color='secondary'
                onClick={onClose}
                className={classes.button}
              >
                View Transaction
              </Button>
            </a>        
          }
        </div>
      </div>
    </Snackbar>
  );
};

export default TransactionSentNotification;
