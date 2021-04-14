import {
  GET_TREATMENTS,
  ADD_TREATMENT,
  TREATMENTS_LOADING,
} from "../actions/treatment/treatmentTypes";

const initialState = {
  treatments: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TREATMENTS:
      return {
        ...state,
        treatments: action.payload,
        loading: false,
      };
    case TREATMENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_TREATMENT:
      return {
        ...state,
        treatments: [...state.treatments, action.payload],
        loading: false,
      };
    default:
      return state;
  }
}
