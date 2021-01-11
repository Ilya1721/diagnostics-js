import { GET_ROOMSTAT, ROOMSTAT_LOADING } from "./roomStatTypes";
import axios from "axios";

export const getRoomStat = () => (dispatch) => {
  dispatch(setRoomStatLoading());
  axios.get("/api/roomstat").then((res) => {
    dispatch({
      type: GET_ROOMSTAT,
      payload: res.data,
    });
  });
};

export const setRoomStatLoading = () => {
  return {
    type: ROOMSTAT_LOADING,
  };
};
