import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  container: {
    display: 'flex',
    border: palette.background.paper,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  glider: {
    transition: 'all 0.4s ease-out',
    position: 'absolute',
    borderRadius: '10px',
    backgroundColor: palette.primary.dark,
  },
  elementFront: {
    boxSizing: 'border-box',
    position: 'absolute',
    border: '1px solid transparent',
    backgroundColor: 'transparent', 
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
      // border: `1px solid ${palette.divider}`,
    },
  },
}));

export interface GliderDimentions {
  width: String;
  height: String;
}

export interface SwitchWithGliderProps {
  elements: Array<React.FC>;
  positions: Array<Number>;
  clickFuncs: Array<() => void>;
  start: Number;
  gliderDims: Array<String>;
  mobile?: boolean;
  dark?: boolean;
  alignedRight?: boolean
}

const SwitchWithGlider: React.FC<SwitchWithGliderProps> = ({
  elements, positions, clickFuncs, start, gliderDims, mobile, dark, alignedRight
}) => {
  const classes = useStyles();
  const [gliderPosition, setGliderPosition] = React.useState<any>(start);

React.useEffect(() => {
    if (mobile && dark) {
      setGliderPosition(window.innerWidth - 183);
    }
  }, [mobile, dark]);

  const mappedClickFuncs = [
    () => {
      console.log('positions[0]', positions[0]);
      setGliderPosition(positions[0]);
      clickFuncs[0]();
    },
    () => {
      console.log('positions[1]', positions[1])
      setGliderPosition(positions[1]);
      clickFuncs[1]();
    },
    () => {
      console.log('positions[2]', positions[2])
      setGliderPosition(positions[2]);
      clickFuncs[2]();
    },
  ];

  const mappedElements = elements.map((item, index) => (
    <Box>
      <Box
        className={classes.elementFront}
        width={gliderDims[0]}
        height={gliderDims[1]}
        onClick={mappedClickFuncs[index]}
      />
        <Box>
          {item}
        </Box>
    </Box>
  ))

  return (
    <Box className={classes.container}>
      {mappedElements}
      {!alignedRight ? (
      <Box
        className={classes.glider}
        left={gliderPosition}
        width={gliderDims[0]}
        height={gliderDims[1]}
      /> 
      ) : (
        <Box
          className={classes.glider}
          right={gliderPosition}
          width={gliderDims[0]}
          height={gliderDims[1]}
        /> 
      )}
    </Box>
  );
};

export default SwitchWithGlider;
