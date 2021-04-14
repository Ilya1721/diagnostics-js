import {
  GET_MEDICAMENTS,
  ADD_MEDICAMENT,
  MEDICAMENTS_LOADING,
} from "./medicamentTypes";
import axios from "axios";

export const getMedicaments = () => (dispatch) => {
  dispatch(setMedicamentsLoading());
  axios.get("/api/medicaments").then((res) => {
    dispatch({
      type: GET_MEDICAMENTS,
      payload: res.data,
    });
  });
};

export const addMedicament = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setMedicamentsLoading());
  axios.post("/api/medicaments", body, config).then((res) => {
    dispatch({
      type: ADD_MEDICAMENT,
      payload: res.data,
    });
  });
};

export const setMedicamentsLoading = () => {
  return {
    type: MEDICAMENTS_LOADING,
  };
};
