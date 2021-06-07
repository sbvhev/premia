import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'classnames';

import { useDarkModeManager } from 'state/user/hooks';

import SidebarItem from './SidebarItem';
import MainLogo from 'assets/svg/MainLogo.svg';
import MainLogoBlack from 'assets/svg/MainLogoBlack.svg';
import { ReactComponent as DocumentationIcon } from 'assets/svg/DocumentationIcon.svg';
import { ReactComponent as CareerIcon } from 'assets/svg/CareerIcon.svg';
import { ReactComponent as PositionsIcon } from 'assets/svg/PositionsIcon.svg';
import { ReactComponent as VaultsIcon } from 'assets/svg/VaultIcon.svg';
import { ReactComponent as OptionsIcon } from 'assets/svg/OptionsIcon.svg';
import { ReactComponent as StakeIcon } from 'assets/svg/StakeIcon.svg';
import { ReactComponent as SwapIcon } from 'assets/svg/SwapIcon.svg';

import { ThemeSwitch, SwapModal } from 'components';

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
    fontWeight: 'bold',
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
  onHide?: () => void;
}

interface GliderHerights {
  [key: string]: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile, onHide }) => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<{ previous: string }>();
  const { pathname } = location;
  const [showSwapModal, setShowSwapModal] = useState(false);
  const gliderHeights: GliderHerights = {
    '/': 93,
    '/vaults': 143,
    '/options': 193,
    '/stake': 243,
  };
  const state = location.state ? location.state.previous : false;
  const startHeight = state
    ? gliderHeights[state]
    : gliderHeights[pathname] || 93;
  const [gliderPosition, setGliderPosition] = React.useState(startHeight);

  const navigation = [
    {
      title: 'My positions',
      link: '/',
      Icon: <PositionsIcon />,
    },
    {
      title: 'Vaults',
      link: '/vaults',
      Icon: <VaultsIcon />,
    },
    {
      title: 'Options',
      link: '/options',
      Icon: <OptionsIcon />,
    },
    {
      title: 'Stake',
      link: '/stake',
      Icon: <StakeIcon />,
    },
    {
      title: 'Swap',
      onClick: () => setShowSwapModal(true),
      Icon: <SwapIcon />,
    },
  ];
  
  const insights = [
    {
      title: 'Documentation',
      link: 'https://premia.medium.com',
      Icon: <DocumentationIcon />,
      href: true,
    },
    {
      title: 'Careers',
      link: 'https://solidity.finance/audits/Premia/',
      Icon: <CareerIcon />,
      href: true,
    },
  ];

  useEffect(() => {
    setGliderPosition(gliderHeights[pathname] || 93);
    /* eslint-disable react-hooks/exhaustive-deps */
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
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        style={{ overflowY: 'auto' }}
      >
        <SwapModal open={showSwapModal} onClose={() => setShowSwapModal(false)} />
        <Box>
          {!mobile && (
            <Grid container component={Link} to='/'>
              <Box pb={3}>
                <img
                  src={darkMode ? MainLogo : MainLogoBlack}
                  alt='Logo'
                  style={{ marginLeft: '15px' }}
                />
              </Box>
            </Grid>
          )}
          <Box>
            {navigation.map(({ title, link, Icon, onClick }, i) => (
              <SidebarItem
                key={i}
                title={title}
                link={link}
                onClick={onClick}
                Icon={Icon}
                onHide={onHide}
              />
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
      </Box>
    </Box>
  );
};

export default Sidebar;
