import { withStyles, Theme } from '@material-ui/core/styles';

import { Slider } from '@material-ui/core';

const ColoredSlider = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    height: 8,
    width: 'calc(100% - 16px)',
  },

  mark: {
    display: 'none',
  },

  thumb: {
    height: 16,
    width: 16,
    backgroundColor: theme.palette.primary.main,
    border: '4px solid white',
    marginTop: -4,
    marginLeft: 0,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',

    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  valueLabel: {
    left: 'calc(-50% - 8px)',
    top: -18,
    fontSize: 12,
    '& > span': {
      color: 'transparent',
    },
    '& > span > span': {
      color: theme.palette.text.primary,
    },
  },

  track: {
    height: 8,
    borderRadius: 4,
    paddingRight: 8
  },

  rail: {
    height: 8,
    borderRadius: 4,
    width: 'calc(100% + 16px)',
  },

  markLabel: {
    fontSize: 12,
    top: 27,
    color: theme.palette.text.secondary,
    transform: 'none',
    '&[data-index="1"]': {
      left: 'calc(100% + 16px) !important',
      transform: 'translateX(-100%)',
    },
  },
}))(Slider);

export default ColoredSlider;
