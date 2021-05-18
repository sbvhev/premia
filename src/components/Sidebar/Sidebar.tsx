import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  List,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import cx from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from 'theme';
import SidebarItem from './SidebarItem';
import MainLogo from 'assets/svg/MainLogo.svg';
import MobileLogo from 'assets/svg/MobileLogo.svg';
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
  }
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

  modeItem: {
    padding: '4px 8px',
    borderRadius: 10,
    cursor: 'pointer',
    '& img': {
      filter: 'grayscale(1)',
      marginRight: 8
    }
  },

  mobileModeItem: {
    padding: 12,
    '& img': {
      marginRight: 0
    }
  },

  activeMode: {
    background: theme.palette.primary.dark,
    '& img': {
      filter: 'none'
    },
    '& span': {
      color: theme.palette.primary.main,
    }
  }
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      clone
      width={1}
      px={{ sm: 0, md: 3 }}
      pt={{ sm: 3, md: 5 }}
      pb={{ sm: 1 }}
      position='relative'
      height='100vh'
      overflow='scroll'
      className={classes.paper}
    >
      <Grid container direction='column' justify='space-between'>
        <Box>
          <Grid container component={Link} to='/'>
            <Box pb={3} pl={1.5}>
              <img src={mobile ? MobileLogo : MainLogo} alt='Logo' style={{}} />
            </Box>
          </Grid>

          <List>
            {navigation.map(({ title, link, Icon }, i) => (
              <SidebarItem key={i} title={title} link={link} Icon={Icon} />
            ))}
          </List>
        </Box>

        <Box>
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

          <Box clone width={1} px={{ sm: 1, md: 2 }}>
            <Grid container justify='space-around'>
              <Grid item md={6}>
                <Grid container justify='center' alignItems='center' className={cx(classes.modeItem, mobile && classes.mobileModeItem)}>
                  <img src={DayIcon} alt='Day' />
                  { 
                    !mobile && 
                      <Typography component='span'>Day</Typography>
                  }
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container justify='center' alignItems='center' className={cx(classes.modeItem, classes.activeMode, mobile && classes.mobileModeItem)}>
                  <img src={NightIcon} alt='Night' />
                  {
                    !mobile &&
                      <Typography component='span'>Night</Typography>
                  }
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
