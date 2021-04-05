import {
  GET_CLINICS,
  ADD_CLINIC,
  EDIT_CLINIC,
  DELETE_CLINIC,
  CLINICS_LOADING,
} from "./clinicTypes";
import axios from "axios";

export const getClinics = () => (dispatch) => {
  dispatch(setClinicsLoading());
  axios.get("/api/clinics").then((res) => {
    dispatch({
      type: GET_CLINICS,
      payload: res.data,
    });
  });
};

export const findClinics = (data) => (dispatch) => {
  const query = {
    params: data,
  };
  axios.get("/api/clinics", query).then((res) => {
    dispatch({
      type: GET_CLINICS,
      payload: res.data,
    });
  });
};

export const getClinic = (id) => (dispatch) => {
  dispatch(setClinicsLoading());
  axios.get(`/api/clinics/${id}`).then((res) => {
    dispatch({
      type: GET_CLINICS,
      payload: res.data,
    });
  });
};

export const addClinic = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setClinicsLoading());
  axios.post("/api/clinics", body, config).then((res) => {
    dispatch({
      type: ADD_CLINIC,
      payload: res.data,
    });
  });
};

export const deleteClinic = (id) => (dispatch) => {
  axios.delete(`/api/clinics/${id}`).then((res) => {
    dispatch({
      type: DELETE_CLINIC,
      payload: id,
    });
  });
};

export const editClinic = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setClinicsLoading());
  axios.put(`/api/clinics/${data.id}`, body, config).then((res) => {
    dispatch({
      type: EDIT_CLINIC,
      payload: res.data,
    });
  });
};

export const setClinicsLoading = () => {
  return {
    type: CLINICS_LOADING,
  };
};
