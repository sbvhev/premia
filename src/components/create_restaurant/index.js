import React from "react";
import { connect } from "react-redux";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import { restaurant, toast } from "redux/actions";

const validation = Yup.object().shape({
  name: Yup.string().required("Restaurnt name is required.")
});

function CreateRestaurant(props) {
  const { handleClose, classes, open, createRestaurant, showToast } = props;

  const handleSubmit = (values, actions) => {
    handleClose();

    createRestaurant({
      body: values,
      success: () => {
        actions.setSubmitting(false);
        showToast({
          message: "You successfully added a restaurant!",
          intent: "success",
          timeout: 3000
        });
      },
      fail: err => {
        actions.setSubmitting(false);
        showToast({
          message: err.response.data.message,
          status: "error"
        });
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
        initialValues={{ name: "" }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {props => {
          return (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">
                Create restaurant
              </DialogTitle>
              <DialogContent className={classes.dialog}>
                <DialogContentText>
                  Please input the restaurant name.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Restaurant Name"
                  type="text"
                  className={classes.textField}
                  fullWidth
                  rows="5"
                  variant="outlined"
                  value={props.values.name}
                  onChange={props.handleChange}
                  error={props.errors.name && props.touched.name}
                  helperText={
                    props.errors.name && props.touched.name && props.errors.name
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" vairant="contained">
                  Save
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
}

const mapDispatchToProps = {
  createRestaurant: restaurant.createRestaurant,
  showToast: toast.showToast
};

export default connect(null, mapDispatchToProps)(CreateRestaurant);
