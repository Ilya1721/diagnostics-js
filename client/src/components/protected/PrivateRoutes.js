import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Visits from "./Visits";
import VisitsCreateForm from "./VisitsCreateForm";
import PrivateRoute from "./PrivateRoute";

class PrivateRoutes extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <React.Fragment>
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/visits"
          component={Visits}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/visits/create"
          component={VisitsCreateForm}
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
