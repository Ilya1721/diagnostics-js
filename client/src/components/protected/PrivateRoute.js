import React from "react";
import { Route, Redirect } from "react-router-dom";

import HomeLayout from "../layout/HomeLayout";

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuth,
  path,
  ...props
}) => {
  if (!isAuth) {
    return <Redirect to={redirectTo} />;
  }
  return (
    <Route exact path={path}>
      <HomeLayout Child={Component} />
    </Route>
  );
};

export default PrivateRoute;
