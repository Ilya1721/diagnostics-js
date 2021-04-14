import {
  GET_PROCEDURES,
  ADD_PROCEDURE,
  PROCEDURES_LOADING,
} from "../actions/procedure/procedureTypes";

const initialState = {
  procedures: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROCEDURES:
      return {
        ...state,
        procedures: action.payload,
        loading: false,
      };
    case PROCEDURES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_PROCEDURE:
      return {
        ...state,
        procedures: [...state.procedures, action.payload],
        loading: false,
      };
    default:
      return state;
  }
}
