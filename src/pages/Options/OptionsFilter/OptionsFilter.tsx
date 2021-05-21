import React, { useState, useMemo } from 'react';
import {
  makeStyles,
  withStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CalendarIcon from 'assets/svg/CalendarIcon.svg';
import UniIcon from 'assets/svg/UniIcon.svg';

import {
  Box,
  Typography,
  Slider,
  Button,
  TextField,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { SingleDatePicker } from 'react-dates';

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

  singleDatePicker: {
    '& .SingleDatePicker': {
      width: '100%',
    },
    '& img': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: 8
    },

    '& .SingleDatePickerInput': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent !important',
      border: 'none'
    },

    '& .DateInput': {
      width: '100%',
      backgroundColor: 'transparent !important',
    },

    '& .DateInput_input': {
      color: 'white',
      fontSize: 14,
      backgroundColor: 'transparent !important',
      border: `1px solid ${theme.palette.divider}`,
      padding: '8px 32px 8px 8px',
      borderRadius: 8,

      '&::placeholder': {
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

  mark: {
    display: 'none'
  },

  thumb: {
    height: 16,
    width: 16,
    backgroundColor: theme.palette.primary.main,
    border: '4px solid white',
    marginTop: -4,
    marginLeft: -12,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',

    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  active: {},

  valueLabel: {
    left: 'calc(-50% - 8px)',
    top: 20,
    fontSize: 12,
    '& > span': {
      color: 'transparent'
    },
    '& > span > span': {
      color: theme.palette.common.white
    }
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
    fontSize: 12,
    color: theme.palette.text.secondary,
    transform: 'none',
    '&[data-index="1"]': {
      transform: 'translateX(-100%)'
    }
  },
}))(Slider);

const OptionFilter: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [ optionType, setOptionType ] = useState('call');
  const [ maturityDate, setMaturityDate ] = useState<any>()
  const [ maturityFocused, setMaturityFocused ] = useState(false)
  const [ strikePrice, setStrikePrice ] = useState<number | number[]>(100)
  const [ optionSize, setOptionSize ] = useState(100)
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

          <Box width={1}>
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

        <Box width={1} marginTop={2} marginBottom={2}>
          <Typography color='textPrimary'>
            Maturity
          </Typography>
          <Box position='relative' width={1} marginTop={1} className={classes.singleDatePicker}>
            <SingleDatePicker
              date={maturityDate}
              id='maturityDate'
              placeholder='Select date'
              focused={maturityFocused}
              onDateChange={(date) =>
                setMaturityDate(date)
              }
              onFocusChange={({ focused }) => {
                setMaturityFocused(focused)
              }}
            />
            <img src={CalendarIcon} alt='Calendar Icon' />
          </Box>
        </Box>
        
        <Box display='flex' justifyContent='space-between' alignItems='center' width={1} mt={2}>
          <Typography color='textPrimary'>
            Option Size
          </Typography>
          <Typography color='textSecondary' component='span' variant='body2'>
            Max size available: 40012
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' pl={1} width={1} border={1} borderColor={theme.palette.divider} borderRadius={12} height={46}>
          <img
            src={UniIcon}
            alt='Select Amount'
          />
          <TextField
            variant='outlined'
            value={optionSize}
            style={{flexGrow: 1}}
            onChange={(ev) => { setOptionSize(Number(ev.target.value)) }}
          />
          <Button color="primary" variant="outlined" size="small">
            MAX
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OptionFilter;
