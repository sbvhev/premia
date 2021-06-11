import React, { useState } from 'react';
import { Typography, Box } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    fontWeight: 700,
    borderRadius: 12,
    minWidth: '100px',
    textTransform: 'none',
    padding: '1px',
    margin: '2px',
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%);`,
    display: 'flex',
    cursor: 'pointer',
  },
  wrapperSecondary: {
    fontWeight: 700,
    borderRadius: 12,
    minWidth: '100px',
    textTransform: 'none',
    padding: '1px',
    margin: '2px',
    background: `linear-gradient(316.57deg, ${palette.error.main} 18.89%, ${palette.error.dark} 95.84%);`,
    display: 'flex',
    cursor: 'pointer',
  },
  container: {
    borderRadius: 11,
    transition: 'background 0.3s',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: '16px',
    lineHeight: '18px',
  },
  starIconHoverConatiner: {
    '& svg path': {
      fill: palette.primary.main,
    },
  },
  starIconHoverConatinerSecondary: {
    '& svg path': {
      fill: palette.error.main,
    },
  },
  endIconHoverConatiner: {
    '& svg path': {
      fill: palette.success.dark,
    },
  },
  hoverGradientText: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    background: `linear-gradient(121.21deg, ${palette.success.main} 7.78%, ${palette.success.dark} 118.78%)`,
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    '-moz-background-clip': 'text',
    '-moz-text-fill-color': 'transparent',
    '-webkit-text-fill-color': 'transparent',
  },
  hoverGradientTextSecondary: {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '18px',
    background: `linear-gradient(121.21deg, ${palette.error.main} 7.78%, ${palette.error.main} 118.78%)`,
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    '-moz-background-clip': 'text',
    '-moz-text-fill-color': 'transparent',
    '-webkit-text-fill-color': 'transparent',
  },
}));

interface ContainedButtonProps {
  height?: string;
  color?: string;
  label?: string;
  textStyling?: object;
  disabled?: boolean;
  startIcon?: any;
  endIcon?: any;
  fullWidth?: boolean;
  onClick?: () => void;
  margin?: string;
  id?: string;
}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  fullWidth,
  color,
  height,
  label,
  textStyling,
  disabled,
  startIcon,
  endIcon,
  onClick,
  margin,
  id,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const [hoverState, setHoverState] = useState(false);

  return (
    <Box
      className={!color ? classes.wrapper : classes.wrapperSecondary}
      onMouseEnter={!disabled ? () => setHoverState(true) : () => {}}
      onMouseLeave={!disabled ? () => setHoverState(false) : () => {}}
      style={disabled ? { opacity: 0.3, margin } : { margin }}
      width={fullWidth ? '100%' : 'auto'}
      height={height ? height : '45px'}
      onClick={onClick}
      id={id}
    >
      <Box
        className={classes.container}
        bgcolor={!hoverState ? 'transparent' : palette.background.paper}
        height={height ? height : '45px'}
      >
        {startIcon && (
          <Box
            display='flex'
            alignItems='center'
            className={
              !hoverState
                ? ''
                : color === 'secondary'
                ? classes.starIconHoverConatinerSecondary
                : classes.starIconHoverConatiner
            }
            marginRight='8px'
          >
            {startIcon}
          </Box>
        )}
        {label &&
          (!hoverState ? (
            <Typography className={classes.label} style={textStyling}>
              {label}
            </Typography>
          ) : (
            <h2
              className={
                !color
                  ? classes.hoverGradientText
                  : classes.hoverGradientTextSecondary
              }
              style={textStyling}
            >
              {label}
            </h2>
          ))}
        {endIcon && (
          <Box
            display='flex'
            alignItems='center'
            className={!hoverState ? '' : classes.endIconHoverConatiner}
            marginLeft='8px'
          >
            {endIcon}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ContainedButton;
