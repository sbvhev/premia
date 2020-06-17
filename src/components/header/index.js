import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { auth, toast } from "redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  button: {
    textTransform: "none"
  }
}));

const Header = props => {
  const classes = useStyles();
  const history = useHistory();
  const { auth, logout, showToast } = props;

  const handlgeLogout = () => {
    logout();
    history.push("/login");
    showToast({
      message: "You are logged out!",
      intent: "success"
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Review Restaurant
          </Typography>
          {!!auth.me && (
            <React.Fragment>
              <Link to="/restaurants" className={classes.link}>
                <Button color="inherit" className={classes.button}>
                  Restaurants
                </Button>
              </Link>
              {auth.me.role === "admin" && (
                <Link to="/users" className={classes.link}>
                  <Button color="inherit" className={classes.button}>
                    Users
                  </Button>
                </Link>
              )}
              <Link to="" className={classes.link}>
                <Button color="inherit" onClick={handlgeLogout}>
                  <ExitToAppIcon />
                </Button>
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logout: auth.logout,
  showToast: toast.showToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
