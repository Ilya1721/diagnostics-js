import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Visits from "./Visits";
import PrivateRoute from "./PrivateRoute";

class PrivateRoutes extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated);
    return (
      <React.Fragment>
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/visits"
          component={Visits}
          redirectTo="/login"
        />
      </React.Fragment>
    );
  }
}

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoutes);
