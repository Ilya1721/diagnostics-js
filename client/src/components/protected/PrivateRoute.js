import React from "react";
import { Route, Redirect } from "react-router-dom";

import HomeLayout from "../layout/HomeLayout";
import UnAuthLayout from "../layout/UnAuthLayout";

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuth,
  path,
  ...props
}) => {
  if (!isAuth) {
    return (
      <Route exact path={path}>
        <UnAuthLayout Child={redirectTo} />
      </Route>
    );
  }
  return (
    <Route exact path={path}>
      <HomeLayout Child={Component} />
    </Route>
  );
};

export default PrivateRoute;
