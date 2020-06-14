import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from "@material-ui/core";
import { review, toast, progress } from "redux/actions";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%"
  },
  dialog: {
    width: "30rem"
  }
}));

const validation = Yup.object().shape({
  reply: Yup.string().required("Reply is required.")
});

const ReplyModal = props => {
  const classes = useStyles();
  const {
    id,
    open,
    handleClose,
    editReview,
    getReviews,
    showToast,
    setLoading,
    params,
    count,
    selectRow
  } = props;

  const [rate, setRate] = useState(0);

  useEffect(() => {
    getReviews({ params, id });
  }, [count]);

  useEffect(() => {
    setRate(0);
  }, [open]);

  const handleSubmit = (values, actions) => {
    handleClose();
    setLoading({ loading: true });

    editReview({
      id: selectRow._id,
      body: values,
      success: () => {
        actions.setSubmitting(false);
        showToast({
          message: "You successfully replied to a comment!",
          intent: "success",
          timeout: 3000
        });
        setLoading({ loading: false });
      },
      fail: err => {
        actions.setSubmitting(false);
        showToast({
          message: err.response.data.message,
          status: "error"
        });

        setLoading({ loading: false });
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Formik
        initialValues={{ reply: "" }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {props => {
          return (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">
                Reply to a comment
              </DialogTitle>
              <DialogContent className={classes.dialog}>
                <DialogContentText>Please reply to a comment</DialogContentText>

                <TextField
                  autoFocus
                  margin="dense"
                  id="reply"
                  name="reply"
                  label="Reply"
                  type="text"
                  className={classes.textField}
                  multiline
                  rows="5"
                  variant="outlined"
                  value={props.values.reply}
                  onChange={props.handleChange}
                  error={props.errors.reply && props.touched.reply}
                  helperText={
                    props.errors.reply &&
                    props.touched.reply &&
                    props.errors.reply
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  params: state.review.params,
  count: state.review.count
});

const mapDispatchToProps = {
  editReview: review.editReview,
  getReviews: review.getReviews,
  showToast: toast.showToast,
  setLoading: progress.setLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyModal);
