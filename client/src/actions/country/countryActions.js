import {
  GET_COUNTRIES,
  ADD_COUNTRY,
  DELETE_COUNTRY,
  COUNTRIES_LOADING,
} from "./countryTypes";
import axios from "axios";

export const getCountries = () => (dispatch) => {
  dispatch(setCountriesLoading());
  axios.get("/api/countries").then((res) => {
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data,
    });
  });
};

export const setCountriesLoading = () => {
  return {
    type: COUNTRIES_LOADING,
  };
};
