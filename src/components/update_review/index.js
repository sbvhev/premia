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
import { review, toast, progress } from "redux/actions";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%"
  },
  dialog: {
    width: "30rem"
  },
  root: {
    width: 200,
    display: "flex",
    alignItems: "center"
  }
}));

const validation = Yup.object().shape({
  comment: Yup.string().required("Comment is required."),
  reply: Yup.string().optional()
});

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+"
};

const UpdateReview = props => {
  const classes = useStyles();
  const {
    id,
    open,
    handleClose,
    selectedRow,
    editReview,
    getReviews,
    showToast,
    setLoading,
    params,
    count
  } = props;

  const [rate, setRate] = useState(selectedRow.rate);
  const [hover, setHover] = React.useState(-1);

  useEffect(() => {
    getReviews({ params, id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    setRate(selectedRow.rate);
  }, [open, selectedRow]);

  const handleSubmit = (values, actions) => {
    values["id"] = id;
    values["rate"] = rate;

    handleClose();
    setLoading({ loading: true });

    editReview({
      id: selectedRow._id,
      body: values,
      success: () => {
        actions.setSubmitting(false);
        showToast({
          message: "You successfully updated a review!",
          intent: "success",
          timeout: 3000
        });
        setLoading({ loading: false });
      },
      fail: err => {
        actions.setSubmitting(false);
        showToast({
          message: err.response.data.message,
          intent: "error"
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
        initialValues={{
          comment: selectedRow.comment,
          reply: selectedRow.reply
        }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {props => {
          return (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">Edit a review</DialogTitle>
              <DialogContent className={classes.dialog}>
                <DialogContentText>
                  Please leave a comment and rate
                </DialogContentText>

                <Box
                  mb={1}
                  component="div"
                  className={classes.root}
                  borderColor="transparent"
                >
                  <Rating
                    name="simple-controlled"
                    value={rate}
                    precision={0.25}
                    onChange={(event, newValue) => {
                      setRate(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {rate !== null && (
                    <Box ml={2}>{labels[hover !== -1 ? hover : rate]}</Box>
                  )}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReview);
