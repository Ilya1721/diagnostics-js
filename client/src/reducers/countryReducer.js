import {
  GET_COUNTRIES,
  ADD_COUNTRY,
  DELETE_COUNTRY,
  COUNTRIES_LOADING,
} from "../actions/country/countryTypes";

const initialState = {
  countries: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        isLoading: false,
      };
    case ADD_COUNTRY:
      return {
        ...state,
        countries: [...state.countries, action.payload],
        isLoading: false,
      };
    case COUNTRIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
