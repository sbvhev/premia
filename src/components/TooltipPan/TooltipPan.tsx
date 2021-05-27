import React, { useRef } from 'react';
import cn from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Popper } from '@material-ui/core';
import { useIsDarkMode } from 'state/user/hooks';

export interface TooltipPanProps {
  children: any;
  open: boolean;
  className?: string;
  anchorEl: HTMLElement | null;
}

const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    zIndex: 1,
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
    padding: 24,
    color: (props: any) => (props.dark ? 'white' : '#29343E'),
    maxWidth: 375,
    borderRadius: 12,
  },
}));

const TooltipPan: React.FC<TooltipPanProps> = ({
  className,
  open,
  anchorEl,
  children,
}) => {
  const dark = useIsDarkMode();
  const classes = useStyles({ dark });
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Popper
      className={cn(classes.popper, className)}
      open={open}
      anchorEl={anchorEl}
      transition={true}
    >
      {children}
    </Popper>
  );
};

export default TooltipPan;
