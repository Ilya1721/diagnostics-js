import {
  GET_DEPARTMENTS,
  ADD_CITY,
  DELETE_CITY,
  DEPARTMENTS_LOADING,
} from "./departmentTypes";
import axios from "axios";

export const getDepartments = () => (dispatch) => {
  //console.log("department actions call");
  dispatch(setDepartmentsLoading());
  axios.get("/api/departments").then((res) => {
    dispatch({
      type: GET_DEPARTMENTS,
      payload: res.data,
    });
  });
};

export const setDepartmentsLoading = () => {
  return {
    type: DEPARTMENTS_LOADING,
  };
};
