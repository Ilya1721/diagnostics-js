import { GET_VISITSTAT, VISITSTAT_LOADING } from "./visitStatTypes";
import axios from "axios";

export const getVisitStat = (id) => (dispatch) => {
  dispatch(setVisitStatLoading());
  axios
    .get("/api/visitstat", {
      params: {
        id,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_VISITSTAT,
        payload: res.data,
      });
    });
};

export const setVisitStatLoading = () => {
  return {
    type: VISITSTAT_LOADING,
  };
};
