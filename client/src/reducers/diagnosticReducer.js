import {
  GET_DIAGNOSTICS,
  GENERATE_DIAGNOSTICS,
  ADD_DIAGNOSTIC,
  EDIT_DIAGNOSTIC,
  DELETE_DIAGNOSTIC,
  DIAGNOSTICS_LOADING,
} from "../actions/diagnostic/diagnosticTypes";

const initialState = {
  diagnostic: {
    diagnosis: [],
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
    case ADD_DIAGNOSTIC:
      return {
        ...state,
        innerData: [...state.innerData, action.payload],
        loading: false,
      };
    case EDIT_DIAGNOSTIC:
      const copy = state.innerData;
      const index = copy.findIndex(
        (item) => item.diagnos.id === action.payload.diagnos.id
      );
      copy[index] = action.payload;
      return {
        ...state,
        innerData: copy,
        loading: false,
      };
    case DELETE_DIAGNOSTIC:
      return {
        ...state,
        innerData: state.innerData.filter(
          (item) => item.diagnos.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
