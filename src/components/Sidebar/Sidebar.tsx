/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import ThemeSwitch from 'components/ThemeSwitch';

const navigation = [
  {
    title: 'My positions',
    link: '/',
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

  light: {
    background: theme.palette.background.paper,
  },

  glider: {
    transition: 'top 0.4s ease-out',
    position: 'absolute',
    height: '47px',
    width: '180px',
    border: 'none',
    zIndex: 10,
    borderRadius: '12px',
    backgroundColor: theme.palette.primary.dark,
  },
}));

export interface SidebarProps {
  mobile?: boolean;
  // history?: object;
}

interface GliderHerights {
  [key: string]: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile }) => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<{ previous: string }>();
  const { pathname } = location;
  const gliderHeights: GliderHerights = {
    '/': 98,
    '/vaults': 155,
    '/options': 212,
    '/stake': 269,
  };
  const state = location.state ? location.state.previous : false;
  const startHeight = state ? gliderHeights[state] : gliderHeights[pathname];
  const [gliderPosition, setGliderPosition] = React.useState(startHeight);

  useEffect(() => {
    setGliderPosition(gliderHeights[pathname]);
  }, [pathname, history]);

  return (
    <Box
      clone
      width={1}
      px={{ sm: 0, md: '15px' }}
      pt={{ sm: 3, md: '30px' }}
      pb={{ sm: 1, md: '15px' }}
      position='relative'
      height={mobile ? 'auto' : '100vh'}
      className={cx({
        [classes.rightBorder]: !mobile,
        [classes.light]: !darkMode,
      })}
    >
      <Grid container direction='column' justify='space-between'>
        <Box>
          {!mobile && (
            <Grid container justify='center' component={Link} to='/'>
              <Box pb={3}>
                <img
                  src={darkMode ? MainLogo : MainLogoBlack}
                  alt='Logo'
                  style={{}}
                />
              </Box>
            </Grid>
          )}
          <Box>
            {navigation.map(({ title, link, Icon }, i) => (
              <SidebarItem key={i} title={title} link={link} Icon={Icon} />
            ))}
            {!mobile && <Box top={gliderPosition} className={classes.glider} />}
          </Box>
        </Box>

        <Box>
          <Box mb={mobile ? 0 : 2}>
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
          {!mobile && <ThemeSwitch />}
        </Box>
      </Grid>
    </Box>
  );
};

export default Sidebar;
