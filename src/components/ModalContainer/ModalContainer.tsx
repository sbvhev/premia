import React from 'react';
import cn from 'classnames';
import { Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

export interface ModalContainerProps {
  children: any;
  className?: string;
  size: 'lg' | 'md' | 'sm';
}

const useStyles = makeStyles<Theme, ModalContainerProps>(({ palette }) => ({
  container: {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    boxShadow: 'none',
    maxHeight: '90vh',
    minWidth: '400px',
    margin: '0 auto',
    outline: 'none',
    overflowY: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  containerMobile: {
    backgroundColor: 'transparent',
    border: 'none',
    width: 'calc(100vw - 12px)',
    // Changing this 20vh top margin will break TX Modals!!
    margin: '20vh 6px',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
  },
}));

const ModalContainer = React.forwardRef<ModalContainerProps, any>(
  ({ children, size = 'sm', className }, ref) => {
    const mobile = /Mobi|Android/i.test(navigator.userAgent);
    const classes = useStyles({ children, size });

    return (
      <Paper
        innerRef={ref}
        tabIndex={-1}
        className={
          !mobile
            ? cn(className, classes.container)
            : cn(className, classes.containerMobile)
        }
      >
        {children}
      </Paper>
    );
  },
);

export default ModalContainer;
