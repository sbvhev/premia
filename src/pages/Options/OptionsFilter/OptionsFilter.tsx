import React, { useRef, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ReactComponent as CalendarIcon } from 'assets/svg/CalendarIcon.svg';
import { ReactComponent as UniIcon } from 'assets/svg/UniIcon.svg';
import { ColoredSlider } from 'components';
import cx from 'classnames';
import { Box, Typography, Button } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Calendar from 'react-calendar';
import moment from 'moment';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  useOptionType,
  useMaturityDate,
  useStrikePrice,
  useOptionSize,
} from 'state/options/hooks';
import { useOutsideAlerter } from 'hooks';

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

  optionSizeInputBox: {
    padding: 3,
    width: '100%',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${palette.divider}`,
    '& svg': {
      margin: '-4px 4px 0 2px',
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
      color: palette.text.secondary,
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
    opacity: 0,
    zIndex: 3,
    marginTop: 10,
    background: palette.background.paper,
    border: `1px solid ${palette.divider}`,
    boxShadow: '0px 2px 5px rgb(0 0 0 / 7%)',
    borderRadius: 12,
    overflow: 'hidden',
    transform: 'scale(0)',
    transformOrigin: '0 0',
    transition: 'opacity 354ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 236ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
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

  openTransition: {
    opacity: 1,
    transform: 'scale(1)'
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

const OptionFilter: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { optionType, setOptionType } = useOptionType();
  const { maturityDate, setMaturityDate } = useMaturityDate();
  const [maturityFocused, setMaturityFocused] = useState(false);
  const { strikePrice, setStrikePrice } = useStrikePrice();
  const { optionSize, setOptionSize } = useOptionSize();
  const calendarRef = useRef<HTMLInputElement | null>(null);

  useOutsideAlerter(calendarRef, () => setMaturityFocused(false));

  moment.updateLocale('en', { weekdaysMin: 'S_M_T_W_T_F_S'.split('_') });

  if (!moment(maturityDate).isValid()) {
    setMaturityDate(moment(new Date()).format('YYYY-MM-DD'));
  }

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
            color={optionType === 'call' ? 'primary' : undefined}
            style={{ marginRight: '3px' }}
            onClick={() => setOptionType('call')}
          >
            <ArrowUpwardIcon />
            &nbsp;Call
          </Button>
        </Box>

        <Box clone width={1 / 2}>
          <Button
            variant='contained'
            color={optionType === 'put' ? 'secondary' : undefined}
            style={{ marginLeft: '3px' }}
            onClick={() => setOptionType('put')}
          >
            <ArrowDownwardIcon />
            &nbsp;Put
          </Button>
        </Box>
      </Box>

      <Box width={1} mt={2}>
        <Typography className={classes.titleText}>Strike Price</Typography>

        <Box width={1} mt={0.5}>
          <ColoredSlider
            min={50}
            max={1500}
            marks={[50, 1500].map((value) => ({
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
          <Box className={cx(classes.calendarContainer, maturityFocused && classes.openTransition)}>
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
          Max size available: 40012
        </Typography>
      </Box>
      <Box className={classes.optionSizeInputBox}>
        <UniIcon />
        <input
          type='number'
          value={optionSize}
          onChange={(ev) => {
            setOptionSize(Number(ev.target.value));
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
