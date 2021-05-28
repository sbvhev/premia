import React from 'react';
import { ReactComponent as DayIcon } from 'assets/svg/DayIcon.svg';
import { ReactComponent as NightIcon } from 'assets/svg/NightIcon.svg';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import cx from 'classnames';
import { useWeb3 } from 'state/application/hooks';
import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  modeItem: {
    padding: '4px 8px',
    margin: '0 4px',
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: 10,
    cursor: 'pointer',
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: theme.palette.text.secondary
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
    maxWidth: '300px',
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
    height: '34px',
    width: '82px',
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
    height: '32px',
    width: '152px',
    backgroundColor: theme.palette.primary.dark,
    border: 'none',
    zIndex: 3,
    borderRadius: '10px', // just a high number to create pill effect
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
  const [gliderPosition, setGliderPosition] = React.useState(!darkMode ? 36 : (!mobile ? 151 : (deviceWidth - 166)));
  
  const handleDayClick = () => {
    setGliderPosition(!mobile ? 36 : 25);
    setTimeout(() => {
      setDarkMode(false);
      onboard?.config({
        darkMode: false
      });
    }, 350);
  };

  const handleNightClick = () => {
    setGliderPosition(!mobile ? 151 : (deviceWidth - 166));
    setTimeout(() => {
      setDarkMode(true);
      onboard?.config({
        darkMode: true
      });
    }, 350);
  };

  return (
    <Box display="flex" padding="0 0 0 12px" justifyContent='space-between' style={{ backgroundColor: palette.background.paper}}>
      <Box>
        <Box
          marginTop="2px"
          display="flex"
          width={!mobile ? '80p' : '150px'}
          alignItems='center'
          justifyContent="center"
          className={cx(classes.modeItem, {
            [classes.inactiveMode]: !darkMode,
          })}
          onClick={handleDayClick}
          // style={!darkMode ? { backgroundColor: 'transparent' } : {}}
        >
          <Box display="flex" alignItems="center" >
            <DayIcon />
            <Typography className={!darkMode ? classes.textSelected : classes.textIdle} color='textSecondary'>Day</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          marginTop="2px"
          display="flex"
          width={!mobile ? '80px' : '150px'}
          alignItems='center'
          justifyContent="center"
          className={cx(classes.modeItem, {
            [classes.inactiveMode]: darkMode,
          })}
          onClick={handleNightClick}
          // style={darkMode ? { backgroundColor: 'transparent' } : {}}
        >
          <Box display="flex" alignItems="center" >
            <NightIcon />
            <Typography className={darkMode ? classes.textSelected : classes.textIdle} color='textSecondary'>Night</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        id="day/night-glider"
        className={!mobile ? classes.glider : classes.gliderMobile}
        left={gliderPosition}
      />
    </Box>
  );
};

export default ThemeSwitch;
