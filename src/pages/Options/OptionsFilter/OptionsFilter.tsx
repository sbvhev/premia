import React, { useRef, useState, useEffect, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Calendar from 'react-calendar';
import moment from 'moment';
import cx from 'classnames';

import {
  useUnderlyingPrice,
  useOptionType,
  useMaturityDate,
  useStrikePrice,
  useSize,
  useUnderlying,
} from 'state/options/hooks';
import { initialState as initialOptionsState } from 'state/options/reducer';
import { useOutsideAlerter } from 'hooks';
import { OptionType } from 'web3/options';
import { tokenIcons } from 'constants/tokenIcons';

import { ColoredSlider } from 'components';
import { ReactComponent as CalendarIcon } from 'assets/svg/CalendarIcon.svg';

const useStyles = makeStyles(({ palette }) => ({
  optionButtons: {
    padding: 3,
    '& button': {
      height: 41,
      margin: 0,
      '& span': {
        fontSize: 14,
        fontWeight: 700,
      },
    },
  },

  titleText: {
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 500,
    color: palette.text.primary,
    marginLeft: 8,
  },

  descText: {
    fontSize: 12,
    fontWeight: 500,
    color: palette.text.secondary,
  },

  uniIcon: {
    margin: '-4px 4px 0 6px !important',
  },

  sizeInputBox: {
    padding: 3,
    width: '100%',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${palette.divider}`,
    '& svg': {
      margin: '0 4px 0 8px',
    },
    '& svg path': {
      fill: palette.secondary.main,
    },
    '& input': {
      flexGrow: 1,
      outline: 'none',
      fontSize: 14,
      fontFamily: 'DM Sans',
      color: palette.text.primary,
      background: 'transparent',
      border: 'none',
      MozAppearance: 'textfield',
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
    },
  },

  dateInput: {
    width: '100%',
    height: 45,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    padding: 12,
    '& p': {
      fontSize: 14,
      color: palette.text.primary,
    },
    '& svg': {
      width: 20,
      '& path': {
        fill: palette.text.secondary,
      },
    },
  },

  focusedDateInput: {
    backgroundColor: palette.primary.dark,
    border: `1px solid ${palette.primary.main}`,
    '& p': {
      color: palette.primary.main,
    },
    '& svg path': {
      fill: palette.primary.main,
    },
  },

  calendarContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    marginTop: 10,
    background: palette.background.paper,
    border: `1px solid ${palette.divider}`,
    boxShadow: '0px 2px 5px rgb(0 0 0 / 7%)',
    borderRadius: 12,
    overflow: 'hidden',
    '& .react-calendar': {
      background: palette.background.paper,
      border: 'none',
      width: 'auto',
      fontFamily: 'DM Sans',
      '& .react-calendar__navigation__prev2-button, & .react-calendar__navigation__next2-button':
        {
          display: 'none',
        },
      '& .react-calendar__month-view__weekdays__weekday abbr': {
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 400,
        color: palette.text.secondary,
      },
      '& .react-calendar__month-view__days': {
        padding: '0 6px',
      },
      '& .react-calendar__month-view__weekdays': {
        borderBottom: `1px solid ${palette.divider}`,
        padding: '5px 6px 3px',
        '& abbr': {
          lineHeight: 1,
        },
      },
      '& .react-calendar__tile': {
        padding: 0,
        height: 30,
        marginTop: 8,
        position: 'relative',
        '&:not(:disabled)': {
          color: palette.text.primary,
        },
        '& abbr': {
          height: '100%',
          position: 'absolute',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 34.31,
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: 6,
        },
        '&.react-calendar__tile--now': {
          color: palette.primary.main,
          '& abbr': {
            background: palette.primary.dark,
          },
        },
        '&.react-calendar__tile--active': {
          color: palette.primary.main,
          '& abbr': {
            border: `1px solid ${palette.primary.main}`,
            background: palette.primary.dark,
          },
        },
      },
      '& .react-calendar__month-view__days__day--neighboringMonth': {
        color: `${palette.text.secondary} !important`,
        opacity: 0.3,
        pointerEvents: 'none',
      },
      '& .react-calendar__month-view__days__day': {
        background: 'none',
        color: palette.text.secondary,
      },
      '& .react-calendar__navigation': {
        borderBottom: `1px solid ${palette.divider}`,
        marginBottom: 0,
        padding: '0 6px',
      },
      '& .react-calendar__navigation button': {
        color: palette.text.primary,
        background: 'none',
        fontFamily: 'DM Sans',
        '&.react-calendar__navigation__label': {
          fontSize: 14,
          fontWeight: 500,
        },
        '&.react-calendar__navigation__arrow': {
          '& svg': {
            width: 14,
            '& path': {
              fill: palette.text.secondary,
            },
          },
        },
      },
    },
  },

  maturityContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    width: '100%',
    padding: '0 22px 0 20px',
    borderTop: `1px solid ${palette.divider}`,
    marginTop: 14,
    '& p': {
      color: palette.text.secondary,
      fontSize: 14,
    },
    '& span': {
      color: palette.primary.main,
      fontSize: 14,
      fontWeight: 500,
    },
  },
}));

export interface OptionFilterProps {
  tokenIndex: number;
}

const OptionFilter: React.FC<OptionFilterProps> = ({ tokenIndex = 0 }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { underlying } = useUnderlying();
  const { optionType, setOptionType } = useOptionType();
  const { maturityDate, setMaturityDate } = useMaturityDate();
  const { strikePrice, setStrikePrice } = useStrikePrice();
  const { size, setSize } = useSize();
  const [maturityFocused, setMaturityFocused] = useState(false);
  const underlyingPrice = useUnderlyingPrice();
  const calendarRef = useRef<HTMLInputElement | null>(null);

  const TokenIcon = useMemo(
    () => tokenIcons[underlying.symbol as keyof typeof tokenIcons],
    [underlying],
  );
  const rounding = useMemo(
    () => Math.pow(10, Math.round(Math.log10(underlyingPrice) - 1)),
    [underlyingPrice],
  );
  const roundedPrice = useMemo(
    () => Math.round(underlyingPrice / rounding) * rounding,
    [underlyingPrice, rounding],
  );
  const minPrice = useMemo(
    () => Math.ceil((underlyingPrice * 0.5) / rounding) * rounding,
    [underlyingPrice, rounding],
  );
  const maxPrice = useMemo(
    () => Math.floor((underlyingPrice * 2) / rounding) * rounding,
    [underlyingPrice, rounding],
  );

  useOutsideAlerter(calendarRef, () => setMaturityFocused(false));

  moment.updateLocale('en', { weekdaysMin: 'S_M_T_W_T_F_S'.split('_') });

  useEffect(() => {
    if (!moment(maturityDate).isValid()) {
      setMaturityDate(initialOptionsState.maturityDate);
    }
  }, [maturityDate, setMaturityDate]);

  useEffect(() => {
    if (strikePrice === 0 && underlyingPrice) {
      setStrikePrice(roundedPrice);
    }
  }, [underlyingPrice, roundedPrice, strikePrice, setStrikePrice]);

  return (
    <Box width={1}>
      <Box
        display='flex'
        border={1}
        className={classes.optionButtons}
        borderColor={theme.palette.divider}
        borderRadius={12}
      >
        <Box clone width={1 / 2}>
          <Button
            variant='contained'
            color={optionType === OptionType.Call ? 'primary' : undefined}
            style={{ marginRight: '3px' }}
            onClick={() => setOptionType(OptionType.Call)}
          >
            <ArrowUpwardIcon />
            &nbsp;Call
          </Button>
        </Box>

        <Box clone width={1 / 2}>
          <Button
            variant='contained'
            color={optionType === OptionType.Put ? 'secondary' : undefined}
            style={{ marginLeft: '3px' }}
            onClick={() => setOptionType(OptionType.Put)}
          >
            <ArrowDownwardIcon />
            &nbsp;Put
          </Button>
        </Box>
      </Box>

      <Box width={1} mt={2}>
        <Typography className={classes.titleText}>Strike Price</Typography>

        <Box width={1} mt={0.5}>
          {strikePrice !== 0 && (
            <ColoredSlider
              min={minPrice}
              max={maxPrice}
              marks={[minPrice, maxPrice].map((value) => ({
                label: value,
                value,
              }))}
              step={0.01}
              value={strikePrice}
              valueLabelDisplay='on'
              onChange={(event: any, value) => {
                setStrikePrice(value as number);
              }}
            />
          )}
        </Box>
      </Box>

      <Box width={1} marginBottom={2}>
        <Typography className={classes.titleText}>Maturity</Typography>
        <Box position='relative' width={1}>
          <Box
            className={cx(
              classes.dateInput,
              maturityFocused && classes.focusedDateInput,
            )}
            onClick={() => setMaturityFocused(!maturityFocused)}
          >
            <Typography>
              {moment(new Date(maturityDate)).isValid()
                ? moment(new Date(maturityDate)).format('YYYY-MM-DD')
                : 'Select Date'}
            </Typography>
            <CalendarIcon />
          </Box>
          {maturityFocused && (
            <Box className={classes.calendarContainer}>
              <Calendar
                inputRef={calendarRef as any}
                minDate={new Date()}
                prevLabel={<ArrowBackIosIcon />}
                nextLabel={<ArrowForwardIosIcon />}
                formatShortWeekday={(locale, date) => moment(date).format('dd')}
                onChange={(date) => {
                  setMaturityFocused(false);
                  setMaturityDate(moment(date).toISOString());
                }}
                value={new Date(maturityDate)}
              />
              <Box className={classes.maturityContainer}>
                <Typography>Days to maturity</Typography>
                <Typography component='span'>
                  {moment(new Date(maturityDate)).diff(
                    moment(new Date()),
                    'days',
                  )}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        width={1}
        mt={2}
      >
        <Typography className={classes.titleText}>Option Size</Typography>
        <Typography className={classes.descText}>
          Max size available: 40,012
        </Typography>
      </Box>
      <Box className={classes.sizeInputBox}>
        <TokenIcon
          height={18}
          className={underlying.symbol === 'UNI' ? classes.uniIcon : ''}
        />
        <input
          type='number'
          value={size}
          onChange={(ev) => {
            setSize(Number(ev.target.value));
          }}
        />
        <Button color='primary' variant='outlined' size='small'>
          MAX
        </Button>
      </Box>
    </Box>
  );
};

export default OptionFilter;
