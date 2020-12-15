import React from "react";
import { Route, Redirect } from "react-router-dom";

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
      <Component />
    </Route>
  );
};

export default PrivateRoute;
