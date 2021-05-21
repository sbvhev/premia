import { withStyles, Theme } from '@material-ui/core/styles';

import { Slider } from '@material-ui/core';

const ColoredSlider = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    height: 8,
  },

  mark: {
    display: 'none'
  },

  thumb: {
    height: 16,
    width: 16,
    backgroundColor: theme.palette.primary.main,
    border: '4px solid white',
    marginTop: -4,
    marginLeft: -12,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',

    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  active: {},

  valueLabel: {
    left: 'calc(-50% - 8px)',
    top: 20,
    fontSize: 12,
    '& > span': {
      color: 'transparent'
    },
    '& > span > span': {
      color: theme.palette.common.white
    }
  },

  track: {
    height: 8,
    borderRadius: 4,
  },

  rail: {
    height: 8,
    borderRadius: 4,
  },

  markLabel: {
    marginTop: 4,
    fontSize: 12,
    top: 32,
    color: theme.palette.text.secondary,
    transform: 'none',
    '&[data-index="1"]': {
      transform: 'translateX(-100%)'
    }
  },
}))(Slider);

export default ColoredSlider;