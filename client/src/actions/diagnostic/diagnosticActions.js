import { GET_DIAGNOSTICS, DIAGNOSTICS_LOADING } from "./diagnosticTypes";
import axios from "axios";

export const getDiagnostics = (symptoms) => (dispatch) => {
  dispatch(setDiagnosticsLoading());
  axios
    .get("/api/diagnostics", {
      params: {
        symptoms,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_DIAGNOSTICS,
        payload: res.data,
      });
    });
};

export const setDiagnosticsLoading = () => (dispatch) => {
  return {
    type: DIAGNOSTICS_LOADING,
  };
};
