import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AdminAccessDenied from "./Helpers/AdminAccessDenied";
import UserAccessDenied from "./Helpers/UserAccessDenied";
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
import Symptoms from "./InnerData/Symptom/Symptoms";
import SymptomCreateForm from "./InnerData/Symptom/SymptomCreateForm";
import Procedures from "./InnerData/Procedure/Procedures";
import ProcedureCreateForm from "./InnerData/Procedure/ProcedureCreateForm";
import Diagnosis from "./InnerData/Diagnos/Diagnosis";
import DiagnosCreateForm from "./InnerData/Diagnos/DiagnosCreateForm";
import Medicaments from "./InnerData/Medicament/Medicaments";
import MedicamentCreateForm from "./InnerData/Medicament/MedicamentCreateForm";
import Treatments from "./InnerData/Treatment/Treatments";
import TreatmentCreateForm from "./InnerData/Treatment/TreatmentCreateForm";
import Countries from "./InnerData/Country/Countries";
import CountryCreateForm from "./InnerData/Country/CountryCreateForm";
import Cities from "./InnerData/City/Cities";
import CityCreateForm from "./InnerData/City/CityCreateForm";
import PrivateRoute from "./PrivateRoute";

class PrivateRoutes extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    let role_id = 0;
    if (isAuthenticated) {
      role_id = this.props.auth.user.role_id;
    }
    return (
      <React.Fragment>
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/visits"
          component={Visits}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/patients/:id/visits/create"
          component={VisitsCreateForm}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/patients"
          component={Patients}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path={`/patients/:id/show`}
          component={Patient}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/patients/create"
          component={PatientCreateForm}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/patients/:id/edit"
          component={PatientEditForm}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/personalData"
          component={PersonalData}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/users/:id/edit"
          component={UserEditForm}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics"
          component={Statistics}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/procedures"
          component={ProcedureStat}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/treatments"
          component={TreatmentStat}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/medicaments"
          component={MedicamentStat}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/diagnosis"
          component={DiagnosStat}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/symptoms"
          component={SymptomStat}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/statistics/visits"
          component={VisitStat}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated}
          path="/diagnostics"
          component={DiagnosticsForm}
          redirectTo={UserAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData"
          component={InnerData}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics"
          component={Clinics}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={"/innerData/clinics/create"}
          component={ClinicCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics/:id/show"
          component={Clinic}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics/:id/edit"
          component={ClinicEditForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/clinics/:clinic_id/departments/:id/show"
          component={Department}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:id/departments/create`}
          component={DepartmentCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:clinic_id/departments/:id/edit`}
          component={DepartmentEditForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:clinic_id/departments/:id/rooms/create`}
          component={RoomCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path={`/innerData/clinics/:clinic_id/departments/:department_id/rooms/:id/edit`}
          component={RoomEditForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diagnostics"
          component={Diagnostics}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diagnostics/create"
          component={DiagnosticCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diagnostics/:id/edit"
          component={DiagnosticEditForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/symptoms"
          component={Symptoms}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/symptoms/create"
          component={SymptomCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diseases"
          component={Diagnosis}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/diseases/create"
          component={DiagnosCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/medicaments"
          component={Medicaments}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/medicaments/create"
          component={MedicamentCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/procedures"
          component={Procedures}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/procedures/create"
          component={ProcedureCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/treatments"
          component={Treatments}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/treatments/create"
          component={TreatmentCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/countries"
          component={Countries}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/countries/create"
          component={CountryCreateForm}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/cities"
          component={Cities}
          redirectTo={AdminAccessDenied}
        />
        <PrivateRoute
          isAuth={isAuthenticated && role_id === 2}
          path="/innerData/cities/create"
          component={CityCreateForm}
          redirectTo={AdminAccessDenied}
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
