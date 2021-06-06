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

export interface GliderDimentions {
  width: String;
  height: String;
}

export interface SwitchWithGliderProps {
  elements: Array<React.FC>;
  currentPosition: Number;
  gliderHeight: Number;
  gliderWidth: Number;
  alignedRight?: boolean;
}

const SwitchWithGlider: React.FC<SwitchWithGliderProps> = ({
  elements,
  currentPosition,
  gliderHeight,
  gliderWidth,
  alignedRight,
}) => {
  const classes = useStyles();
  const [gliderPosition, setGliderPosition] =
    React.useState<any>(currentPosition);

  React.useEffect(() => {
    setGliderPosition(currentPosition);
  }, [currentPosition]);

  const wrappedElements = elements.map((item, index) => (
    <Box key={index}>{item}</Box>
  ));

  return (
    <Box className={classes.container}>
      {wrappedElements}
      {!alignedRight ? (
        <Box
          className={classes.glider}
          left={gliderPosition}
          width={gliderWidth}
          height={gliderHeight}
        />
      ) : (
        <Box
          className={classes.glider}
          right={gliderPosition}
          width={gliderWidth}
          height={gliderHeight}
        />
      )}
    </Box>
  );
};

export default SwitchWithGlider;
