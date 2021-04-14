import {
  GET_MEDICAMENTS,
  ADD_MEDICAMENT,
  MEDICAMENTS_LOADING,
} from "../actions/medicament/medicamentTypes";

const initialState = {
  medicaments: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEDICAMENTS:
      return {
        ...state,
        medicaments: action.payload,
        loading: false,
      };
    case MEDICAMENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_MEDICAMENT:
      return {
        ...state,
        medicaments: [...state.medicaments, action.payload],
        loading: false,
      };
    default:
      return state;
  }
}
