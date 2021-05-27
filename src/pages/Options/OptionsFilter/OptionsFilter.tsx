import React, { useState } from 'react';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import { ReactComponent as CalendarIcon } from 'assets/svg/CalendarIcon.svg';
import { ReactComponent as UniIcon } from 'assets/svg/UniIcon.svg';
import { ColoredSlider } from 'components';
import cx from 'classnames';
import {
  Box,
  Typography,
  Button
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { useOptionType, useMaturityDate, useStrikePrice, useOptionSize } from 'state/options/hooks';

const useStyles = makeStyles(({ palette }) => ({
  optionSizeInputBox: {
    padding: 3,
    marginTop: 3,
    width: '100%',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${palette.divider}`,
    '& svg': {
      margin: '-4px 4px 0 2px'
    },
    '& svg path': {
      fill: palette.secondary.main
    },
    '& input': {
      flexGrow: 1,
      outline: 'none',
      fontSize: 14,
      fontFamily: 'DM Sans',
      color: palette.text.primary,
      background: 'transparent',
      border: 'none'
    }
  },

  focusedDatepicker: {
    '& > svg path': {
      fill: palette.primary.main
    }
  },

  singleDatePicker: {
    '& .SingleDatePicker': {
      width: '100%',
    },

    '& .DateInput_fang': {
      display: 'none'
    },

    '& .CalendarMonth, & .CalendarMonthGrid, & .DayPickerNavigation_button__default, & .CalendarDay__default': {
      background: 'transparent',
      border: 'none'
    },

    '& .CalendarMonth_caption': {
      color: palette.text.primary,
    },

    '& .CalendarDay__today': {
      color: palette.primary.main,
      position: 'relative',
      '&:before': {
        content: '""',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        background: palette.primary.dark,
        borderRadius: 6,  
      }
    },

    '& .CalendarDay__default:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__today):not(.CalendarDay__selected)': {
      color: palette.text.primary,
      position: 'relative',
      '&:hover, &:active': {
        color: palette.primary.main,
        '&:before': {
          content: '""',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          background: palette.primary.dark,
          borderRadius: 6  
        }
      }
    },

    '& .CalendarDay__blocked_out_of_range': {
      color: palette.text.secondary
    },

    '& .CalendarDay__default.CalendarDay__selected': {
      position: 'relative',
      color: palette.primary.main,
      '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: palette.primary.dark,
        border: `1px solid ${palette.primary.main}`,
        borderRadius: 6  
      }
    },

    '& .SingleDatePicker_picker': {
      zIndex: 3,
      width: '100%',
      marginTop: -16,
      borderRadius: 12,
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      background: palette.background.paper,
      border: `1px solid ${palette.divider}`,
      boxShadow: '0px 2px 5px rgb(0 0 0 / 7%)'
    },

    '& .DayPicker__withBorder': {
      boxShadow: 'none',
      // width: '100% !important',
      background: 'transparent',
      '& > div > div': {
        // width: '100% !important'
      }
    },

    '& .DateInput_input.DateInput_input__focused': {
      backgroundColor: 'rgba(82, 148, 255, 0.2)',
      border: `1px solid ${palette.primary.main}`,
      color: palette.primary.main,
      '& svg path': {
        fill: palette.primary.main
      }
    },

    '& > svg': {
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
      color: palette.text.primary,
      fontFamily: 'DM Sans',
      fontSize: 14,
      backgroundColor: 'transparent',
      border: `1px solid ${palette.divider}`,
      padding: '8px 32px 8px 8px',
      borderRadius: 8,

      '&::placeholder': {
        color: palette.text.secondary,
      },
    },
  }
}));

const OptionFilter: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { optionType, setOptionType } = useOptionType();
  const { maturityDate, setMaturityDate } = useMaturityDate();
  const [ maturityFocused, setMaturityFocused ] = useState(false);
  const { strikePrice, setStrikePrice } = useStrikePrice();
  const { optionSize, setOptionSize } = useOptionSize();

  console.log(maturityDate);

  return (
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

        <Box width={1} mt={1}>
          <ColoredSlider
            min={50}
            max={1500}
            marks={[50, 1500].map((value) => ({
              label: value,
              value
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
        <Typography color='textPrimary'>
          Maturity
        </Typography>
        <Box
          position='relative'
          width={1}
          marginTop={1}
          className={cx(
            classes.singleDatePicker,
            maturityFocused && classes.focusedDatepicker
          )}
        >
          <SingleDatePicker
            date={moment(maturityDate)}
            id='maturityDate'
            placeholder='Select date'
            focused={maturityFocused}
            numberOfMonths={1}
            hideKeyboardShortcutsPanel={true}
            onDateChange={(date) =>
              setMaturityDate(moment(date).format('YYYY-MM-DD'))
            }
            onFocusChange={({ focused }) => {
              setMaturityFocused(focused)
            }}
          />
          <CalendarIcon />
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
      <Box className={classes.optionSizeInputBox}>
        <UniIcon />
        <input
          value={optionSize}
          onChange={(ev) => { setOptionSize(Number(ev.target.value)) }}
        />
        <Button color="primary" variant="outlined" size="small">
          MAX
        </Button>
      </Box>
    </Box>
  );
};

export default OptionFilter;