import {
  GET_MEDICAMENTSTAT,
  MEDICAMENTSTAT_LOADING,
} from "../actions/medicamentStat/medicamentStatTypes";

const initialState = {
  medicamentStat: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEDICAMENTSTAT:
      return {
        ...state,
        medicamentStat: action.payload,
        loading: false,
      };
    case MEDICAMENTSTAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
