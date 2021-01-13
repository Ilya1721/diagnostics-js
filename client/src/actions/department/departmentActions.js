import {
  GET_DEPARTMENTS,
  ADD_CITY,
  DELETE_CITY,
  DEPARTMENTS_LOADING,
} from "./departmentTypes";
import axios from "axios";

export const getDepartments = () => (dispatch) => {
  dispatch(setDepartmentsLoading());
  axios.get("/api/departments").then((res) => {
    dispatch({
      type: GET_DEPARTMENTS,
      payload: res.data,
    });
  });
};

export const getDepartmentsById = (id) => (dispatch) => {
  dispatch(setDepartmentsLoading());
  axios.get(`/api/departments/ofClinic/${id}`).then((res) => {
    dispatch({
      type: GET_DEPARTMENTS,
      payload: res.data,
    });
  });
};

export const getDepartment = (id) => (dispatch) => {
  dispatch(setDepartmentsLoading());
  axios.get(`/api/departments/${id}`).then((res) => {
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
