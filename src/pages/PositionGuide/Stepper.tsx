import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Check as CheckIcon } from '@material-ui/icons';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

export interface StepProps {
  activeStep: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      width: 170,
      height: 45,
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    actionsContainer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    stepContent: {
      display: 'flex',
    },
    stepIcon: {
      color: theme.palette.text.secondary,
      width: 30,
      height: 30,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${theme.palette.divider}`,
      boxSizing: 'border-box',
    },
    completed: {
      display: 'flex',
      background: '#5294FF',
      border: 'none',

      '& svg': {
        width: 16,
        height: 16,

        '& path': {
          stroke: theme.palette.background.paper,
          strokeWidth: '2px',
        },
      },
    },
    active: {
      background: 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
      boxShadow: '0px 0px 25px rgba(43, 229, 154, 0.25)',
      border: 'none',
      color: theme.palette.background.paper,
      fontWeight: 500,
    },
  }),
);

function getSteps() {
  return [
    'Select asset',
    'Make prediction',
    'Select timeline',
    'Select Position',
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <StepOne activeStep={step} />;
    case 1:
      return <StepTwo activeStep={step} />;
    case 2:
      return <StepThree activeStep={step} />;
    case 3:
      return <StepFour activeStep={step} />;
  }
}

const PositionStepper: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => {
                return (
                  <Box
                    className={cn(
                      classes.stepIcon,
                      props.completed ? classes.completed : '',
                      props.active ? classes.active : '',
                    )}
                  >
                    {props.completed ? <CheckIcon /> : props.icon}
                  </Box>
                );
              }}
            >
              {label}
            </StepLabel>
            <StepContent className={classes.stepContent}>
              {getStepContent(index)}
              <Box className={classes.actionsContainer}>
                {activeStep > 0 && (
                  <Button
                    onClick={handleBack}
                    className={classes.button}
                    variant='outlined'
                    color='secondary'
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default PositionStepper;
