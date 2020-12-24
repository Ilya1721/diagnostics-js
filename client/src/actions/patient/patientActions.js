import {
  GET_PATIENTS,
  ADD_PATIENT,
  DELETE_PATIENT,
  PATIENTS_LOADING,
  EDIT_PATIENT,
} from "./patientTypes";
import { GET_ERRORS } from "../error/errorTypes";
import { returnErrors } from "../error/errorActions";
import axios from "axios";

export const getPatients = (user) => (dispatch) => {
  dispatch(setPatientsLoading());
  axios
    .get("/api/patients", {
      params: {
        find: undefined,
        ...user,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_PATIENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PATIENTS ERROR"
        )
      );
    });
};

export const getPatient = (id) => (dispatch) => {
  dispatch(setPatientsLoading());
  axios
    .get(`/api/patients/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PATIENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PATIENTS ERROR"
        )
      );
    });
};

export const createPatient = (data) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify(data);

  axios
    .post("/api/patients", body, config)
    .then((res) => {
      dispatch({
        type: ADD_PATIENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_PATIENT_FAIL")
      );
    });
};

export const setPatientsLoading = () => {
  return {
    type: PATIENTS_LOADING,
  };
};
