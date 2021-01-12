import { GET_DIAGNOSSTAT, DIAGNOSSTAT_LOADING } from "./diagnosStatTypes";
import axios from "axios";

export const getDiagnosStat = (id) => (dispatch) => {
  dispatch(setDiagnosStatLoading());
  axios
    .get("/api/diagnosstat", {
      params: {
        id,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_DIAGNOSSTAT,
        payload: res.data,
      });
    });
};

export const setDiagnosStatLoading = () => {
  return {
    type: DIAGNOSSTAT_LOADING,
  };
};
