import {
  GET_TREATMENTSTAT,
  TREATMENTSTAT_LOADING,
} from "../actions/treatmentStat/treatmentStatTypes";

const initialState = {
  treatmentStat: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TREATMENTSTAT:
      return {
        ...state,
        treatmentStat: action.payload,
        loading: false,
      };
    case TREATMENTSTAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
