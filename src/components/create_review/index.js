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
  Box,
  Button
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { review, toast } from "redux/actions";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%"
  },
  dialog: {
    width: "30rem"
  }
}));

const validation = Yup.object().shape({
  comment: Yup.string().required("Comment is required.")
});

const CreateReview = props => {
  const classes = useStyles();
  const {
    id,
    open,
    handleClose,
    addReview,
    getReviews,
    showToast,
    params,
    count
  } = props;

  const [rate, setRate] = useState(0);

  useEffect(() => {
    getReviews({ params, id });
  }, [count]);

  const handleSubmit = (values, actions) => {
    values["id"] = id;
    values["rate"] = rate;
    addReview({
      body: values,
      success: () => {
        actions.setSubmitting(false);
        showToast({
          message: "You successfully added a review!",
          intent: "success",
          timeout: 3000
        });
        handleClose();
      },
      fail: err => {
        actions.setSubmitting(false);
        showToast({
          message: err.response.data.message,
          status: "error"
        });
        handleClose();
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
        initialValues={{ comment: "" }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {props => {
          return (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">Add a review</DialogTitle>
              <DialogContent className={classes.dialog}>
                <DialogContentText>
                  Please leave a comment and rate
                </DialogContentText>

                <Box mb={1} borderColor="transparent">
                  <Rating
                    name="simple-controlled"
                    value={rate}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setRate(newValue);
                    }}
                  />
                </Box>
                <TextField
                  autoFocus
                  margin="dense"
                  id="comment"
                  name="comment"
                  label="Comment"
                  type="text"
                  className={classes.textField}
                  multiline
                  rows="5"
                  variant="outlined"
                  value={props.values.comment}
                  onChange={props.handleChange}
                  error={props.errors.comment && props.touched.comment}
                  helperText={
                    props.errors.comment &&
                    props.touched.comment &&
                    props.errors.comment
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
  addReview: review.addReview,
  getReviews: review.getReviews,
  showToast: toast.showToast
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);
