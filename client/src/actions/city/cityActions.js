import { GET_CITIES, ADD_CITY, DELETE_CITY, CITIES_LOADING } from "./cityTypes";
import axios from "axios";

export const getCities = () => (dispatch) => {
  //console.log("city actions call");
  dispatch(setCitiesLoading());
  axios.get("/api/cities").then((res) => {
    dispatch({
      type: GET_CITIES,
      payload: res.data,
    });
  });
};

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING,
  };
};
