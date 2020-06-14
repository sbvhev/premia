import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import get from "lodash-es/get";
import { useSelector } from "react-redux";
import LogIn from "pages/login";
import Signup from "pages/signup";
import DetailedView from "pages/detail_view";
import Dashboard from "pages/dashboard";
import Header from "components/header";
import User from "pages/user";

const Routes = () => {
  const isAuthenticated = useSelector(
    state => !!get(state, "auth.token", false)
  );

  const role = useSelector(state => get(state, "auth.me.role", "regular"));
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
              <Route path="/restaurants/:id" component={DetailedView} />
              {role === "admin" && <Route path="/users" component={User} />}
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </>
        )}
      </Switch>
    </>
  );
};

export default Routes;
