import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  InputAdornment,
  Typography,
  Container,
  Card,
  Box
} from "@material-ui/core";
import {
  LockOutlined as LockOutlinedIcon,
  AccountBox,
  Lock as LockIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik } from "formik";
import { auth, toast } from "redux/actions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(20)
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

const LogIn = props => {
  let { login, showToast } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (values, actions) => {
    login({
      body: values,
      success: () => {
        actions.setSubmitting(false);
        history.push("/restaurants");
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
    <Box className={classes.root} component="div">
      <Box className={classes.background} component="div"></Box>
      <Container className={classes.container} component="main" maxWidth="sm">
        <CssBaseline />
        <Card className={classes.card} raised>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
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
                  error={props.errors.email && props.touched.email}
                  helperText={
                    props.errors.email &&
                    props.touched.email &&
                    props.errors.email
                  }
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={props.errors.password && props.touched.password}
                  helperText={
                    props.errors.password &&
                    props.touched.password &&
                    props.errors.password
                  }
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
        </Card>
      </Container>
    </Box>
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
