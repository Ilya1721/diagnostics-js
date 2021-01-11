import {
  GET_ROOMSTAT,
  ROOMSTAT_LOADING,
} from "../actions/roomStat/roomStatTypes";

const initialState = {
  roomStat: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROOMSTAT:
      return {
        ...state,
        roomStat: action.payload,
        loading: false,
      };
    case ROOMSTAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
