import {
  GET_ROOMS,
  ADD_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
} from "../actions/room/roomTypes";

const initialState = {
  rooms: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        isLoading: false,
      };
    case ROOMS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
