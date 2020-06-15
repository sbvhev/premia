import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Accessible as AccessibleIcon
} from "@material-ui/icons";
import * as Yup from "yup";
import _ from "lodash-es";
import { user, toast, progress } from "redux/actions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: "red",
    textAlign: "left"
  },
  role: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  action: {
    float: "right"
  },
  placeholder: {
    height: 40,
    position: "absolute",
    top: "calc(50% - 20)",
    left: "calc(50% - 20)"
  }
}));

const UpdateUser = props => {
  const classes = useStyles();
  const { open, handleClose, updateUser, showToast, selectedRow } = props;

  const initialValues = {
    password: "********",
    passwordConfirm: "********",
    ..._.pick(selectedRow, ["firstName", "lastName", "role", "email"])
  };

  const validation = Yup.object().shape({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid email."),
    password: Yup.string().required("Password is required."),
    passwordConfirm: Yup.string()
      .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        )
      })
      .required("Password confirm is required"),
    role: Yup.string().required("Role is required")
  });

  const handleSubmit = (values, actions) => {
    if (
      values["password"].includes("******") ||
      values["passwordConfirm"].includes("******")
    ) {
      values = _.omit(values, ["password", "passwordConfirm"]);
    }

    updateUser({
      id: selectedRow._id,
      body: values,
      success: () => {
        actions.setSubmitting(false);
        showToast({
          message: "You successfully updated user!",
          intent: "success",
          timeout: 3000
        });
        handleClose();
      },
      fail: err => {
        actions.setSubmitting(false);
        showToast({
          message: err.response.data.message,
          intent: "error"
        });
        handleClose();
      }
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update selected user</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {props => (
              <form className={classes.form} onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      label="First Name"
                      value={props.values.firstName}
                      onChange={props.handleChange}
                      error={props.errors.firstName && props.touched.firstName}
                      helperText={
                        props.errors.firstName &&
                        props.touched.firstName &&
                        props.errors.firstName
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        )
                      }}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={props.values.lastName}
                      onChange={props.handleChange}
                      error={props.errors.lastName && props.touched.lastName}
                      helperText={
                        props.errors.lastName &&
                        props.touched.lastName &&
                        props.errors.lastName
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        )
                      }}
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={props.values.email}
                      error={props.errors.email && props.touched.email}
                      helperText={
                        props.errors.email &&
                        props.touched.email &&
                        props.errors.email
                      }
                      onChange={props.handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        )
                      }}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      error={props.errors.password && props.touched.password}
                      helperText={
                        props.errors.password &&
                        props.touched.password &&
                        props.errors.password
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        )
                      }}
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="passwordConfirm"
                      label="Confirm Password"
                      type="password"
                      value={props.values.passwordConfirm}
                      onChange={props.handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        )
                      }}
                      error={
                        props.errors.passwordConfirm &&
                        props.touched.passwordConfirm
                      }
                      helperText={
                        props.errors.passwordConfirm &&
                        props.touched.passwordConfirm &&
                        props.errors.passwordConfirm
                      }
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="role"
                    fullWidth
                    select
                    label="Role"
                    className={classes.role}
                    value={props.values.role}
                    onChange={props.handleChange}
                    SelectProps={{
                      native: true
                    }}
                    error={props.errors.role && props.touched.role}
                    helperText="Please select your role"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessibleIcon />
                        </InputAdornment>
                      )
                    }}
                    variant="outlined"
                  >
                    <option value="regular">Regular</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </TextField>
                </Grid>
                <Grid className={classes.action}>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  updateUser: user.updateUser,
  showToast: toast.showToast,
  setLoading: progress.setLoading
};

export default connect(null, mapDispatchToProps)(UpdateUser);
