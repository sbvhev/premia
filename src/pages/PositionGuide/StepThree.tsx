import React, { useState } from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ColoredSlider } from 'components';
import { StepProps } from './Stepper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selector: {
      padding: 22,
    },
    priceSelector: {
      padding: '18px 25px',
      display: 'flex',
      flexDirection: 'row',

      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '18px 10px',
      },
    },
    dunno: {
      width: 170,
      height: 45,

      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 45,
      },
    },
    rightPanel: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: 26,
      display: 'flex',
      alignItems: 'center',

      [theme.breakpoints.down('md')]: {
        paddingLeft: 0,
        borderLeft: 'none',
      },
    },
    priceSubTitle: {
      fontSize: 14,
      lineHeight: '12px',
      fontWeight: 500,
      marginTop: 18,
      color: theme.palette.text.secondary,
    },
    priceTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: '18px',

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
  }),
);

const StepThree: React.FC<StepProps> = ({ activeStep }) => {
  const classes = useStyles();
  const [strikePrice, setStrikePrice] = useState<number | number[]>(42);

  return (
    <Box className={classes.priceSelector}>
      <Box width={1} mt={0} pr={3}>
        <Grid container direction='row'>
          <Box>
            <Typography color='textPrimary' className={classes.priceTitle}>
              When will it happen?
            </Typography>
            <Typography color='textSecondary' className={classes.priceSubTitle}>
              Days
            </Typography>
          </Box>
        </Grid>

        <Box width={1} mt={2}>
          <ColoredSlider
            min={1}
            max={60}
            marks={[1, 60].map((value) => ({
              label: value,
              value,
            }))}
            value={strikePrice}
            valueLabelDisplay='on'
            onChange={(event: any, value) => {
              setStrikePrice(value);
            }}
          />
        </Box>
      </Box>
      <Box className={classes.rightPanel}>
        <Button variant='outlined' color='secondary' className={classes.dunno}>
          I don't know
        </Button>
      </Box>
    </Box>
  );
};

export default StepThree;
