import {
  GET_PROCEDURESTAT,
  PROCEDURESTAT_LOADING,
} from "../actions/procedureStat/procedureStatTypes";

const initialState = {
  procedureStat: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROCEDURESTAT:
      return {
        ...state,
        procedureStat: action.payload,
        loading: false,
      };
    case PROCEDURESTAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
