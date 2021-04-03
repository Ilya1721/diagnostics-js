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
import ProcedureStat from "./Statistics/ProcedureStat";
import TreatmentStat from "./Statistics/TreatmentStat";
import MedicamentStat from "./Statistics/MedicamentStat";
import DiagnosStat from "./Statistics/DiagnosStat";
import SymptomStat from "./Statistics/SymptomStat";
import VisitStat from "./Statistics/VisitStat";
import Clinics from "./InnerData/Clinic/Clinics";
import Clinic from "./InnerData/Clinic/Clinic";
import ClinicCreateForm from "./InnerData/Clinic/ClinicCreateForm";
import ClinicEditForm from "./InnerData/Clinic/ClinicEditForm";
import Department from "./InnerData/Clinic/Department";
import DepartmentCreateForm from "./InnerData/Clinic/DepartmentCreateForm";
import DepartmentEditForm from "./InnerData/Clinic/DepartmentEditForm";
import RoomCreateForm from "./InnerData/Clinic/RoomCreateForm";
import RoomEditForm from "./InnerData/Clinic/RoomEditForm";
import DiagnosticsForm from "./Diagnostics/DiagnosticsForm";
import InnerData from "./InnerData/InnerData";
import Diagnostics from "./InnerData/Diagnostic/Diagnostics";
import DiagnosticCreateForm from "./InnerData/Diagnostic/DiagnosticCreateForm";
import DiagnosticEditForm from "./InnerData/Diagnostic/DiagnosticEditForm";
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
          isAuth={isAuthenticated}
          path="/diagnostics"
          component={DiagnosticsForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData"
          component={InnerData}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics"
          component={Clinics}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={"/innerData/clinics/create"}
          component={ClinicCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics/:id/show"
          component={Clinic}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics/:id/edit"
          component={ClinicEditForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics/:clinic_id/departments/:id/show"
          component={Department}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:id/departments/create`}
          component={DepartmentCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:clinic_id/departments/:id/edit`}
          component={DepartmentEditForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:clinic_id/departments/:id/rooms/create`}
          component={RoomCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:clinic_id/departments/:department_id/rooms/:id/edit`}
          component={RoomEditForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diagnostics"
          component={Diagnostics}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diagnostics/create"
          component={DiagnosticCreateForm}
          redirectTo="/login"
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diagnostics/:id/edit"
          component={DiagnosticEditForm}
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
