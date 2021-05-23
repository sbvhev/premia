import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export interface ModalContainerProps {
  children: any;
  size: 'lg' | 'md' | 'sm';
}

const useStyles = makeStyles<Theme, ModalContainerProps>(({ palette }) => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    boxShadow: 'none',
    width: ({ size }) => {
      switch (size) {
        case 'sm':
          return 'auto';
        case 'md':
          return '490px';
        case 'lg':
          return '80vw';
      }
    },
    maxHeight: '90vh',
    minWidth: '400px',
    margin: '0 auto',
    outline: 'none',
    overflowY: 'hidden',
    backgroundColor: 'transparent',
  },
  containerMobile: {
    backgroundColor: 'transparent',
    border: 'none',
    width: 'calc(100vw - 12px)',
    maxHeight: '80vh',
    // Changing this 20vh top margin will break TX Modals!!
    margin: '20vh 6px',
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
