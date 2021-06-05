import React, { useState } from 'react';
import { Typography, Box } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    fontWeight: 700,
    borderRadius: 12,
    minWidth: '120px',
    textTransform: 'none',
    padding: '1px',
    margin: '2px',
    height: '45px',
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
    height: '45px',
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
  endIconHoverConatiner: {
    '& svg path': {
      fill: palette.success.dark,
    },
  },
}));

interface ContainedButtonProps {
  size?: string;
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
      onClick={onClick}
      id={id}
    >
      <Box
        className={classes.container}
        bgcolor={!hoverState ? 'transparent' : palette.background.paper}
      >
        {startIcon && (
          <Box
            display='flex'
            alignItems='center'
            className={!hoverState ? '' : classes.starIconHoverConatiner}
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
                !color ? 'custom-contained' : 'custom-contained-secondary'
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
