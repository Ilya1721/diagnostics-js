import {
  GET_VISITS,
  ADD_VISIT,
  DELETE_VISIT,
  VISITS_LOADING,
  VISITS_CREATE,
} from "./visitTypes";
import { GET_ERRORS } from "../error/errorTypes";
import { returnErrors } from "../error/errorActions";
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
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_VISITS ERROR")
      );
    });
};

export const getCreateData = () => (dispatch) => {
  axios
    .get("/api/visits/create")
    .then((res) => {
      dispatch({
        type: VISITS_CREATE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "VISIT_CREATE_DATA ERROR"
        )
      );
    });
};

export const setVisitsLoading = () => {
  return {
    type: VISITS_LOADING,
  };
};
