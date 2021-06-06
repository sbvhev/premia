import React from 'react';
import { ReactComponent as DayIcon } from 'assets/svg/DayIcon.svg';
import { ReactComponent as NightIcon } from 'assets/svg/NightIcon.svg';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { SwitchWithGlider } from 'components';

import { useWeb3 } from 'state/application/hooks';
import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles(({ palette }) => ({
  activeMode: {
    borderRadius: 10,
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.primary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 700,
      fontSize: '14px',
      color: palette.primary.main,
    },
  },
  inactiveMode: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '& svg': {
      marginRight: 8,
    },
    '& svg path': {
      fill: palette.secondary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 400,
      fontSize: '14px',
      color: palette.secondary.main,
    },
    '&:hover': {
      '& svg path': {
        fill: palette.text.primary,
      },
      '& .MuiTypography-root': {
        fontWeight: 400,
        fontSize: '14px',
        color: palette.text.primary,
      },
    },
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
      className={!darkMode ? classes.activeMode : classes.inactiveMode}
      width={!mobile ? '80px' : deviceWidth / 2 - 15}
      height={!mobile ? '30px' : '36px'}
      onClick={handleDayClick}
    >
      <DayIcon />
      <Typography>Day</Typography>
    </Box>
  );

  const NightButton = () => (
    <Box
      display='flex'
      width={!mobile ? '80px' : deviceWidth / 2 - 15}
      height={!mobile ? '30px' : '36px'}
      alignItems='center'
      justifyContent='center'
      className={darkMode ? classes.activeMode : classes.inactiveMode}
      onClick={handleNightClick}
    >
      <NightIcon />
      <Typography>Night</Typography>
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
          currentPosition={!darkMode ? 21 : 107}
          gliderWidth={80}
          gliderHeight={30}
        />
      ) : (
        <SwitchWithGlider
          elements={[DayButton, NightButton]}
          currentPosition={!darkMode ? 11 : deviceWidth / 2 + 4}
          gliderWidth={deviceWidth / 2 - 15}
          gliderHeight={36}
        />
      )}
    </Box>
  );
};

export default ThemeSwitch;
