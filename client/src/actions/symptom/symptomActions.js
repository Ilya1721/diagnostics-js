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

export const setSymptomsLoading = () => {
  return {
    type: SYMPTOMS_LOADING,
  };
};
