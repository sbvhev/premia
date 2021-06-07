import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';

const useStyles = makeStyles(({ palette }) => ({
  item: {
    border: '1px solid transparent',
    backgroundColor: ({ active }: any) =>
      active ? 'rgba(82, 148, 255, 0.1)' : 'transparent',
    borderRadius: 12,
    padding: '8px 16px',
    margin: '0',
    marginBottom: '3px',
    cursor: 'pointer',
    fontSize: 14,

    '&:hover': {
      border: ({ disabled }: any) =>
        disabled
          ? '1px solid transparent'
          : `1px solid ${palette.primary.main}`,

      '& $icon': {
        color: ({ disabled }: any) =>
          disabled ? palette.text.secondary : palette.text.primary,
      },

      '& $title': {
        color: ({ disabled }: any) =>
          disabled ? palette.text.secondary : palette.text.primary,
      },
    },
  },

  icon: {
    minWidth: 32,
    '& svg path': {
      fill: ({ active }: any) =>
        active ? palette.primary.main : palette.secondary.main,
    },
  },

  title: {
    whiteSpace: 'nowrap',
    color: ({ active }: any) =>
      active ? palette.primary.main : palette.text.secondary,

    '&> span': {
      fontSize: 14,
      fontWeight: ({ active }: any) => active && 700,
    },
  },
}));

export interface SidebarItemProps {
  title: string;
  link?: string | undefined;
  Icon: any;
  href?: boolean;
  onClick?: (() => void) | undefined;
  onHide?: (() => void) | undefined;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  link,
  Icon,
  href,
  onClick,
  onHide,
}) => {
  const location = useLocation();
  const active = location.pathname === link;
  const classes = useStyles({ active });
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!href) {
      if (link) {
        history.push(link, { previous: location.pathname });
      } else if(onClick) {
        onClick();
      }

      if (onHide) {
        onHide();
      }
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <ListItem
      className={cn(classes.item, { active })}
      style={mobile ? {} : { backgroundColor: 'transparent' }}
      onClick={handleClick}
    >
      <ListItemIcon
        className={classes.icon}
        style={{ color: link === '/pbc' && !active ? 'orange' : undefined }}
      >
        {Icon}
      </ListItemIcon>

      <ListItemText
        style={{ color: link === '/pbc' && !active ? 'orange' : undefined }}
        className={classes.title}
      >
        {title}
      </ListItemText>
    </ListItem>
  );
};

export default SidebarItem;
