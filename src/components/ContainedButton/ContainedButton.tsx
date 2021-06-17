import React, { useMemo } from 'react';
import { Typography, Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useIsDarkMode } from 'state/user/hooks';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    fontWeight: 700,
    borderRadius: 12,
    minWidth: '64px',
    textTransform: 'none',
    padding: '1px',
    margin: '2px',
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%);`,
    display: 'flex',
    cursor: 'pointer',

    '&:hover': {
      '& p': {
        background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent',
        '-webkit-text-fill-color': 'transparent',
      },

      '& div': {
        backgroundColor: palette.background.paper,
      },

      '& .startIcon svg path': {
        fill: palette.success.main,
      },

      '& .endIcon svg path': {
        fill: '#2AE896',
      },
    },

    '& svg path': {
      fill: ({ darkMode }: any) =>
        darkMode ? palette.common.black : palette.common.white,
    },
  },
  wrapperSecondary: {
    fontWeight: 700,
    borderRadius: 12,
    minWidth: '64px',
    textTransform: 'none',
    padding: '1px',
    margin: '2px',
    background: `linear-gradient(316.57deg, ${palette.error.main} 18.89%, ${palette.error.dark} 95.84%);`,
    display: 'flex',
    cursor: 'pointer',

    '&:hover': {
      '& p': {
        background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.dark} 118.78%)`,
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent',
        '-webkit-text-fill-color': 'transparent',
      },

      '& div': {
        backgroundColor: palette.background.paper,
      },

      '& .startIcon svg path': {
        fill: palette.error.main,
      },

      '& .endIcon svg path': {
        fill: '#A345DF',
      },
    },

    '& svg path': {
      fill: ({ darkMode }: any) =>
        darkMode ? palette.common.black : palette.common.white,
    },
  },
  container: {
    borderRadius: 11,
    transition: 'background 0.3s',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',

    '&:active': {
      opacity: 0.8,
    },
  },
  disabledCover: {
    height: '45px',
    width: 'inherit',
    borderRadius: 12,
    backgroundColor: 'white',
    opacity: 0.3,
    position: 'absolute',
    zIndex: 10,
  },

  label: {
    color: palette.background.paper,
    fontWeight: 700,
    whiteSpace: 'nowrap',
    fontSize: ({ size }: any) => (size === 'large' ? '16px' : '14px'),
    lineHeight: '18px',
  },
}));

interface ContainedButtonProps {
  id?: string;
  height?: string;
  color?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  textStyling?: object;
  disabled?: boolean;
  startIcon?: any;
  endIcon?: any;
  fullWidth?: boolean;
  margin?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  id,
  fullWidth,
  color,
  height,
  label,
  children,
  textStyling,
  disabled,
  startIcon,
  endIcon,
  margin,
  size,
  onClick,
}) => {
  const darkMode = useIsDarkMode();
  const classes = useStyles({ darkMode, size, disabled });
  const childLabel = useMemo(
    () => (children === undefined ? label : children),
    [children, label],
  );

  return (
    <Box
      clone
      id={id}
      width={fullWidth ? '100%' : 'auto'}
      height={height ? height : '45px'}
      className={
        color === 'secondary' ? classes.wrapperSecondary : classes.wrapper
      }
      style={disabled ? { opacity: 0.3, margin } : { margin }}
      onClick={!disabled ? onClick : () => {}}
    >
      <ButtonBase>
        <Box
          height={height ? height : '45px'}
          padding='6px 2.25rem'
          className={classes.container}
        >
          {startIcon && (
            <Box
              display='flex'
              alignItems='center'
              marginRight='2px'
              className='startIcon'
            >
              {startIcon}
            </Box>
          )}

          {childLabel && (
            <Typography className={classes.label} style={textStyling}>
              {childLabel}
            </Typography>
          )}

          {endIcon && (
            <Box
              display='flex'
              alignItems='center'
              marginLeft='8px'
              className='endIcon'
            >
              {endIcon}
            </Box>
          )}
        </Box>
      </ButtonBase>
    </Box>
  );
};

export default ContainedButton;
