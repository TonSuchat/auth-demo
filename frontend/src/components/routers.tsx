import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./layout";
import Login from "./login";
import Register from "./register";
import Home from "./Home";

import { checkIsAuthen } from "../auth";

type PrivateRouteType = {
  component: React.FC;
  path: string;
  exact: boolean;
};

const PrivateRoute: React.FC<PrivateRouteType> = ({
  component,
  path,
  exact,
}) => {
  return checkIsAuthen() ? (
    <Route
      render={(props) => (
        <Layout {...props}>
          <Route path={path} exact={exact} component={component} />
        </Layout>
      )}
    />
  ) : (
    <Redirect to="/login" />
  );
};

const AppRouters = () => {
  return (
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/" exact={true} component={Home} />
      {/* <PrivateRoute path="/timeline" exact={true} component={Timeline} /> */}
      {/* <PrivateRoute path="/profile/:id" exact={true} component={Profile} /> */}
    </Switch>
  );
};

export default AppRouters;
