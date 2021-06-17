import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Typography, RootRef } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Draggable from 'react-draggable';
import cx from 'classnames';

import {
  useOptionType,
  useUnderlyingPrice,
  useBreakEvenPrice,
  useStrikePrice,
  useUnderlying,
  useSize,
  usePricePerUnitInUsd,
} from 'state/options/hooks';
import { usePrices } from 'state/application/hooks';
import { useIsDarkMode } from 'state/user/hooks';
import { OptionType } from 'web3/options';
import { formatCompact } from 'utils/formatNumber';

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
import BarometerBg4 from 'assets/svg/BarometerBg4.svg';
import BarometerBg4Light from 'assets/svg/BarometerBg4Light.svg';

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
    left: 32,
    [breakpoints.down('md')]: {
      left: 45,
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
      '& svg': {
        margin: '0 !important',
      },
    },
    '& div': {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 8,
      right: 8,
      [breakpoints.down('md')]: {
        position: 'relative',
      },
    },
    '& svg': {
      width: 14,
      margin: '-2px 0 -2px 2px',
      '& path': {
        fill: palette.text.secondary,
      },
    },
  },
  possiblePLLeft: {
    position: 'absolute',
    zIndex: 1,
    color: palette.text.secondary,
    '& div': {
      position: 'absolute',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      top: 14,
      [breakpoints.down('md')]: {
        position: 'relative',
        top: 4,
        left: -20,
      },
    },
    '& img': {
      height: 48,
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
  currentPriceContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: 26,
    '& img': {
      marginRight: -26
    },
    [breakpoints.down('md')]: {
      marginLeft: 0,
      marginTop: 26,
      '& img': {
        marginRight: 0,
        marginBottom: -26
      }
    },
  },
  currentPriceLine: {
    width: (props: any) => (props.mobile ? 1 : 16),
    height: (props: any) => (props.mobile ? 16 : 1.47),
    background: (props: any) =>
      props.darkMode
        ? palette.text.primary
        : 'linear-gradient(121.21deg, #5294FF 7.78%, #1EFF78 118.78%)',
    boxShadow: (props: any) =>
      props.darkMode
        ? '0px 0px 16px #00FF97'
        : '0px 0px 25px rgba(59, 197, 193, 0.4)',
  },
}));

const OptionsPrice: React.FC = () => {
  const possiblePLBox = useRef<any>(null);
  const possiblePLBoxContainer = useRef<any>(null);
  const barRef = useRef<any>(null);
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
  const { strikePrice } = useStrikePrice();
  const { underlying } = useUnderlying();
  const { size } = useSize();
  const { pricePerUnitInUsd } = usePricePerUnitInUsd();
  const breakEvenPrice = useBreakEvenPrice();
  const darkMode = useIsDarkMode();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const underlyingPrice = useUnderlyingPrice();
  const [hoveredTop, setHoveredTop] = useState(false);
  const [hoveredBottom, setHoveredBottom] = useState(false);
  const classes = useStyles({ darkMode, mobile });

  const prices = usePrices();
  const currentPrice = prices[underlying.symbol];
  const isCall = optionType === OptionType.Call;
  const standardWidth = 16;
  const barHeight = mobile ? standardWidth : '70vh';
  const barWidth = mobile ? 1 : standardWidth;
  const [plPrice, setPLPrice] = useState(0);
  const [potentialProfit, setPotentialProfit] = useState(0);
  const barSize = mobile
    ? barRef.current?.clientWidth
    : barRef.current?.clientHeight;
  const topPrice = isCall ? pricePerUnitInUsd + breakEvenPrice : Number(strikePrice) + pricePerUnitInUsd;
  const bottomPrice = isCall ? Number(strikePrice) - pricePerUnitInUsd : breakEvenPrice - pricePerUnitInUsd;
  const plFirstPrice = (currentPrice || 0) * 1.2;
  let pLBoxPos = (topPrice > bottomPrice ? (topPrice - plFirstPrice) / (topPrice - bottomPrice) * barSize : 0) - (mobile ? 58 : 22);
  let currentPricePos = (topPrice > bottomPrice ? (topPrice - currentPrice) / (topPrice - bottomPrice) * barSize : 0) - (mobile ? 83 : 46);
  if (plFirstPrice > topPrice) {
    pLBoxPos = mobile ? -58 : -22;
  } else if (plFirstPrice < bottomPrice) {
    pLBoxPos = barSize - (mobile ? 58 : 22);
  }
  if (currentPrice > topPrice) {
    currentPricePos = mobile ? -83 : -46;
  } else if (currentPrice < bottomPrice) {
    currentPricePos = barSize - (mobile ? 83 : 46);
  }

  const baroSize = topPrice > bottomPrice ? pricePerUnitInUsd / (topPrice - bottomPrice) : 0;

  useEffect(() => {
    if (mobile) {
      possiblePLBox.current.state.x = 0;
    } else {
      possiblePLBox.current.state.y = 0;
    }
  }, [strikePrice])

  useEffect(() => {
    const setFirstPrice = () => {
      setPLPrice(plFirstPrice);
      setPotentialProfit(Math.max(
        -1 * pricePerUnitInUsd * size,
        (isCall ? 1 : -1) * (plFirstPrice - breakEvenPrice) * size,
      ));
    };
    setFirstPrice();
  }, [breakEvenPrice, isCall, plFirstPrice, pricePerUnitInUsd, size]);

  const onDragPL = () => {
    let plPrice1;
    if (topPrice > bottomPrice) {
      plPrice1 =
        plFirstPrice -
        ((mobile
          ? possiblePLBox.current.state.x
          : possiblePLBox.current.state.y) /
          barSize) * (topPrice - bottomPrice);
    } else {
      plPrice1 = 0;
    }

    setPLPrice(plPrice1);
    setPotentialProfit(Math.max(
      -1 * pricePerUnitInUsd * size,
      (isCall ? 1 : -1) * (plPrice1 - breakEvenPrice) * size,
    ))
  };

  return (
    <Grid
      container
      direction={mobile ? 'column' : 'row'}
      justify='center'
      alignItems='center'
    >
      <Box
        position='relative'
        width={mobile ? 1 : 176}
        height={mobile ? 100 : 1}
        zIndex={2}
        className={cx(
          classes.transitionItem,
          (hoveredTop || hoveredBottom) && classes.hovered,
        )}
      >
        <Box
          className={classes.currentPriceContainer}
          top={mobile ? 'unset' : currentPricePos}
          left={mobile ? currentPricePos : 'unset'}
          flexDirection={mobile ? 'column' : 'row'}
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
              <b>${formatCompact(underlyingPrice)}</b>
            </p>
          </Box>
          <Box
            zIndex={2}
            className={cx(
              classes.currentPriceLine,
              classes.transitionItem,
              (hoveredTop || hoveredBottom) && classes.hovered,
            )}
          />
        </Box>
      </Box>
      <div ref={barRef} style={{ width: mobile ? '100%' : 'auto' }}>
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
            width={
              mobile ? baroSize : 1
            }
            height={
              mobile ? 1 : baroSize
            }
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
              right={mobile ? -20 : 'unset'}
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
                  ${formatCompact(isCall ? breakEvenPrice : strikePrice)}
                </Typography>
                {!mobile && <HelpIcon />}
              </Box>
            </Box>
          </Box>
          <Box
            width={
              mobile ? baroSize : 1
            }
            height={
              mobile ? 1 : baroSize
            }
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
                  ${formatCompact(isCall ? strikePrice : breakEvenPrice)}
                </Typography>
                <HelpIcon />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
      <RootRef rootRef={possiblePLBoxContainer}>
        <Box
          position='relative'
          width={mobile ? 1 : 40}
          height={mobile ? 80 : '70vh'}
        >
          <Draggable
            axis={mobile ? 'x' : 'y'}
            bounds={{
              left: -1 * pLBoxPos - 58,
              right: possiblePLBoxDimensions.width - pLBoxPos - 58,
              top: -1 * pLBoxPos - 22,
              bottom: possiblePLBoxDimensions.height - pLBoxPos - 22,
            }}
            onDrag={onDragPL}
            scale={1}
            ref={possiblePLBox}
          >
            <Box
              position='absolute'
              left={mobile ? pLBoxPos : 'unset'}
              top={mobile ? 11 : pLBoxPos}
              zIndex={1}
              id='possiblePLBox'
              className={cx(
                classes.draggableItem,
                (hoveredTop || hoveredBottom) && classes.hovered,
              )}
            >
              <Box
                className={classes.possiblePLLeft}
                top={mobile ? -52 : 0}
                left={mobile ? 54 : -100}
              >
                {!mobile && (
                  <img
                    src={darkMode ? BarometerBg4 : BarometerBg4Light}
                    alt='Barometer Bg4'
                  />
                )}
                <Box>
                  <Typography className={classes.priceFont}>
                    ${formatCompact(plPrice)}
                  </Typography>
                </Box>
              </Box>
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
                  <b>${formatCompact(potentialProfit)}</b>
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
