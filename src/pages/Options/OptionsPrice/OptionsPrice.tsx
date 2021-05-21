import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import PriceRectangle from 'assets/svg/PriceRectangle.svg';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  chartTop: {
    background: 'linear-gradient(180deg, #0062FF 0%, #2DE29E 100%)'
  },
  chartBottom: {
    background: 'linear-gradient(180deg, #EB844A 0%, #BF47C3 100%)'
  },
  currentPrice: {
    backgroundImage: `url(${PriceRectangle})`,
    backgroundSize: 'cover',
    padding: '30px 47px 30px 10px',
    backgroundPosition: '-25px',
    '& p': {
      color: theme.palette.common.black,
      margin: 0,
      fontSize: 12,
    }
  },
}));

const OptionsPrice: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <Grid container justify='center' alignItems='center'>
      <Box className={classes.currentPrice}>
        <p>Current Price</p>
        <p><b>$1,749.37</b></p>
      </Box>
      <Box width={30} height={1.5} mr={-1.5} bgcolor='white' />
      <Box display='flex' flexDirection='column' justifyContent='space-between' width={12} height={540} border={1} borderColor={theme.palette.divider} borderRadius={12} overflow='hidden'>
        <Box width={1} height={1/3} className={classes.chartTop} />
        <Box width={1} height={1/3} className={classes.chartBottom} />
      </Box>
    </Grid>
  );
};

export default OptionsPrice;
