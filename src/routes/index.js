import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import get from "lodash-es/get";
import { useSelector } from "react-redux";
import LogIn from "pages/login";
import Signup from "pages/signup";
import Dashboard from "pages/dashboard";
import Header from "components/header";

const Routes = () => {
  const isAuthenticated = useSelector(
    state => !!get(state, "auth.token", false)
  );
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (isAuthenticated) {
              return <Redirect to="/restaurants" />;
            }
            return <Redirect to="/login" />;
          }}
        />
        {!isAuthenticated && (
          <Switch>
            <Route path="/login" component={LogIn} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" render={() => <Redirect to="/login" />} />
          </Switch>
        )}
        {isAuthenticated && (
          <>
            <Header />
            <Switch>
              <Route exact path="/restaurants" component={Dashboard} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </>
        )}
      </Switch>
    </>
  );
};

export default Routes;
