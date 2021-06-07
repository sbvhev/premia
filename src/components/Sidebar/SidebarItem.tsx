import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

const useStyles = makeStyles(({ palette }) => ({
  inactiveSwitch: {
    cursor: 'pointer',
    '& svg': {
      marginRight: 10,
    },
    '& svg path': {
      fill: palette.secondary.main,
    },
    '& .MuiTypography-root': {
      fontWeight: 400,
      lineHeight: '14px',
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
  activeSwitch: {
    cursor: 'default',
    '& svg path': {
      fill: palette.primary.main,
    },
    '& .MuiTypography-root': {
      color: palette.primary.main,
      fontWeight: 700,
    },
    '&:hover': {
      '& svg path': {
        fill: palette.primary.main,
      },
      '& .MuiTypography-root': {
        color: palette.primary.main,
        fontWeight: 700,
      },
    },
  },
}));

export interface SidebarItemProps {
  title: string;
  link: string;
  Icon: any;
  href?: boolean;
  onHide?: () => void;
  activeCondition?: any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  link,
  Icon,
  href,
  onHide,
  activeCondition,
}) => {
  const location = useLocation();
  const active = location.pathname === link;
  const classes = useStyles({ active });
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!href) {
      history.push(link, { previous: location.pathname });

      if (onHide) {
        onHide();
      }
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='flex-start'
      paddingLeft='15px'
      width={!mobile ? '180px' : '100%'}
      height='47px'
      className={cx(
        classes.inactiveSwitch,
        activeCondition && classes.activeSwitch,
      )}
      onClick={handleClick}
    >
      {Icon}
      <Typography>{title}</Typography>
    </Box>
  );
};

export default SidebarItem;
