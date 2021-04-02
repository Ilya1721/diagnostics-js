import {
  GET_SYMPTOMS,
  ADD_SYMPTOM,
  DELETE_SYMPTOM,
  SYMPTOMS_LOADING,
} from "../actions/symptom/symptomTypes";

const initialState = {
  symptoms: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SYMPTOMS:
      return {
        ...state,
        symptoms: action.payload,
        loading: false,
      };
    case SYMPTOMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_SYMPTOM:
      return {
        ...state,
        symptoms: [...state.symptoms, action.payload],
        loading: false,
      };
    default:
      return state;
  }
}
