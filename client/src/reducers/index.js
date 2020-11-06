import { combineReducers } from "redux";
import clinicReducer from "./clinicReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import cityReducer from "./cityReducer";
import countryReducer from "./countryReducer";
import jobReducer from "./jobReducer";
import departmentReducer from "./departmentReducer";

export default combineReducers({
  clinic: clinicReducer,
  user: userReducer,
  error: errorReducer,
  auth: authReducer,
  city: cityReducer,
  country: countryReducer,
  job: jobReducer,
  department: departmentReducer,
});
