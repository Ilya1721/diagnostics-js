import {
  GET_CLINICS,
  ADD_CLINIC,
  DELETE_CLINIC,
  CLINICS_LOADING,
} from "./clinicTypes";
import axios from "axios";

export const getClinics = () => (dispatch) => {
  dispatch(setClinicsLoading());
  axios.get("/api/clinics").then((res) => {
    dispatch({
      type: GET_CLINICS,
      payload: res.data,
    });
  });
};

export const setClinicsLoading = () => {
  return {
    type: CLINICS_LOADING,
  };
};
