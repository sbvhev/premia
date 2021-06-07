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
    alignItems: 'center',
  },
  glider: {
    transition: 'all 0.4s ease-out',
    position: 'absolute',
    borderRadius: '10px',
    backgroundColor: palette.primary.dark,
  },
}));

export interface SwitchWithGliderProps {
  elements: Array<React.FC>;
  defaultIndex: number;
  gliderHeight: Number;
  gliderWidth: number;
  marginBetweenSwitches: number;
}

const SwitchWithGlider: React.FC<SwitchWithGliderProps> = ({
  elements,
  gliderHeight,
  gliderWidth,
  defaultIndex,
  marginBetweenSwitches,
}) => {
  const classes = useStyles();
  const [gliderPosition, setGliderPosition] = React.useState<any>(0);

  React.useEffect(() => {
    const incrementalDistance = gliderWidth + marginBetweenSwitches;
    const newPosition = defaultIndex * incrementalDistance;
    setGliderPosition(newPosition);
  }, [defaultIndex, gliderWidth, marginBetweenSwitches]);

  const wrappedElements = elements.map((item, index) => (
    <Box key={index}>{item}</Box>
  ));

  return (
    <Box width='100%' height='100%'>
      <Box
        className={classes.glider}
        width={gliderWidth}
        height={gliderHeight}
        style={{ transform: `translateX(${gliderPosition}px)` }}
      />
      <Box className={classes.container}>{wrappedElements}</Box>
    </Box>
  );
};

export default SwitchWithGlider;
