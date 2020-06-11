import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountBox from "@material-ui/icons/AccountBox";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as Yup from "yup";
import { Formik } from "formik";
import { auth, toast } from "redux/actions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(20),
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: "red",
    textAlign: "left"
  }
}));

const LogIn = props => {
  let {
    login,
    showToast,
    auth: { status }
  } = props;
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {}, [status]);

  const initialValues = {
    email: "",
    password: ""
  };

  const handleSubmit = (values, actions) => {
    login({
      body: values,
      success: () => {
        actions.setSubmitting(false);
        history.push("/dashboard");
        showToast({
          message: "You are successfully logged in!",
          intent: "success"
        });
      },
      fail: err => {
        actions.setSubmitting(false);
        showToast({ message: err.response.data.message, intent: "error" });
      }
    });
  };

  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid email."),
    password: Yup.string().required("Password is required.")
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {props => (
            <form
              className={classes.form}
              onSubmit={props.handleSubmit}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={props.values.email}
                onChange={props.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox />
                    </InputAdornment>
                  )
                }}
                autoFocus
              />
              {props.errors.email && props.touched.email ? (
                <div className={classes.error}>{props.errors.email}</div>
              ) : null}
              <TextField
                variant="outlined"
                margin="normal"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <span> Don't have an account? </span>
                  <Link to="/signup" variant="body2">
                    {"Sign Up"}
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
  login: auth.login,
  showToast: toast.showToast
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
