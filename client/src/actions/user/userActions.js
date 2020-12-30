import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from "./userTypes";
import { GET_ERRORS } from "../error/errorTypes";
import { returnErrors } from "../error/errorActions";
import axios from "axios";

export const getUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_USERS ERROR")
      );
    });
};

export const getUser = (id) => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get(`/api/users/${id}`)
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_USER ERROR")
      );
    });
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};

export const editUser = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);

  dispatch(setUsersLoading());
  axios
    .put(`/api/users/${data.id}`, body, config)
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDIT_USER ERROR")
      );
    });
};
