import { combineReducers } from "redux";
import clinicReducer from "./clinicReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import cityReducer from "./cityReducer";
import countryReducer from "./countryReducer";
import jobReducer from "./jobReducer";
import departmentReducer from "./departmentReducer";
import visitReducer from "./visitReducer";
import roomReducer from "./roomReducer";
import patientReducer from "./patientReducer";
import roomStatReducer from "./roomStatReducer";
import procedureStatReducer from "./procedureStatReducer";
import treatmentStatReducer from "./treatmentStatReducer";
import medicamentStatReducer from "./medicamentStatReducer";
import diagnosStatReducer from "./diagnosStatReducer";
import symptomStatReducer from "./symptomStatReducer";
import visitStatReducer from "./visitStatReducer";

export default combineReducers({
  clinic: clinicReducer,
  user: userReducer,
  error: errorReducer,
  auth: authReducer,
  city: cityReducer,
  country: countryReducer,
  job: jobReducer,
  department: departmentReducer,
  visit: visitReducer,
  room: roomReducer,
  patient: patientReducer,
  roomStat: roomStatReducer,
  procedureStat: procedureStatReducer,
  treatmentStat: treatmentStatReducer,
  diagnosStat: diagnosStatReducer,
  symptomStat: symptomStatReducer,
  visitStat: visitStatReducer,
});
