import {
  GET_ROOMS,
  ADD_ROOM,
  EDIT_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
} from "./roomTypes";
import axios from "axios";

export const getRooms = () => (dispatch) => {
  dispatch(setRoomsLoading());
  axios.get("/api/rooms").then((res) => {
    dispatch({
      type: GET_ROOMS,
      payload: res.data,
    });
  });
};

export const getRoomsById = (id) => (dispatch) => {
  dispatch(setRoomsLoading());
  axios.get(`/api/rooms/ofDepartment/${id}`).then((res) => {
    dispatch({
      type: GET_ROOMS,
      payload: res.data,
    });
  });
};

export const getRoom = (id) => (dispatch) => {
  dispatch(setRoomsLoading());
  axios.get(`/api/rooms/${id}`).then((res) => {
    dispatch({
      type: GET_ROOMS,
      payload: res.data,
    });
  });
};

export const addRoom = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setRoomsLoading());
  axios
    .post(`/api/rooms/ofDepartment/${data.departmentId}`, body, config)
    .then((res) => {
      dispatch({
        type: ADD_ROOM,
        payload: res.data,
      });
    });
};

export const deleteRoom = (id) => (dispatch) => {
  axios.delete(`/api/rooms/${id}`).then((res) => {
    dispatch({
      type: DELETE_ROOM,
      payload: id,
    });
  });
};

export const editRoom = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch(setRoomsLoading());
  axios.put(`/api/rooms/${data.id}`, body, config).then((res) => {
    dispatch({
      type: EDIT_ROOM,
      payload: res.data,
    });
  });
};

export const setRoomsLoading = () => {
  return {
    type: ROOMS_LOADING,
  };
};
