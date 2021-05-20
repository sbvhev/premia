import React, { useState, useMemo } from 'react';
import {
  makeStyles,
  withStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  Box,
  Typography,
  Slider,
  Button,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { DateRangePicker } from 'react-dates';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { useWeb3 } from 'state/application/hooks';
import { formatCompact } from 'utils/formatNumber';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
  },

  title: {
    flex: '1 1 30%',
    marginBottom: 8,
  },
  titleCenter: {
    textAlign: 'center',
    margin: '10px 0 14px',
  },

  negativeMargin: {
    marginBottom: '-16px',
  },

  dateRangePicker: {
    '& .DateRangePicker': {
      width: '100%',
    },

    '& .DateRangePickerInput': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent !important',
    },

    '& .DateInput': {
      width: 'calc(50% - 20px)',
      backgroundColor: 'transparent !important',
    },

    '& .DateInput_input': {
      color: 'white',
      fontFamily: 'Roboto Mono',
      fontWeight: 400,
      fontSize: '0.85rem',
      letterSpacing: 'normal',
      backgroundColor: 'rgba(228, 228, 228, 0.1) !important',
      padding: '4px 8px',
      borderRadius: 8,

      '&::placeholder': {
        fontWeight: 400,
        letterSpacing: 'normal',
        color: theme.palette.text.secondary,
      },
    },

    '& .DateInput_input__focused': {
      borderColor: 'transparent',
    },
  }
}));

const ColoredSlider = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    height: 8,
  },

  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,

    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  active: {},

  valueLabel: {
    left: 'calc(-50% + 4px)',
  },

  track: {
    height: 8,
    borderRadius: 4,
  },

  rail: {
    height: 8,
    borderRadius: 4,
  },

  markLabel: {
    marginTop: 4,
  },
}))(Slider);

export interface MarketOptionFilterProps {
  hidePair?: boolean;
  center?: boolean;
}

const MarketOptionFilter: React.FC<MarketOptionFilterProps> = ({
  hidePair = false,
  center,
}) => {
  const [focusedInput, setFocusedInput] = useState<
    'startDate' | 'endDate' | null
  >(null);
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [ optionType, setOptionType ] = useState('call');
  const [ expiration, setExpiration ] = useState<any>()
  const [ strikePrice, setStrikePrice ] = useState<number | number[]>(100)
  return (
    <Box clone width={1} py={2} px={2} border={1} borderColor={theme.palette.divider} borderRadius={12} boxShadow={3}>
      <Box width={1}>
        <Box display='flex' border={1} borderColor={theme.palette.divider} borderRadius={12}>
          <Box clone width={1 / 2}>
            <Button
              variant='contained'
              color={optionType === 'call' ? 'primary' : undefined}
              onClick={() =>
                setOptionType('call')
              }
            >
              <ArrowUpwardIcon />
              &nbsp;Call
            </Button>
          </Box>

          <Box clone width={1 / 2}>
            <Button
              variant='contained'
              color={optionType === 'put' ? 'secondary' : undefined}
              onClick={() =>
                setOptionType('put')
              }
            >
              <ArrowDownwardIcon />
              &nbsp;Put
            </Button>
          </Box>
        </Box>

        <Box width={1} mt={2}>
          <Typography color='textPrimary'>
            Strike Price
          </Typography>

          <Box width={1} paddingX={2}>
            <ColoredSlider
              min={50}
              max={1500}
              marks={[50, 1500].map((value) => ({
                label: formatCompact(value),
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

        <Box width={1} marginTop={2} marginBottom={2} className={classes.dateRangePicker}>
          <DateRangePicker
            noBorder
            hideKeyboardShortcutsPanel
            customInputIcon={null}
            startDate={null}
            startDateId='MarketOptionFilter__startDate'
            endDate={null}
            endDateId='MarketOptionFilter__endDate'
            onDatesChange={({ startDate, endDate }) =>
              setExpiration({ start: startDate, end: endDate })
            }
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) =>
              setFocusedInput(focusedInput)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MarketOptionFilter;
