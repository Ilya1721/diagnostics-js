import {
  GET_SYMPTOMSTAT,
  SYMPTOMSTAT_LOADING,
} from "../actions/symptomStat/symptomStatTypes";

const initialState = {
  symptomStat: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SYMPTOMSTAT:
      return {
        ...state,
        symptomStat: action.payload,
        loading: false,
      };
    case SYMPTOMSTAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
