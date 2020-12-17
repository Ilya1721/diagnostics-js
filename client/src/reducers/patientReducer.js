import {
  GET_PATIENTS,
  ADD_PATIENT,
  DELETE_PATIENT,
  PATIENTS_LOADING,
  GET_PATIENT,
  EDIT_PATIENT,
} from "../actions/patient/patientTypes";

const initialState = {
  patients: [],
  patient: {},
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
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
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
