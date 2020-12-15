import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from "./userTypes";
import axios from "axios";

export const getUsers = () => (dispatch) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users", {
      params: {
        job: "5f8d9c1d26cef4e6e292545a",
      },
    })
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    });
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
