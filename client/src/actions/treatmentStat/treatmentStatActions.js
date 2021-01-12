import { GET_TREATMENTSTAT, TREATMENTSTAT_LOADING } from "./treatmentStatTypes";
import axios from "axios";

export const getTreatmentStat = (id) => (dispatch) => {
  dispatch(setTreatmentStatLoading());
  axios
    .get("/api/treatmentstat", {
      params: {
        id,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_TREATMENTSTAT,
        payload: res.data,
      });
    });
};

export const setTreatmentStatLoading = () => {
  return {
    type: TREATMENTSTAT_LOADING,
  };
};
