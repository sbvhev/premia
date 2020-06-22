import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Divider,
  Box
} from "@material-ui/core";
import {
  ExitToApp as ExitToAppIcon,
  AccountCircle as AccountCircleIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { auth, toast } from "redux/actions";
import UpdateProfile from "components/update_profile";

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
  },
  profile: {
    fontSize: "1rem",
    textTransform: "uppercase"
  },
  profileIcon: {
    marginRight: "0.5rem"
  }
}));

const Header = props => {
  const classes = useStyles();
  const history = useHistory();
  const { auth, logout, showToast } = props;
  const [open, setOpen] = useState(false);

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
              <Box component="div" m={1}>
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
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box component="div" m={1}>
                <IconButton
                  className={classes.profile}
                  color="inherit"
                  onClick={() => setOpen(true)}
                >
                  <AccountCircleIcon className={classes.profileIcon} />
                  {` ${auth.me.firstName} ${auth.me.lastName} (${auth.me.role})`}
                </IconButton>
                <Link to="" className={classes.link}>
                  <Button color="inherit" onClick={handlgeLogout}>
                    <ExitToAppIcon />
                  </Button>
                </Link>
              </Box>
            </React.Fragment>
          )}
        </Toolbar>
        <UpdateProfile handleClose={() => setOpen(false)} open={open} />
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
