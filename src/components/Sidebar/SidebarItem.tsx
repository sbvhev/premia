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
      active ? palette.primary.dark : 'transparent',
    borderRadius: 12,
    padding: '12px 16px',
    margin: '2px 0',
    cursor: 'pointer',

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
    filter: ({ active }: any) => (active ? 'none' : 'grayscale(1)'),
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
  link: string;
  Icon: any;
  href?: boolean;
  onHide?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  link,
  Icon,
  href,
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
      history.push(link, { previous: location.pathname });

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
        <img src={Icon} alt='Sidebar Icon' />
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
