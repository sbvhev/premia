import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  InputAdornment,
  Typography,
  Container,
  Box,
  Card
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AccessibleIcon from "@material-ui/icons/Accessible";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { auth, toast } from "redux/actions";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles(theme => ({
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
  root: {
    display: "flex",
    height: "100%"
  },
  card: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto"
  },
  container: {
    display: "flex",
    width: "50%"
  },
  background: {
    width: "50%",
    height: "100%",
    backgroundImage: `url("/restaurant.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
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
    role: ""
  };

  const handleSubmit = (values, actions) => {
    signup({
      body: values,
      success: () => {
        actions.setSubmitting(false);
        history.push("/login");
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
          intent: "error"
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

  return (
    <Box className={classes.root} component="div">
      <Box className={classes.background} component="div"></Box>
      <Container className={classes.container} component="main" maxWidth="sm">
        <CssBaseline />
        <Card className={classes.card} raised>
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
                      id="lastName"
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
                      id="email"
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
                      id="password"
                      value={props.values.password}
                      error={props.errors.password && props.touched.password}
                      helperText={
                        props.errors.password &&
                        props.touched.password &&
                        props.errors.password
                      }
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="passwordConfirm"
                      label="Confirm Password"
                      type="password"
                      id="passwordConfirm"
                      error={
                        props.errors.passwordConfirm &&
                        props.touched.passwordConfirm
                      }
                      helperText={
                        props.errors.passwordConfirm &&
                        props.touched.passwordConfirm &&
                        props.errors.passwordConfirm
                      }
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
                    <option value=""></option>
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
        </Card>
      </Container>
    </Box>
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
