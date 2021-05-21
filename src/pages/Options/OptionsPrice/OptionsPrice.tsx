import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import cx from 'classnames';

import {
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
  },
  chartTop: {
    background: 'linear-gradient(180deg, #0062FF 0%, #2DE29E 100%)'
  },
  chartBottom: {
    background: 'linear-gradient(180deg, #EB844A 0%, #BF47C3 100%)'
  }
}));

const OptionsPrice: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' width={12} height={540} border={1} borderColor={theme.palette.divider} borderRadius={12} overflow='hidden'>
      <Box width={1} height={1/3} className={classes.chartTop} />
      <Box width={1} height={1/3} className={classes.chartBottom} />
    </Box>
  );
};

export default OptionsPrice;
