import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Typography, Tooltip } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import { useWeb3 } from 'state/application/hooks';

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
  disabled: {
    cursor: 'default',

    '& svg path': {
      fill: palette.text.secondary,
    },

    '& .MuiTypography-root': {
      color: palette.text.secondary,
    },

    '&:hover': {
      '& svg path': {
        fill: palette.text.secondary,
      },
      '& .MuiTypography-root': {
        color: palette.text.secondary,
      },
    },
  },
}));

export interface SidebarItemProps {
  title: string;
  link?: string | undefined;
  Icon: any;
  href?: boolean;
  disabled?: boolean;
  requireAccount?: boolean;
  onHide?: () => void;
  activeCondition?: any;
  onClick?: (() => void) | undefined;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  link,
  Icon,
  href,
  disabled,
  requireAccount,
  onClick,
  onHide,
  activeCondition,
}) => {
  const { account } = useWeb3();
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
        if (onHide) {
          onHide();
        }
      } else if (onClick) {
        onClick();
      }
    } else {
      window.open(link, '_blank');
    }
  };

  const isDisabled =
    disabled || (requireAccount && (!account || account === ''));
  const WrapperComponent: any = isDisabled ? Tooltip : React.Fragment;

  return (
    <WrapperComponent
      {...(isDisabled
        ? { title: disabled ? 'Disabled on testnet' : 'Connect wallet to swap' }
        : {})}
    >
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
          isDisabled && classes.disabled,
        )}
        onClick={isDisabled ? () => {} : handleClick}
      >
        {Icon}
        <Typography>{title}</Typography>
      </Box>
    </WrapperComponent>
  );
};

export default SidebarItem;
