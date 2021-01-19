import {
  GET_VISITS,
  ADD_VISIT,
  DELETE_VISIT,
  VISITS_LOADING,
} from "./visitTypes";
import { GET_ERRORS } from "../error/errorTypes";
import { returnErrors } from "../error/errorActions";
import axios from "axios";

export const getVisits = (user) => (dispatch) => {
  dispatch(setVisitsLoading());
  axios
    .get("/api/visits", {
      params: {
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

export const findVisits = (data, user) => (dispatch) => {
  const query = {
    params: {
      ...data,
      ...user,
    },
  };
  axios.get("/api/visits", query).then((res) => {
    dispatch({
      type: GET_VISITS,
      payload: res.data,
    });
  });
};

export const createVisit = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);

  axios
    .post("/api/visits", body, config)
    .then((res) => {
      dispatch({
        type: ADD_VISIT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_VISIT_FAIL")
      );
    });
};

export const setVisitsLoading = () => {
  return {
    type: VISITS_LOADING,
  };
};
