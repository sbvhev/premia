import React, { useState } from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import CalendarIcon from 'assets/svg/CalendarIcon.svg';
import UniIcon from 'assets/svg/UniIcon.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ColoredSlider } from 'components';
import {
  Box,
  Typography,
  Button
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { SingleDatePicker } from 'react-dates';
import { useOptionType, useMaturityDate, useStrikePrice, useOptionSize } from 'state/options/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    flexGrow: 1,
    outline: 'none',
    color: theme.palette.text.primary,
    background: 'transparent',
    border: 'none'
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
      color: theme.palette.text.primary,
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

const OptionFilter: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { optionType, setOptionType } = useOptionType();
  const { maturityDate, setMaturityDate } = useMaturityDate();
  const [ maturityFocused, setMaturityFocused ] = useState(false);
  const { strikePrice, setStrikePrice } = useStrikePrice();
  const { optionSize, setOptionSize } = useOptionSize();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

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
        <Box position='relative' width={1} marginTop={1} className={classes.singleDatePicker}>
          <SingleDatePicker
            date={maturityDate}
            id='maturityDate'
            orientation={ mobile ? 'vertical' : 'horizontal' }
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
        <input
          value={optionSize}
          className={classes.input}
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
