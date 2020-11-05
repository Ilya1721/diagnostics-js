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
  console.log(action.payload);
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
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
