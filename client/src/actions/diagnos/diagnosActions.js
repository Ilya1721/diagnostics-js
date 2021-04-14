import {
  GET_DIAGNOSIS,
  ADD_DIAGNOS,
  DELETE_DIAGNOS,
  DIAGNOSIS_LOADING,
} from "./diagnosTypes";
import axios from "axios";

export const getDiagnosis = () => (dispatch) => {
  dispatch(setDiagnosisLoading());
  axios.get("/api/diagnosis").then((res) => {
    dispatch({
      type: GET_DIAGNOSIS,
      payload: res.data,
    });
  });
};

export const addDiagnos = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setDiagnosisLoading());
  axios.post("/api/diagnosis", body, config).then((res) => {
    dispatch({
      type: ADD_DIAGNOS,
      payload: res.data,
    });
  });
};

export const setDiagnosisLoading = () => {
  return {
    type: DIAGNOSIS_LOADING,
  };
};
