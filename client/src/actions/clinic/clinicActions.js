import {
  GET_CLINICS,
  ADD_CLINIC,
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

export const setClinicsLoading = () => {
  return {
    type: CLINICS_LOADING,
  };
};
