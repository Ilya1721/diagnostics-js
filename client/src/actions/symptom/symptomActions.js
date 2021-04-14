import {
  GET_SYMPTOMS,
  ADD_SYMPTOM,
  DELETE_SYMPTOM,
  SYMPTOMS_LOADING,
} from "./symptomTypes";
import axios from "axios";

export const getSymptoms = () => (dispatch) => {
  dispatch(setSymptomsLoading());
  axios.get("/api/symptoms").then((res) => {
    dispatch({
      type: GET_SYMPTOMS,
      payload: res.data,
    });
  });
};

export const addSymptom = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setSymptomsLoading());
  axios.post("/api/symptoms", body, config).then((res) => {
    dispatch({
      type: ADD_SYMPTOM,
      payload: res.data,
    });
  });
};

export const setSymptomsLoading = () => {
  return {
    type: SYMPTOMS_LOADING,
  };
};
