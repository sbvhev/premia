import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export interface ModalContainerProps {
  children: any;
  size: 'lg' | 'md' | 'sm';
}

const useStyles = makeStyles<Theme, ModalContainerProps>(() => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: ({ size }) => {
      switch (size) {
        case 'sm':
          return 'auto';
        case 'md':
          return '60vw';
        case 'lg':
          return '80vw';
      }
    },
    minHeight: '300px',
    maxHeight: '90vh',
    minWidth: '400px',
    margin: '0 auto',
    padding: '30px 2rem',
    outline: 'none',
    overflowY: 'scroll',
  },
  containerMobile: {
    width: 'calc(100vw - 12px)',
    minHeight: '280px',
    maxHeight: '80vh',
    margin: '10vh 6px',
    padding: '30px 22px',
    outline: 'none',
    overflowY: 'auto',
  },
}));

const ModalContainer = React.forwardRef<ModalContainerProps, any>(
  ({ children, size = 'sm' }, ref) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles({ children, size });

    return (
      <Paper innerRef={ref} tabIndex={-1} className={!mobile ? classes.container : classes.containerMobile}>
        {children}
      </Paper>
    );
  },
);

export default ModalContainer;
