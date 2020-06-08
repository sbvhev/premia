import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LogIn from "pages/login";
import Signup from "pages/signup";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </Switch>
    </>
  );
};

export default Routes;
