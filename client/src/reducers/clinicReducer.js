import {
  GET_CLINICS,
  ADD_CLINIC,
  EDIT_CLINIC,
  DELETE_CLINIC,
  CLINICS_LOADING,
} from "../actions/clinic/clinicTypes";

const initialState = {
  clinics: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLINICS:
      return {
        ...state,
        clinics: action.payload,
        loading: false,
      };
    case CLINICS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_CLINIC:
      return {
        ...state,
        clinics: [...state.clinics, action.payload],
        loading: false,
      };
    case EDIT_CLINIC:
      const copy = state.clinics;
      const index = copy.findIndex(
        (c) => c.clinic_id === action.payload.clinic_id
      );
      copy[index] = action.payload;
      return {
        ...state,
        clinics: copy,
        loading: false,
      };
    case DELETE_CLINIC:
      return {
        ...state,
        clinics: state.clinics.filter((c) => c.clinic_id !== action.payload),
      };
    default:
      return state;
  }
}
