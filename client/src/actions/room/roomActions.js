import { GET_ROOMS, ADD_ROOM, DELETE_ROOM, ROOMS_LOADING } from "./roomTypes";
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

export const setRoomsLoading = () => {
  return {
    type: ROOMS_LOADING,
  };
};
