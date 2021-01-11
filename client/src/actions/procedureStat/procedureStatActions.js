import { GET_PROCEDURESTAT, PROCEDURESTAT_LOADING } from "./procedureStatTypes";
import axios from "axios";

export const getProcedureStat = (id) => (dispatch) => {
  dispatch(setProcedureStatLoading());
  axios
    .get("/api/procedurestat", {
      params: {
        id,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_PROCEDURESTAT,
        payload: res.data,
      });
    });
};

export const setProcedureStatLoading = () => {
  return {
    type: PROCEDURESTAT_LOADING,
  };
};
