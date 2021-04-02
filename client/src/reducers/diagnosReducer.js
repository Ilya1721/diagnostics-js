import {
  GET_DIAGNOSIS,
  ADD_DIAGNOS,
  DELETE_DIAGNOS,
  DIAGNOSIS_LOADING,
} from "../actions/diagnos/diagnosTypes";

const initialState = {
  diagnosis: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DIAGNOSIS:
      return {
        ...state,
        diagnosis: action.payload,
        loading: false,
      };
    case DIAGNOSIS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_DIAGNOS:
      return {
        ...state,
        diagnosis: [...state.diagnosis, action.payload],
        loading: false,
      };
    default:
      return state;
  }
}
