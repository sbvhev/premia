import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { PageWithSidebar } from 'layouts';
import PositionStepper from './Stepper';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.text.primary,
    fontSize: 28,
    lineHeight: '18px',
    marginBottom: '56px',
    fontWeight: 'bold',
  },
}));

const ProVault: React.FC = () => {
  const classes = useStyles();
  return (
    <PageWithSidebar>
      <Grid container direction='column'>
        <Typography className={classes.title}>Position Guide</Typography>
        <PositionStepper />
      </Grid>
    </PageWithSidebar>
  );
};

export default ProVault;
