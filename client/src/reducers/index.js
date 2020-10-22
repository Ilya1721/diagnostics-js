import { combineReducers } from "redux";
import clinicReducer from "./clinicReducer";
import employeeReducer from "./employeeReducer";

export default combineReducers({
  clinic: clinicReducer,
  employee: employeeReducer,
});
