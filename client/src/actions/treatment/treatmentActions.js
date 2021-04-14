import {
  GET_TREATMENTS,
  ADD_TREATMENT,
  TREATMENTS_LOADING,
} from "./treatmentTypes";
import axios from "axios";

export const getTreatments = () => (dispatch) => {
  dispatch(setTreatmentsLoading());
  axios.get("/api/treatments").then((res) => {
    dispatch({
      type: GET_TREATMENTS,
      payload: res.data,
    });
  });
};

export const addTreatment = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setTreatmentsLoading());
  axios.post("/api/treatments", body, config).then((res) => {
    dispatch({
      type: ADD_TREATMENT,
      payload: res.data,
    });
  });
};

export const setTreatmentsLoading = () => {
  return {
    type: TREATMENTS_LOADING,
  };
};
