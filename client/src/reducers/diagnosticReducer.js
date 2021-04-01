import {
  GET_DIAGNOSTICS,
  GENERATE_DIAGNOSTICS,
  ADD_DIAGNOSTIC,
  DELETE_DIAGNOSTIC,
  DIAGNOSTICS_LOADING,
} from "../actions/diagnostic/diagnosticTypes";

const initialState = {
  diagnostic: {
    diagnosis: [],
    unknownSymptoms: [],
  },
  innerData: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GENERATE_DIAGNOSTICS:
      return {
        ...state,
        diagnostic: action.payload,
        loading: false,
      };
    case GET_DIAGNOSTICS:
      return {
        ...state,
        innerData: action.payload,
        loading: false,
      };
    case DIAGNOSTICS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
