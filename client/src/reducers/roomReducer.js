import {
  GET_ROOMS,
  ADD_ROOM,
  EDIT_ROOM,
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
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        loading: false,
      };
    case EDIT_ROOM:
      const copy = state.rooms;
      const index = copy.findIndex((r) => r.id === action.payload.id);
      copy[index] = action.payload;
      return {
        ...state,
        rooms: copy,
        loading: false,
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((r) => r.id !== action.payload),
      };
    default:
      return state;
  }
}
