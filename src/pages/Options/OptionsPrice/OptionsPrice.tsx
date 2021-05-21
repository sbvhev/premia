import React from 'react';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import PriceRectangle from 'assets/svg/PriceRectangle.svg';
import PriceRectangleLight from 'assets/svg/PriceRectangleLight.svg';
import { Box, Grid } from '@material-ui/core';
import { useOptionType } from 'state/application/hooks';
import { useIsDarkMode } from 'state/user/hooks';

const useStyles = makeStyles(({ palette }) => ({
  chartTop: {
    background: `linear-gradient(180deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`
  },
  chartBottom: {
    background: `linear-gradient(180deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`
  },
  currentPrice: {
    position: 'absolute',
    top: 8,
    left: 16,
    '& p': {
      color: palette.text.hint,
      margin: 0,
      fontSize: 12,
    },
  },
}));

const OptionsPrice: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { optionType } = useOptionType();
  const darkMode = useIsDarkMode();
  
  return (
    <Grid container justify='center' alignItems='center'>
      <Box position='relative' mt={1} mr={-0.75}>
        <img src={darkMode ? PriceRectangle : PriceRectangleLight} alt='Current Price' />
        <Box zIndex={2} className={classes.currentPrice}>
          <p>Current Price</p>
          <p><b>$1,749.37</b></p>
        </Box>
      </Box>
      <Box width={30} height={1.5} mr={-1.5} bgcolor={ darkMode ? theme.palette.common.white : theme.palette.secondary.main } zIndex={10} />
      <Box display='flex' flexDirection='column' justifyContent='space-between' width={12} height={540} border={1} borderColor={theme.palette.divider} borderRadius={12} overflow='hidden'>
        <Box width={1} height={1/3} className={optionType === 'call' ? classes.chartTop : classes.chartBottom} />
        <Box width={1} height={1/3} className={optionType === 'call' ? classes.chartBottom : classes.chartTop} />
      </Box>
    </Grid>
  );
};

export default OptionsPrice;
