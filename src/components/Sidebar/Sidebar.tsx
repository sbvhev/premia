import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  List,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  DesktopWindows,
  Face,
  Forum,
  VerifiedUser,
  Twitter,
  GitHub,
} from '@material-ui/icons';

import SidebarItem from './SidebarItem';
import PremiaLogo from 'assets/svg/PremiaLogo.svg';
import PremiaText from 'assets/svg/PremiaText.svg';
import MediumLogo from 'assets/svg/medium.svg';

const navigation = [
  {
    title: 'Dashboard',
    link: '/',
    Icon: DesktopWindows,
  },
];

const insights = [
  {
    title: 'About',
    link: 'https://premia.medium.com',
    Icon: Face,
    href: true,
  },
  {
    title: 'Audits',
    link: 'https://solidity.finance/audits/Premia/',
    Icon: VerifiedUser,
    href: true,
  },
  {
    title: 'Discord Chat',
    link: 'https://discord.gg/6MhRmzmdHN',
    Icon: Forum,
    href: true,
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },

  subtitle: {
    marginBottom: 8,
    marginLeft: '1rem',
    fontSize: 10,
    color: theme.palette.text.secondary,
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <Box
      clone
      width={1}
      px={{ sm: 1, md: 3 }}
      py={{ md: 5 }}
      position='relative'
      height='100vh'
      overflow='scroll'
      className={classes.paper}
    >
      <Paper square>
        <Box clone width={1}>
          <Grid container component={Link} justify='center' to='/'>
            <Hidden smDown>
              <Box pt={1} pr={2}>
                <img src={PremiaLogo} alt='Logo' style={{}} />
              </Box>
            </Hidden>

            <Hidden mdUp>
              <Box pt={12}>
                <img src={PremiaLogo} alt='Logo' style={{}} />
              </Box>
            </Hidden>

            <Hidden smDown>
              <img src={PremiaText} alt='Premia' />
            </Hidden>
          </Grid>
        </Box>

        <Box position='relative' mt={8} mb={2}>
          <List>
            {navigation.map(({ title, link, Icon }, i) => (
              <SidebarItem key={i} title={title} link={link} Icon={Icon} />
            ))}
          </List>
        </Box>

        <Box mx={{ sm: 1, md: 4 }}>
          <Divider />
        </Box>

        <Box mt={4} mb={2}>
          <List>
            {insights.map(({ href, title, link, Icon }, i) => (
              <SidebarItem
                key={i}
                href={href}
                title={title}
                link={link}
                Icon={Icon}
              />
            ))}
          </List>
        </Box>

        <Box clone width={1} px={{ sm: 1, md: 2 }} mb={-4}>
          <Grid container justify='space-around'>
            <Tooltip title='Twitter'>
              <a
                href='https://twitter.com/PremiaFinance'
                target='_blank'
                rel='noreferrer'
              >
                <IconButton>
                  <Twitter />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip title='Github'>
              <a
                href='https://github.com/PremiaFinance/'
                target='_blank'
                rel='noreferrer'
              >
                <IconButton>
                  <GitHub />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip title='Medium'>
              <a
                href='https://premia.medium.com/'
                target='_blank'
                rel='noreferrer'
              >
                <IconButton>
                  <img src={MediumLogo} alt='Medium' height='24' width='24' />
                </IconButton>
              </a>
            </Tooltip>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Sidebar;
