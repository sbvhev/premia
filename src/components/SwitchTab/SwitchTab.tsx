import React from 'react';
import cn from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { BottomNavigation } from '@material-ui/core';

export interface SwitchProps {
  children: any;
  value: number;
  showLabels: boolean;
  dark?: boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  light: {
    border: 'none',
    background: 'white',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.07)',
  },
}));

const SwitchTab: React.FC<SwitchProps> = ({ dark, children, className, ...props}) => {
  const classes = useStyles();

  return (
    <BottomNavigation className={cn(dark ? '' : classes.light, className)} {...props}>
      {children}
    </BottomNavigation>
  );
};

export default SwitchTab;
