import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StepProps } from './Stepper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selector: {
      padding: 22,
    },
  }),
);

const StepFour: React.FC<StepProps> = ({ activeStep }) => {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.selector}>
      <Typography>What asset are you thinking of?</Typography>
    </Box>
  );
};

export default StepFour;
