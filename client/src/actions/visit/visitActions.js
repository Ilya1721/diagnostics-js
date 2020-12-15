import {
  GET_VISITS,
  ADD_VISIT,
  DELETE_VISIT,
  VISITS_LOADING,
} from "./visitTypes";
import axios from "axios";

export const getVisits = (user) => (dispatch) => {
  dispatch(setVisitsLoading());
  axios
    .get("/api/visits", {
      params: {
        find: undefined,
        ...user,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_VISITS,
        payload: res.data,
      });
    });
};

export const setVisitsLoading = () => {
  return {
    type: VISITS_LOADING,
  };
};
