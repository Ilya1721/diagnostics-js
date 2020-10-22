import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EMPLOYEES_LOADING,
} from "./employeeTypes";
import axios from "axios";

export const getEmployees = () => (dispatch) => {
  dispatch(setEmployeesLoading());
  axios.get("/api/employees").then((res) => {
    console.log(res.data);
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  });
};

export const setEmployeesLoading = () => {
  return {
    type: EMPLOYEES_LOADING,
  };
};
