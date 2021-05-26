import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PriceRectangle from 'assets/svg/PriceRectangle.svg';
import PriceRectangleLight from 'assets/svg/PriceRectangleLight.svg';
import PriceRectangleMobile from 'assets/svg/PriceRectangleMobile.svg';
import PriceRectangleMobileLight from 'assets/svg/PriceRectangleMobileLight.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Grid } from '@material-ui/core';
import { useOptionType } from 'state/options/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import cx from 'classnames';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  chartCallTop: {
    background: `linear-gradient(180deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
    [breakpoints.down('md')]: {
      background: `linear-gradient(90deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
    },
  },
  chartCallBottom: {
    background: `linear-gradient(0deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
    [breakpoints.down('md')]: {
      background: `linear-gradient(270deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
    },
  },
  chartPutTop: {
    background: `linear-gradient(180deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
    [breakpoints.down('md')]: {
      background: `linear-gradient(90deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
    },
  },
  chartPutBottom: {
    background: `linear-gradient(0deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
    [breakpoints.down('md')]: {
      background: `linear-gradient(270deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
    },
  },
  rotate: {
    transform: 'matrix(0, 1, 1, 0, 0, 0)',
  },
  currentPrice: {
    position: 'absolute',
    top: 8,
    left: 16,
    [breakpoints.down('md')]: {
      top: 'calc(50% - 5px)',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
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
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const standardWidth = 16;
  const barHeight = mobile ? standardWidth : '70vh';
  const barWidth = mobile ? 1 : standardWidth;

  return (
    <Grid
      container
      direction={mobile ? 'column' : 'row'}
      justify='center'
      alignItems='center'
      style={mobile ? {} : { height: barHeight }}
    >
      <Box
        position='relative'
        mt={mobile ? 0 : 1}
        mb={mobile ? -4 : 0}
        mr={mobile ? 0 : -0.75}
        zIndex={2}
      >
        <img
          src={
            darkMode
              ? mobile
                ? PriceRectangleMobile
                : PriceRectangle
              : mobile
              ? PriceRectangleMobileLight
              : PriceRectangleLight
          }
          alt='Current Price'
        />
        <Box zIndex={2} className={classes.currentPrice}>
          <p>Current Price</p>
          <p>
            <b>$1,749.37</b>
          </p>
        </Box>
      </Box>
      <Box
        width={mobile ? 1.1 : 30}
        height={mobile ? 30 : 2}
        mb={mobile ? -2 : 0}
        mr={mobile ? 0 : -2}
        bgcolor={
          darkMode ? theme.palette.common.white : theme.palette.secondary.main
        }
        zIndex={1}
      />
      <Box
        display='flex'
        flexDirection={mobile ? 'row' : 'column'}
        justifyContent='space-between'
        width={barWidth}
        height={barHeight}
        border={1}
        borderColor={theme.palette.divider}
        borderRadius={12}
        overflow='hidden'
      >
        <Box
          width={mobile ? 1 / 3 : 1}
          height={mobile ? 1 : 1 / 3}
          className={cx(
            optionType === 'call' ? classes.chartCallTop : classes.chartPutTop,
          )}
        />
        <Box
          width={mobile ? 1 / 3 : 1}
          height={mobile ? 1 : 1 / 3}
          className={
            optionType === 'call'
              ? classes.chartPutBottom
              : classes.chartCallBottom
          }
        />
      </Box>
    </Grid>
  );
};

export default OptionsPrice;
