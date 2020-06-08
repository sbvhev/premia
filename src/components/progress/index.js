import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 99999,
    color: "#fff"
  }
}));

const Progress = props => {
  const classes = useStyles();
  const { loading } = props;
  return (
    <div className={classes.placeholder}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.progress.loading
});

export default connect(mapStateToProps, null)(Progress);
