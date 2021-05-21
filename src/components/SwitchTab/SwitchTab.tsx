import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation } from '@material-ui/core';

export interface SwitchProps {
  children: any;
  value: number;
  showLabels: boolean;
  dark?: boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles(({ palette }) => ({
  root: {
    border: `1px solid ${palette.divider}`,
    background: palette.background.default,
    // boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.07)',
  },
}));

const SwitchTab: React.FC<SwitchProps> = ({ children, ...props}) => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root} {...props}>
      {children}
    </BottomNavigation>
  );
};

export default SwitchTab;
