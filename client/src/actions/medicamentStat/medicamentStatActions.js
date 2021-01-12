import {
  GET_MEDICAMENTSTAT,
  MEDICAMENTSTAT_LOADING,
} from "./medicamentStatTypes";
import axios from "axios";

export const getMedicamentStat = (id) => (dispatch) => {
  dispatch(setMedicamentStatLoading());
  axios
    .get("/api/medicamentstat", {
      params: {
        id,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_MEDICAMENTSTAT,
        payload: res.data,
      });
    });
};

export const setMedicamentStatLoading = () => {
  return {
    type: MEDICAMENTSTAT_LOADING,
  };
};
