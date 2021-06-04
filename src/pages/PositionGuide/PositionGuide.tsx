import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import PositionStepper from './Stepper';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.text.primary,
    fontSize: 28,
    lineHeight: '18px',
    marginBottom: 56,
    fontWeight: 'bold',

    [theme.breakpoints.down('md')]: {
      marginBottom: 32,
    },
  },
  hyperlink: {
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 500,
    cursor: 'pointer',
  },
}));

const ProVault: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container direction='column'>
      <Link to='/'>
        <Typography className={classes.hyperlink}>
          Back to My positions
        </Typography>
      </Link>
      <Typography className={classes.title}>Position Guide</Typography>
      <PositionStepper />
    </Grid>
  );
};

export default ProVault;
