import {
  GET_ROOMS,
  ADD_ROOM,
  DELETE_ROOM,
  ROOMS_LOADING,
} from "../actions/room/roomTypes";

const initialState = {
  rooms: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        loading: false,
      };
    case ROOMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
