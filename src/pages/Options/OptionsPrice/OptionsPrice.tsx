import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Typography, RootRef } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Draggable from 'react-draggable';
import cx from 'classnames';

import {
  useOptionType,
  useUnderlyingPrice,
  usePricePerUnit,
  useBreakEvenPrice,
} from 'state/options/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import { OptionType } from 'web3/options';

import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import PriceRectangle from 'assets/svg/PriceRectangle.svg';
import PriceRectangleLight from 'assets/svg/PriceRectangleLight.svg';
import PriceRectangleMobile from 'assets/svg/PriceRectangleMobile.svg';
import PriceRectangleMobileLight from 'assets/svg/PriceRectangleMobileLight.svg';
import BarometerBg1 from 'assets/svg/BarometerBg1.svg';
import BarometerBg1Light from 'assets/svg/BarometerBg1Light.svg';
import BarometerBg2 from 'assets/svg/BarometerBg2.svg';
import BarometerBg2Light from 'assets/svg/BarometerBg2Light.svg';
import BarometerBg3 from 'assets/svg/BarometerBg3.svg';
import BarometerBg3Light from 'assets/svg/BarometerBg3Light.svg';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  chartCallTop: {
    background: `linear-gradient(180deg, #2DE29E 0%, #0062FF 100%)`,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    opacity: 0.8,
    [breakpoints.down('md')]: {
      background: `linear-gradient(90deg, #2DE29E 0%, #0062FF 100%)`,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 12,
    },
  },
  chartCallBottom: {
    background: `linear-gradient(0deg, #2DE29E 0%, #0062FF 100%)`,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    opacity: 0.8,
    [breakpoints.down('md')]: {
      background: `linear-gradient(270deg, #2DE29E 0%, #0062FF 100%)`,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 12,
    },
  },
  chartPutTop: {
    background: `linear-gradient(180deg, #EB844A 0%, #BF47C3 100%)`,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    opacity: 0.8,
    [breakpoints.down('md')]: {
      background: `linear-gradient(90deg, #EB844A 0%, #BF47C3 100%)`,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 12,
    },
  },
  chartPutBottom: {
    background: `linear-gradient(0deg, #EB844A 0%, #BF47C3 100%)`,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    opacity: 0.8,
    [breakpoints.down('md')]: {
      background: `linear-gradient(270deg, #EB844A 0%, #BF47C3 100%)`,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 12,
    },
  },
  chartItem: {
    transition: 'all 0.5s',
    '&:hover > div:first-child': {
      opacity: 1,
      marginLeft: 20,
      [breakpoints.down('md')]: {
        top: -36,
        marginLeft: 0,
      },
    },
    '&:hover > div:last-child': {
      zIndex: 3,
    },
  },
  rotate: {
    transform: 'matrix(0, 1, 1, 0, 0, 0)',
  },
  currentPrice: {
    position: 'absolute',
    top: 31,
    left: 36,
    [breakpoints.down('md')]: {
      top: 'calc(50% - 8px)',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
    '& p': {
      color: palette.text.hint,
      margin: '0 0 -4px 0',
      fontSize: 12,
    },
  },
  unlimitedText: {
    width: 80,
    position: 'absolute',
    top: '50%',
    zIndex: 3,
    marginLeft: 0,
    transition: 'all 0.5s',
    opacity: 0,
    transform: 'translateY(-50%)',
    [breakpoints.down('md')]: {
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
    },
  },
  limitBox: {
    position: 'absolute',
    marginLeft: 9,
    zIndex: 1,
    transition: 'all 0.5s',
    color: palette.text.secondary,
    [breakpoints.down('md')]: {
      marginLeft: 0,
      top: 8,
    },
    '& div': {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 8,
      right: 10,
      [breakpoints.down('md')]: {
        position: 'relative',
      },
    },
    '& svg': {
      width: 14,
      margin: '-2px 0 -2px 4px',
      '& path': {
        fill: palette.text.secondary,
      },
    },
  },
  priceFont: {
    fontSize: 12,
    lineHeight: 1.2,
  },
  transitionItem: {
    transition: 'all 0.5s',
  },
  hovered: {
    opacity: 0.5,
  },
  draggableItem: {
    cursor: 'pointer',
    transition: 'opacity 0.5s',
    '& img': {
      marginLeft: -1,
    },
  },
  currentPriceLine: {
    width: (props: any) => (props.mobile ? 1 : 31),
    height: (props: any) => (props.mobile ? 31 : 1.47),
    background: (props: any) =>
      props.darkMode
        ? palette.text.primary
        : 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
    boxShadow: (props: any) =>
      props.darkMode
        ? '0px 0px 16px #00FF97'
        : '0px 0px 25px rgba(59, 197, 193, 0.4)',
    marginRight: (props: any) => (props.mobile ? 0 : -16),
    marginBottom: (props: any) => (props.mobile ? -16 : 0),
  },
}));

const OptionsPrice: React.FC = () => {
  const possiblePLBox = useRef<any>(null);
  const possiblePLBoxContainer = useRef<any>(null);
  const [possiblePLBoxDimensions, setPossiblePLBoxDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setPossiblePLBoxDimensions({
        width: possiblePLBoxContainer.current.clientWidth,
        height: possiblePLBoxContainer.current.clientHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = useTheme();
  const { optionType } = useOptionType();
  const breakEvenPrice = useBreakEvenPrice();
  const darkMode = useIsDarkMode();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const underlyingPrice = useUnderlyingPrice();
  const { pricePerUnit } = usePricePerUnit();
  const [hoveredTop, setHoveredTop] = useState(false);
  const [hoveredBottom, setHoveredBottom] = useState(false);
  const classes = useStyles({ darkMode, mobile });

  const isCall = optionType === OptionType.Call;
  const standardWidth = 16;
  const barHeight = mobile ? standardWidth : '70vh';
  const barWidth = mobile ? 1 : standardWidth;
  const pLBoxPos = 250;

  console.log('perUnit', pricePerUnit);

  return (
    <Grid
      container
      direction={mobile ? 'column' : 'row'}
      justify='center'
      alignItems='center'
    >
      <Box
        position='relative'
        mt={mobile ? 0 : 0.7}
        mb={mobile ? -4 : 0}
        mr={mobile ? 0 : -3.25}
        zIndex={2}
        className={cx(
          classes.transitionItem,
          (hoveredTop || hoveredBottom) && classes.hovered,
        )}
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
          <p>Current price</p>
          <p>
            <b>${underlyingPrice}</b>
          </p>
        </Box>
      </Box>
      <Box
        zIndex={1}
        className={cx(
          classes.currentPriceLine,
          classes.transitionItem,
          (hoveredTop || hoveredBottom) && classes.hovered,
        )}
      />
      <Box
        display='flex'
        flexDirection={mobile ? 'row' : 'column'}
        justifyContent='space-between'
        width={barWidth}
        height={barHeight}
        border={1}
        bgcolor={theme.palette.background.paper}
        borderColor={theme.palette.divider}
        borderRadius={12}
      >
        <Box
          width={mobile ? 1 / 3 : 1}
          height={mobile ? 1 : 1 / 3}
          className={cx(
            optionType === OptionType.Call
              ? classes.chartCallTop
              : classes.chartPutTop,
            classes.chartItem,
            hoveredBottom && classes.hovered,
          )}
          onMouseEnter={() => {
            setHoveredTop(true);
          }}
          onMouseLeave={() => {
            setHoveredTop(false);
          }}
          position='relative'
        >
          <Box className={classes.unlimitedText}>
            <Typography className={classes.priceFont}>
              {isCall ? 'Unlimited upside' : 'Worthless expiration'}
            </Typography>
          </Box>
          <Box
            className={classes.limitBox}
            bottom={mobile ? 'unset' : -24}
            right={mobile ? 20 : 'unset'}
          >
            {!mobile && (
              <img
                src={darkMode ? BarometerBg2 : BarometerBg2Light}
                alt='Barometer Bg2'
              />
            )}
            <Box>
              {mobile && <HelpIcon />}
              <Typography className={classes.priceFont}>
                ${breakEvenPrice}
              </Typography>
              {!mobile && <HelpIcon />}
            </Box>
          </Box>
        </Box>
        <Box
          width={mobile ? 1 / 3 : 1}
          height={mobile ? 1 : 1 / 3}
          className={cx(
            optionType === OptionType.Call
              ? classes.chartPutBottom
              : classes.chartCallBottom,
            classes.chartItem,
            hoveredTop && classes.hovered,
          )}
          onMouseEnter={() => {
            setHoveredBottom(true);
          }}
          onMouseLeave={() => {
            setHoveredBottom(false);
          }}
          position='relative'
        >
          <Box className={classes.unlimitedText}>
            <Typography className={classes.priceFont}>
              {isCall ? 'Worthless expiration' : 'Unlimited upside'}
            </Typography>
          </Box>
          <Box
            className={classes.limitBox}
            top={mobile ? 'unset' : -14.6}
            left={mobile ? -20 : 'unset'}
          >
            {!mobile && (
              <img
                src={darkMode ? BarometerBg2 : BarometerBg2Light}
                alt='Barometer Bg2'
              />
            )}
            <Box>
              <Typography className={classes.priceFont}>
                ${breakEvenPrice}
              </Typography>
              <HelpIcon />
            </Box>
          </Box>
        </Box>
      </Box>
      <RootRef rootRef={possiblePLBoxContainer}>
        <Box
          position='relative'
          width={mobile ? 1 : 40}
          height={mobile ? 80 : '70vh'}
        >
          <Draggable
            axis={mobile ? 'x' : 'y'}
            bounds={{
              left: -1 * pLBoxPos - 55,
              right: possiblePLBoxDimensions.width - pLBoxPos - 65,
              top: -1 * pLBoxPos - 15,
              bottom: possiblePLBoxDimensions.height - pLBoxPos - 30,
            }}
            scale={1}
            ref={possiblePLBox}
          >
            <Box
              position='absolute'
              left={mobile ? pLBoxPos : 'unset'}
              top={mobile ? 11 : pLBoxPos}
              zIndex={2}
              id='possiblePLBox'
              className={cx(
                classes.draggableItem,
                (hoveredTop || hoveredBottom) && classes.hovered,
              )}
            >
              <Box
                width={mobile ? 1.1 : 16}
                height={mobile ? 28 : 1.1}
                bgcolor={darkMode ? '#29CB84' : theme.palette.secondary.main}
                position='absolute'
                top={mobile ? -26 : 21}
                left={mobile ? '50%' : -16}
              />
              <img
                src={
                  mobile
                    ? darkMode
                      ? BarometerBg3
                      : BarometerBg3Light
                    : darkMode
                    ? BarometerBg1
                    : BarometerBg1Light
                }
                alt='Barometer Bg1'
              />
              <Box
                textAlign={mobile ? 'center' : 'right'}
                position='absolute'
                width={1}
                height={1}
                top={mobile ? 15 : 7}
                right={mobile ? 'unset' : 10}
                color='white'
              >
                <Typography className={classes.priceFont}>
                  Possible P&L
                </Typography>
                <Typography className={classes.priceFont}>
                  <b>${underlyingPrice}</b>
                </Typography>
              </Box>
            </Box>
          </Draggable>
        </Box>
      </RootRef>
    </Grid>
  );
};

export default OptionsPrice;
