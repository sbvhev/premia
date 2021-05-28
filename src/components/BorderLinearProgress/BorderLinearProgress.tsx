import { Box } from '@material-ui/core';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useDarkModeManager } from 'state/user/hooks';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    height: 6,
    borderRadius: 5,
    background: palette.secondary.main,
  },
  bar: {
    borderRadius: 5,
    height: '100%',
  },
}));

export interface BorderLinearProgressProps {
  color: string;
  value: number;
  className: string;
}

const BorderLinearProgress: React.FC<BorderLinearProgressProps> = ({
  color,
  value,
  className,
}) => {
  const classes = useStyles();
  const [darkMode] = useDarkModeManager();

  return (
    <Box className={cx(classes.root, className)}>
      <Box
        className={classes.bar}
        bgcolor={color}
        boxShadow={darkMode ? `0px 0px 11px ${color}` : ''}
        width={value / 100}
      />
    </Box>
  );
};

export default BorderLinearProgress;
