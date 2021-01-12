import { GET_SYMPTOMSTAT, SYMPTOMSTAT_LOADING } from "./symptomStatTypes";
import axios from "axios";

export const getSymptomStat = (id) => (dispatch) => {
  dispatch(setSymptomStatLoading());
  axios
    .get("/api/symptomstat", {
      params: {
        id,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_SYMPTOMSTAT,
        payload: res.data,
      });
    });
};

export const setSymptomStatLoading = () => {
  return {
    type: SYMPTOMSTAT_LOADING,
  };
};
