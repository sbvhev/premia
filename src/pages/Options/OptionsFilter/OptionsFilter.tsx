import React, { useState } from 'react';
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
import {
  useOptionType,
  useMaturityDate,
  useStrikePrice,
  useOptionSize,
} from 'state/options/hooks';

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
    },
  },

  dateInput: {
    width: '100%',
    height: 45,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${palette.divider}`,
    borderRadius: 12,
    padding: 12,
    '& p': {
      fontSize: 14,
      color: palette.text.secondary
    },
    '& svg': {
      width: 20
    },
  },

  focusedDateInput: {

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
      border: 'none'
    }
  },

  maturityContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center',
    height: 44,
    width: '100%',
    padding: '0 23px'
  }
}));

const OptionFilter: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { optionType, setOptionType } = useOptionType();
  const { maturityDate, setMaturityDate } = useMaturityDate();
  const [maturityFocused, setMaturityFocused] = useState(false);
  const { strikePrice, setStrikePrice } = useStrikePrice();
  const { optionSize, setOptionSize } = useOptionSize();

  if (!moment(maturityDate).isValid()) {
    setMaturityDate(moment(new Date()).format('YYYY-MM-DD'));
  }

  return (
    <Box width={1}>
      <Box
        display='flex'
        border={1}
        borderColor={theme.palette.divider}
        borderRadius={12}
      >
        <Box clone width={1 / 2}>
          <Button
            variant='contained'
            color={optionType === 'call' ? 'primary' : undefined}
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
            onClick={() => setOptionType('put')}
          >
            <ArrowDownwardIcon />
            &nbsp;Put
          </Button>
        </Box>
      </Box>

      <Box width={1} mt={2}>
        <Typography color='textPrimary'>Strike Price</Typography>

        <Box width={1} mt={1}>
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
        <Typography color='textPrimary'>Maturity</Typography>
        <Box
          position='relative'
          width={1}
          marginTop={1}
        >
          <Box className={cx(classes.dateInput, maturityFocused && classes.focusedDateInput)} onClick={() => setMaturityFocused(!maturityFocused)}>
            <Typography>{ moment(new Date(maturityDate)).isValid() ? moment(new Date(maturityDate)).format('YYYY-MM-DD') : 'Select Date' }</Typography>
            <CalendarIcon />
          </Box>
          { maturityFocused && 
            <Box className={classes.calendarContainer}>
            <Calendar
              onChange={(date) => { setMaturityFocused(false); setMaturityDate(moment(date).toISOString()); }}
              value={new Date(maturityDate)}
            />
            <Box className={classes.maturityContainer}>
              <Typography>Days to maturity</Typography>
              <Typography component='span'>7</Typography>
            </Box>
            </Box>
          }
        </Box>
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        width={1}
        mt={2}
      >
        <Typography color='textPrimary'>Option Size</Typography>
        <Typography color='textSecondary' component='span' variant='body2'>
          Max size available: 40012
        </Typography>
      </Box>
      <Box className={classes.optionSizeInputBox}>
        <UniIcon />
        <input
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
