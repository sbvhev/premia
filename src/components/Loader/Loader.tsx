import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@keyframes Rotate': {
      from: {
        transform: 'rotate(0deg)',
      },

      to: {
        transform: 'rotate(360deg)',
      },
    },

    svg: {
      animationName: '$Rotate',
      animationDuration: '2s',
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
      height: (props: any) => props.size,
      width: (props: any) => props.size,

      '& path': {
        stroke: (props: any) => props.stroke ?? theme.palette.common.white,
      },
    },
  }),
);

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export default function Loader({
  size = '16px',
  stroke,
  ...rest
}: {
  size?: string;
  stroke?: string;
  [k: string]: any;
}) {
  const classes = useStyles({
    size,
    stroke,
  });

  return (
    <svg
      className={classes.svg}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
