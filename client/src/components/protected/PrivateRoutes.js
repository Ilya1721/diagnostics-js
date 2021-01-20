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
import UserEditForm from "./User/UserEditForm";
import Statistics from "./Statistics/Statistics";
import RoomStat from "./Statistics/RoomStat";
import ProcedureStat from "./Statistics/ProcedureStat";
import TreatmentStat from "./Statistics/TreatmentStat";
import MedicamentStat from "./Statistics/MedicamentStat";
import DiagnosStat from "./Statistics/DiagnosStat";
import SymptomStat from "./Statistics/SymptomStat";
import VisitStat from "./Statistics/VisitStat";
import Clinics from "./InnerData/Clinics";
import Clinic from "./InnerData/Clinic";
import ClinicCreateForm from "./InnerData/ClinicCreateForm";
import ClinicEditForm from "./InnerData/ClinicEditForm";
import Department from "./InnerData/Department";
import DepartmentCreateForm from "./InnerData/DepartmentCreateForm";
import DepartmentEditForm from "./InnerData/DepartmentEditForm";
import RoomCreateForm from "./InnerData/RoomCreateForm";
import RoomEditForm from "./InnerData/RoomEditForm";
import PrivateRoute from "./PrivateRoute";

class PrivateRoutes extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const { role_id } = this.props.auth.user;
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
          path="/patients/:id/visits/create"
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
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/users/:id/edit"
          component={UserEditForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics"
          component={Statistics}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/rooms"
          component={RoomStat}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/procedures"
          component={ProcedureStat}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/treatments"
          component={TreatmentStat}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/medicaments"
          component={MedicamentStat}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/diagnosis"
          component={DiagnosStat}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/symptoms"
          component={SymptomStat}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/visits"
          component={VisitStat}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData"
          component={Clinics}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={"/clinics/create"}
          component={ClinicCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/clinics/:id/show"
          component={Clinic}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/clinics/:id/edit"
          component={ClinicEditForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/departments/:id/show"
          component={Department}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/clinic/:id/departments/create`}
          component={DepartmentCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/clinic/:id/departments/:id/edit`}
          component={DepartmentEditForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/departments/:id/rooms/create`}
          component={RoomCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/departments/:id/rooms/:id/edit`}
          component={RoomEditForm}
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
