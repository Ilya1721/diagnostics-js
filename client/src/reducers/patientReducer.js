import {
  GET_PATIENTS,
  ADD_PATIENT,
  DELETE_PATIENT,
  PATIENTS_LOADING,
  EDIT_PATIENT,
} from "../actions/patient/patientTypes";

const initialState = {
  patients: [],
  loading: false,
  createData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        loading: false,
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, ...action.payload],
        loading: false,
      };
    case EDIT_PATIENT:
      const copy = state.patients;
      const index = copy.findIndex((p) => p.id === action.payload.id);
      copy[index] = action.payload;
      return {
        ...state,
        patients: copy,
        loading: false,
      };
    case PATIENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
