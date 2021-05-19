import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 6,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.secondary.main,
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#FF9152',
    },
  }),
)(LinearProgress);

export default BorderLinearProgress;