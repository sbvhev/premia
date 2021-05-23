import React from 'react';
import DayIcon from 'assets/svg/DayIcon.svg';
import NightIcon from 'assets/svg/NightIcon.svg';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'classnames';
import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  modeItem: {
    padding: '4px 8px',
    borderRadius: 10,
    cursor: 'pointer',
    '& img': {
      filter: 'grayscale(1)',
      marginRight: 8,
    },
  },

  inactiveMode: {
    background: theme.palette.primary.dark,
    '& img': {
      filter: 'none',
    },
    '& span': {
      color: theme.palette.primary.main,
    },
  },
}));

const ThemeSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkModeManager();
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid
          container
          justify='center'
          alignItems='center'
          className={cx(classes.modeItem, {
            [classes.inactiveMode]: !darkMode,
          })}
          onClick={() => setDarkMode(false)}
        >
          <img src={DayIcon} alt='Day' />
          <Typography component='span'>Day</Typography>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          justify='center'
          alignItems='center'
          className={cx(classes.modeItem, {
            [classes.inactiveMode]: darkMode,
          })}
          onClick={() => setDarkMode(true)}
        >
          <img src={NightIcon} alt='Night' />
          <Typography component='span'>Night</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
        
export default ThemeSwitch;