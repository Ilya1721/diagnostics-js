import { GET_CITIES, ADD_CITY, DELETE_CITY, CITIES_LOADING } from "./cityTypes";
import axios from "axios";

export const getCities = () => (dispatch) => {
  dispatch(setCitiesLoading());
  axios.get("/api/cities").then((res) => {
    dispatch({
      type: GET_CITIES,
      payload: res.data,
    });
  });
};

export const addCity = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setCitiesLoading());
  axios.post("/api/cities", body, config).then((res) => {
    dispatch({
      type: ADD_CITY,
      payload: res.data,
    });
  });
};

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING,
  };
};
