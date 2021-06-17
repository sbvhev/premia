import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import { useDarkModeManager } from 'state/user/hooks';
import { useWeb3 } from 'state/application/hooks';

import { SwitchWithGlider, ThemeSwitch, SwapModal } from 'components';
import SidebarItem from './SidebarItem';
import MainLogo from 'assets/svg/NewLogoComboLight.svg';
import MainLogoBlack from 'assets/svg/NewLogoComboDark.svg';
import { ReactComponent as DocumentationIcon } from 'assets/svg/DocumentationIcon.svg';
import { ReactComponent as CareerIcon } from 'assets/svg/CareerIcon.svg';
import { ReactComponent as PositionsIcon } from 'assets/svg/PositionsIcon.svg';
import { ReactComponent as VaultsIcon } from 'assets/svg/VaultIcon.svg';
import { ReactComponent as OptionsIcon } from 'assets/svg/OptionsIcon.svg';
import { ReactComponent as StakeIcon } from 'assets/svg/StakeIcon.svg';
import { ReactComponent as SwapIcon } from 'assets/svg/SwapIcon.svg';

const insights = [
  {
    title: 'Documentation',
    link: 'https://docs.premia.finance/',
    Icon: <DocumentationIcon />,
    href: true,
  },
  {
    title: 'Careers',
    link: 'https://discord.com/invite/6MhRmzmdHN', // 'https://careers.premia.finance/',
    Icon: <CareerIcon />,
    href: true,
  },
];

const useStyles = makeStyles(({ palette }) => ({
  rightBorder: {
    borderRight: `1px solid ${palette.divider}`,
  },

  subtitle: {
    marginBottom: 8,
    marginLeft: '1rem',
    fontSize: 10,
    color: palette.text.secondary,
  },

  light: {
    background: palette.background.paper,
  },

  switchContainer: {
    marginTop: '18px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.background.paper,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '180px',
    height: '251px',
  },
  switchContainerMobile: {
    display: 'flex',
    marginBottom: '4px',
    flexDirection: 'column',
    backgroundColor: palette.background.paper,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    height: '251px',
  },
}));

export interface SidebarProps {
  mobile?: boolean;
  onHide?: () => void;
}

interface PageIndexing {
  [key: string]: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile, onHide }) => {
  const [darkMode] = useDarkModeManager();
  const classes = useStyles();
  const { chainId, account } = useWeb3();
  const history = useHistory();
  const location = useLocation<{ previous: string }>();
  const { pathname } = location;
  const pageIndexes: PageIndexing = {
    '/positions': 0,
    '/vaults': 1,
    '/options': 2,
    '/stake': 3,
  };
  const [showSwapModal, setShowSwapModal] = useState(false);
  const state = location.state ? location.state.previous : false;
  const startIndex = state ? pageIndexes[state] : pageIndexes[pathname] || 0;
  const [pageNavigationIndex, setPageNavigationIndex] =
    React.useState(startIndex);

  React.useEffect(() => {
    const currentPage = pageIndexes[pathname];
    setPageNavigationIndex(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  React.useEffect(() => {
    if (location.search) {
      const search = location.search;
      const params = new URLSearchParams(search);
      const getPremia = params.get('getPremia');
      if (getPremia) {
        setShowSwapModal(true);
      }
      const path = location.pathname;
      history.push(path);
    }
  }, [history, location.pathname, location.search]);

  const navigation = [
    {
      title: 'My positions',
      link: '/positions',
      Icon: <PositionsIcon />,
    },
    {
      title: 'Vaults',
      link: '/vaults?tab=pro',
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
      Icon: <SwapIcon />,
      disabled: [4, 42].includes(chainId as number),
      onClick: account ? () => setShowSwapModal(true) : () => {},
    },
  ];

  const navigationItems = navigation.map(
    ({ title, link, Icon, disabled, onClick }, i) => (
      <SidebarItem
        key={i}
        title={title}
        link={link}
        Icon={Icon}
        disabled={disabled}
        activeCondition={!onClick ? link === pathname : showSwapModal}
        onHide={onHide}
        onClick={onClick}
      />
    ),
  );

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
        <SwapModal
          open={showSwapModal}
          onClose={() => setShowSwapModal(false)}
        />
        <Box>
          {!mobile && (
            <Grid container component={Link} to='/'>
              <Box pb={3}>
                <img
                  src={!darkMode ? MainLogo : MainLogoBlack}
                  alt='Logo'
                  style={{ marginLeft: '15px' }}
                />
              </Box>
            </Grid>
          )}
          <Box
            className={
              !mobile ? classes.switchContainer : classes.switchContainerMobile
            }
          >
            {!mobile ? (
              <SwitchWithGlider
                elements={[...navigationItems]}
                defaultIndex={
                  pageNavigationIndex === undefined ? -1 : pageNavigationIndex
                }
                marginBetweenSwitches={4}
                gliderWidth={180}
                gliderHeight={47}
                verticalGlider
              />
            ) : (
              <SwitchWithGlider
                elements={navigationItems}
                defaultIndex={
                  pageNavigationIndex === undefined ? -1 : pageNavigationIndex
                }
                marginBetweenSwitches={4}
                gliderWidth={'100%'}
                gliderHeight={47}
                verticalGlider
              />
            )}
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
