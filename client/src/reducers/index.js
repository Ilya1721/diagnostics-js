import { combineReducers } from "redux";
import clinicReducer from "./clinicReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  clinic: clinicReducer,
  user: userReducer,
  error: errorReducer,
  auth: authReducer,
});
