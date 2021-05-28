import React from 'react';
import { ReactComponent as DayIcon } from 'assets/svg/DayIcon.svg';
import { ReactComponent as NightIcon } from 'assets/svg/NightIcon.svg';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'classnames';
import { useWeb3 } from 'state/application/hooks';
import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  modeItem: {
    padding: '4px 8px',
    borderRadius: 10,
    cursor: 'pointer',
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: theme.palette.text.secondary,
    },
  },

  inactiveMode: {
    background: theme.palette.primary.dark,
    '& svg path': {
      fill: theme.palette.primary.main,
    },
    '& span': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
  },
}));

const ThemeSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkModeManager();
  const { onboard } = useWeb3();
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
          onClick={() => {
            setDarkMode(false);
            onboard?.config({
              darkMode: false,
            });
          }}
        >
          <DayIcon />
          <Typography component='span' color='textSecondary'>
            Day
          </Typography>
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
          onClick={() => {
            setDarkMode(true);
            onboard?.config({
              darkMode: true,
            });
          }}
        >
          <NightIcon />
          <Typography component='span' color='textSecondary'>
            Night
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThemeSwitch;
