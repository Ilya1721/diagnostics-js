import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Visits from "./Visit/Visits";
import VisitsCreateForm from "./Visit/VisitsCreateForm";
import Patients from "./Patient/Patients";
import Patient from "./Patient/Patient";
import PatientCreateForm from "./Patient/PatientCreateForm";
import PatientEditForm from "./Patient/PatientEditForm";
import PersonalData from "./User/PersonalData";
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
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/patients"
          component={Patients}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path={`/patients/:id/show`}
          component={Patient}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/patients/create"
          component={PatientCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/patients/:id/edit"
          component={PatientEditForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/personalData"
          component={PersonalData}
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
