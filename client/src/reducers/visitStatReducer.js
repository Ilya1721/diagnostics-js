import {
  GET_VISITSTAT,
  VISITSTAT_LOADING,
} from "../actions/visitStat/visitStatTypes";

const initialState = {
  visitStat: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VISITSTAT:
      return {
        ...state,
        visitStat: action.payload,
        loading: false,
      };
    case VISITSTAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
