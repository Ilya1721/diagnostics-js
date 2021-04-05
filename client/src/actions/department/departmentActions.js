import {
  GET_DEPARTMENTS,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  DELETE_DEPARTMENT,
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

export const addDepartment = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setDepartmentsLoading());
  axios
    .post(`/api/departments/ofClinic/${data.clinicId}`, body, config)
    .then((res) => {
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.data,
      });
    });
};

export const deleteDepartment = (id) => (dispatch) => {
  axios.delete(`/api/departments/${id}`).then((res) => {
    dispatch({
      type: DELETE_DEPARTMENT,
      payload: id,
    });
  });
};

export const editDepartment = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setDepartmentsLoading());
  axios.put(`/api/departments/${data.id}`, body, config).then((res) => {
    console.log(res.data);
    dispatch({
      type: EDIT_DEPARTMENT,
      payload: res.data,
    });
  });
};

export const setDepartmentsLoading = () => {
  return {
    type: DEPARTMENTS_LOADING,
  };
};
