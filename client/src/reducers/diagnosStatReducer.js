import {
  GET_DIAGNOSSTAT,
  DIAGNOSSTAT_LOADING,
} from "../actions/diagnosStat/diagnosStatTypes";

const initialState = {
  diagnosStat: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DIAGNOSSTAT:
      return {
        ...state,
        diagnosStat: action.payload,
        loading: false,
      };
    case DIAGNOSSTAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
