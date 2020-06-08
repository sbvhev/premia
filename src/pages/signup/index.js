import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccessibleIcon from "@material-ui/icons/Accessible";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { auth, toast } from "redux/actions";
import PersonIcon from "@material-ui/icons/Person";

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
  }
}));

const SignUp = props => {
  const classes = useStyles();
  const history = useHistory();

  const { signup, showToast } = props;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "regular"
  };

  const handleSubmit = (values, actions) => {
    signup({
      body: values,
      success: () => {
        actions.setSubmitting(false);
        showToast({
          message: "You are successfully signed up!",
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

  const validation = Yup.object().shape({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid email."),
    password: Yup.string().required("Password is required."),
    passwordConfirm: Yup.string()
      .test(
        "passwords-match",
        "Password doesn't match, please confirm it.",
        function(value) {
          return this.parent.password === value;
        }
      )
      .required("Confirm password is required.")
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
                    id="firstName"
                    label="First Name"
                    value={props.values.firstName}
                    onChange={props.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                    autoFocus
                  />
                  {props.errors.firstName && props.touched.firstName ? (
                    <div className={classes.error}>
                      {props.errors.firstName}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={props.values.lastName}
                    onChange={props.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                    autoComplete="lname"
                  />
                  {props.errors.lastName && props.touched.lastName ? (
                    <div className={classes.error}>{props.errors.lastName}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={props.values.email}
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
                  {props.errors.email && props.touched.email ? (
                    <div className={classes.error}>{props.errors.email}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={props.values.password}
                    onChange={props.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      )
                    }}
                    autoComplete="current-password"
                  />
                  {props.errors.password && props.touched.password ? (
                    <div className={classes.error}>{props.errors.password}</div>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    id="passwordConfirm"
                    value={props.values.passwordConfirm}
                    onChange={props.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      )
                    }}
                    autoComplete="current-password"
                  />
                  {props.errors.passwordConfirm &&
                  props.touched.passwordConfirm ? (
                    <div className={classes.error}>
                      {props.errors.passwordConfirm}
                    </div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="role"
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
                </TextField>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Back to Log in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signup: auth.signup,
  showToast: toast.showToast
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
