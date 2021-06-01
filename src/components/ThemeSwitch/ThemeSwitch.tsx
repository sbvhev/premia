import React from 'react';
import { ReactComponent as DayIcon } from 'assets/svg/DayIcon.svg';
import { ReactComponent as NightIcon } from 'assets/svg/NightIcon.svg';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { SwitchWithGlider } from 'components';

import cx from 'classnames';
import { useWeb3 } from 'state/application/hooks';
import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  modeItem: {
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: 10,
    cursor: 'pointer',
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: theme.palette.text.secondary,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
    },
  },
  textSelected: {
    fontWeight: 700,
    fontSize: '14px',
    color: theme.palette.primary.main,
  },
  textIdle: {
    fontWeight: 400,
    fontSize: '14px',
  },
  inactiveMode: {
    backgroundColor: 'transparent',
    '& svg path': {
      fill: theme.palette.primary.main,
    },
    '& span': {
      color: theme.palette.primary.main,
    },
  },
  glider: {
    transition: 'left 0.4s ease-out',
    position: 'absolute',
    display: 'flex',
    height: '30px',
    width: '80px',
    border: 'none',
    zIndex: 10,
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.palette.primary.dark,
    padding: '4px 18px',
  },
  gliderMobile: {
    position: 'absolute',
    display: 'flex',
    height: '36px',
    width: '172px',
    backgroundColor: theme.palette.primary.dark,
    border: 'none',
    zIndex: 3,
    borderRadius: '10px',
    transition: 'left 0.4s ease-out',
  },
}));

const ThemeSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkModeManager();
  const { onboard } = useWeb3();
  const classes = useStyles();
  const theme = useTheme();
  const deviceWidth = window.innerWidth;
  const { palette } = theme;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDayClick = () => {
    setTimeout(() => {
      setDarkMode(false);
      onboard?.config({
        darkMode: false,
      });
    }, 0);
  };

  const handleNightClick = () => {
    setTimeout(() => {
      setDarkMode(true);
      onboard?.config({
        darkMode: true,
      });
    }, 0);
  };

  const DayButton = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      className={cx(classes.modeItem, {
        [classes.inactiveMode]: !darkMode,
      })}
      width={!mobile ? '80px' : '172px'}
      height={!mobile ? '30px' : '36px'}
    >
      <Box display='flex' alignItems='center'>
        <DayIcon />
        <Typography
          className={!darkMode ? classes.textSelected : classes.textIdle}
          color='textSecondary'
        >
          Day
        </Typography>
      </Box>
    </Box>
  );

  const NightButton = () => (
    <Box
      display='flex'
      width={!mobile ? '80px' : '172px'}
      height={!mobile ? '30px' : '36px'}
      alignItems='center'
      justifyContent='center'
      className={cx(classes.modeItem, {
        [classes.inactiveMode]: darkMode,
      })}
    >
      <Box display='flex' alignItems='center'>
        <NightIcon />
        <Typography
          className={darkMode ? classes.textSelected : classes.textIdle}
          color='textSecondary'
        >
          Night
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      display='flex'
      padding={!mobile ? '0 6px' : '0'}
      justifyContent='space-between'
      style={{ backgroundColor: palette.background.paper }}
    >
      {!mobile ? (
        <SwitchWithGlider
          elements={[DayButton, NightButton]}
          positions={[21, 107]}
          clickFuncs={[handleDayClick, handleNightClick]}
          start={!darkMode ? 21 : 107}
          gliderWidth={80}
          gliderHeight={30}
        />
      ) : (
        <SwitchWithGlider
          elements={[DayButton, NightButton]}
          positions={[11, deviceWidth - 183]}
          clickFuncs={[handleDayClick, handleNightClick]}
          start={!darkMode ? 11 : deviceWidth - 183}
          gliderWidth={172}
          gliderHeight={36}
        />
      )}
    </Box>
  );
};

export default ThemeSwitch;
