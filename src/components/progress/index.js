import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

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
      {loading && <LinearProgress color="secondary" />}
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.progress.loading
});

export default connect(mapStateToProps, null)(Progress);
