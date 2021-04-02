import {
  GET_DIAGNOSTICS,
  ADD_DIAGNOSTIC,
  GENERATE_DIAGNOSTICS,
  DIAGNOSTICS_LOADING,
} from "./diagnosticTypes";
import axios from "axios";

export const generateDiagnostics = (symptoms) => (dispatch) => {
  dispatch(setDiagnosticsLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(symptoms);
  axios.post("/api/diagnostics/generate", body, config).then((res) => {
    dispatch({
      type: GENERATE_DIAGNOSTICS,
      payload: res.data,
    });
  });
};

export const getDiagnostics = () => (dispatch) => {
  dispatch(setDiagnosticsLoading());
  axios.get("/api/diagnostics").then((res) => {
    dispatch({
      type: GET_DIAGNOSTICS,
      payload: res.data,
    });
  });
};

export const addDiagnostic = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setDiagnosticsLoading());
  axios
    .post("/api/diagnostics", body, config)
    .then((res) => {
      dispatch({
        type: ADD_DIAGNOSTIC,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const setDiagnosticsLoading = () => (dispatch) => {
  return {
    type: DIAGNOSTICS_LOADING,
  };
};
