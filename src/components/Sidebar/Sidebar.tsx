import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';

import { useDarkModeManager } from 'state/user/hooks';

import SidebarItem from './SidebarItem';
import MainLogo from 'assets/svg/MainLogo.svg';
import MainLogoBlack from 'assets/svg/MainLogoBlack.svg';
import DocumentationIcon from 'assets/svg/DocumentationIcon.svg';
import CareerIcon from 'assets/svg/CareerIcon.svg';
import PositionsIcon from 'assets/svg/PositionsIcon.svg';
import VaultsIcon from 'assets/svg/VaultIcon.svg';
import OptionsIcon from 'assets/svg/OptionsIcon.svg';
import StakeIcon from 'assets/svg/StakeIcon.svg';
import DayIcon from 'assets/svg/DayIcon.svg';
import NightIcon from 'assets/svg/NightIcon.svg';

const navigation = [
  {
    title: 'My positions',
    link: '/positions',
    Icon: PositionsIcon,
  },
  {
    title: 'Vaults',
    link: '/vaults',
    Icon: VaultsIcon,
  },
  {
    title: 'Options',
    link: '/options',
    Icon: OptionsIcon,
  },
  {
    title: 'Stake',
    link: '/stake',
    Icon: StakeIcon,
  },
];

const insights = [
  {
    title: 'Documentation',
    link: 'https://premia.medium.com',
    Icon: DocumentationIcon,
    href: true,
  },
  {
    title: 'Careers',
    link: 'https://solidity.finance/audits/Premia/',
    Icon: CareerIcon,
    href: true,
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  rightBorder: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },

  subtitle: {
    marginBottom: 8,
    marginLeft: '1rem',
    fontSize: 10,
    color: theme.palette.text.secondary,
  },

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

export interface SidebarProps {
  mobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile }) => {
  const [darkMode, setDarkMode] = useDarkModeManager();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      clone
      width={1}
      px={{ sm: 0, md: 3 }}
      pt={{ sm: 3, md: 5 }}
      pb={{ sm: 1 }}
      position='relative'
      height={mobile ? 'auto' : '100vh'}
      bgcolor={darkMode ? theme.palette.common.black : theme.palette.common.white}
      className={cx(!mobile && classes.rightBorder)}
    >
      <Grid container direction='column' justify='space-between'>
        <Box>
          {!mobile && (
            <Grid container justify='center' component={Link} to='/'>
              <Box pb={3}>
                <img src={darkMode ? MainLogo : MainLogoBlack} alt='Logo' style={{}} />
              </Box>
            </Grid>
          )}

          {navigation.map(({ title, link, Icon }, i) => (
            <SidebarItem key={i} title={title} link={link} Icon={Icon} />
          ))}
        </Box>

        <Box>
          <Box mt={mobile ? 0 : 4} mb={2}>
            {insights.map(({ href, title, link, Icon }, i) => (
              <SidebarItem
                key={i}
                href={href}
                title={title}
                link={link}
                Icon={Icon}
              />
            ))}
          </Box>

          <Box>
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
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Sidebar;
