import React, { useState } from 'react';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import PriceRectangle from 'assets/svg/PriceRectangle.svg';
import PriceRectangleLight from 'assets/svg/PriceRectangleLight.svg';
import PriceRectangleMobile from 'assets/svg/PriceRectangleMobile.svg';
import PriceRectangleMobileLight from 'assets/svg/PriceRectangleMobileLight.svg';
import BarometerBg1 from 'assets/svg/BarometerBg1.svg';
import BarometerBg1Light from 'assets/svg/BarometerBg1Light.svg';
import BarometerBg2 from 'assets/svg/BarometerBg2.svg';
import BarometerBg3 from 'assets/svg/BarometerBg3.svg';
import BarometerBg3Light from 'assets/svg/BarometerBg3Light.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Grid, Typography } from '@material-ui/core';
import { useOptionType } from 'state/options/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import HelpIcon from '@material-ui/icons/HelpOutline';
import cx from 'classnames';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  chartCallTop: {
    background: `linear-gradient(180deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    [breakpoints.down('md')]: {
      background: `linear-gradient(90deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 12,  
    },
  },
  chartCallBottom: {
    background: `linear-gradient(0deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    [breakpoints.down('md')]: {
      background: `linear-gradient(270deg, ${palette.success.dark} 0%, ${palette.success.main} 100%)`,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 12,
    },
  },
  chartPutTop: {
    background: `linear-gradient(180deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    [breakpoints.down('md')]: {
      background: `linear-gradient(90deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 12,
    },
  },
  chartPutBottom: {
    background: `linear-gradient(0deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    [breakpoints.down('md')]: {
      background: `linear-gradient(270deg, ${palette.error.main} 0%, ${palette.error.dark} 100%)`,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 12,
    },
  },
  chartItem: {
    transition: 'all 1s',
    '&:hover > div:first-child': {
      opacity: 1,
      marginLeft: 20,
      [breakpoints.down('md')]: {
        top: -36,
        marginLeft: 0,
      },
    },
    '&:hover > div:last-child': {
      zIndex: 3
    }
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
  unlimitedText: {
    width: 80,
    position: 'absolute',
    top: '50%',
    marginLeft: 0,
    transition: 'all 1s',
    opacity: 0,
    transform: 'translateY(-50%)',
    [breakpoints.down('md')]: {
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center'
    },
  },
  limitBox: {
    position: 'absolute',
    marginLeft: 6,
    zIndex: 1,
    transition: 'all 0.5s',
    color: palette.text.secondary,
    [breakpoints.down('md')]: {
      marginLeft: 0,
      top: 6
    },
    '& div': {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 2,
      left: 20,
      [breakpoints.down('md')]: {
        position: 'relative'
      },
    },
    '& svg': {
      width: 14,
      margin: '0 4px'
    }
  },
  priceFont: {
    fontSize: 12,
    lineHeight: 1.2
  },
  transitionItem: {
    transition: 'all 1s',
  },
  hovered: {
    opacity: 0.5
  }
}));

const OptionsPrice: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { optionType } = useOptionType();
  const darkMode = useIsDarkMode();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [ hoveredTop, setHoveredTop ] = useState(false);
  const [ hoveredBottom, setHoveredBottom ] = useState(false);
  
  return (
    <Grid container direction={mobile ? 'column' : 'row'} justify='center' alignItems='center'>
      <Box position='relative' mt={mobile ? 0 : 1} mb={mobile ? -4 : 0} mr={mobile ? 0 : -0.75} zIndex={2} className={cx(classes.transitionItem, (hoveredTop || hoveredBottom) && classes.hovered)}>
        <img src={darkMode ? mobile ? PriceRectangleMobile : PriceRectangle : mobile ? PriceRectangleMobileLight : PriceRectangleLight} alt='Current Price' />
        <Box zIndex={2} className={classes.currentPrice}>
          <p>Current Price</p>
          <p>
            <b>$1,749.37</b>
          </p>
        </Box>
      </Box>
      <Box width={mobile ? 1.1 : 30} height={mobile ? 30 : 1.5} mb={mobile ? -1.5 : 0} mr={mobile ? 0 : -1.5} bgcolor={ darkMode ? theme.palette.common.white : theme.palette.secondary.main } zIndex={1} />
      <Box display='flex' flexDirection={mobile ? 'row' : 'column' } justifyContent='space-between' width={mobile ? 1 : 12} height={mobile ? 12 : 540} border={1} borderColor={theme.palette.divider} borderRadius={12}>
        <Box width={mobile ? 1/3 : 1} height={mobile ? 1 : 1/3} className={cx(optionType === 'call' ? classes.chartCallTop : classes.chartPutTop, classes.chartItem, hoveredBottom && classes.hovered)} onMouseEnter={() => { setHoveredTop(true) }} onMouseLeave={() => { setHoveredTop(false) }} position='relative'>
          <Box className={classes.unlimitedText}>
            <Typography className={classes.priceFont}>Unlimited upside</Typography>
          </Box>
          <Box className={classes.limitBox} bottom={mobile ? 'unset' : -24} right={mobile ? 20 : 'unset'}>
            {!mobile && <img src={BarometerBg2} alt='Barometer Bg2' />}
            <Box>
              { mobile && <HelpIcon />}
              <Typography className={classes.priceFont}>$1,843</Typography>
              { !mobile && <HelpIcon />}
            </Box>
          </Box>
        </Box>
        <Box width={mobile ? 1/3 : 1} height={mobile ? 1 : 1/3} className={cx(optionType === 'call' ? classes.chartPutBottom : classes.chartCallBottom, classes.chartItem, hoveredTop && classes.hovered )} onMouseEnter={() => { setHoveredBottom(true) }} onMouseLeave={() => { setHoveredBottom(false) }} position='relative'>
          <Box className={classes.unlimitedText}>
            <Typography className={classes.priceFont}>Unlimited upside</Typography>
          </Box>
          <Box className={classes.limitBox} top={mobile ? 'unset' : -16} left={mobile ? -20 : 'unset'}>
            {!mobile && <img src={BarometerBg2} alt='Barometer Bg2' />}
            <Box>
              <Typography className={classes.priceFont}>$1,504</Typography>
              <HelpIcon />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position='relative' width={mobile ? 1 : 80} height={mobile ? 80 : 540}>
        <Box position='absolute' left={mobile ? 'calc(50% - 80px)' : 'unset'} top={mobile ? 15 : 'calc(50% - 90px)'} zIndex={2} className={cx(classes.transitionItem, (hoveredTop || hoveredBottom) && classes.hovered)}>
          <Box width={mobile ? 1.1 : 12} height={mobile ? 28 : 1.1} bgcolor='#29CB84' position='absolute' top={mobile ? -26 : 21} left={mobile ? '50%' : -12} />
          <img src={mobile ? darkMode ? BarometerBg3 : BarometerBg3Light : darkMode ? BarometerBg1 : BarometerBg1Light} alt='Barometer Bg1' />
          <Box textAlign={mobile ? 'center' : 'right'} position='absolute' width={1} height={1} top={mobile ? 15 : 7} right={mobile ? 'unset' : 10}>
            <Typography className={classes.priceFont}>Possible P&L</Typography>
            <Typography className={classes.priceFont}><b>$1,749.37</b></Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default OptionsPrice;
