import {
  GET_PROCEDURES,
  ADD_PROCEDURE,
  PROCEDURES_LOADING,
} from "./procedureTypes";
import axios from "axios";

export const getProcedures = () => (dispatch) => {
  dispatch(setProceduresLoading());
  axios.get("/api/procedures").then((res) => {
    dispatch({
      type: GET_PROCEDURES,
      payload: res.data,
    });
  });
};

export const addProcedure = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setProceduresLoading());
  axios.post("/api/procedures", body, config).then((res) => {
    dispatch({
      type: ADD_PROCEDURE,
      payload: res.data,
    });
  });
};

export const setProceduresLoading = () => {
  return {
    type: PROCEDURES_LOADING,
  };
};
