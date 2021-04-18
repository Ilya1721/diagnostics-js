import {
  GET_CITIES,
  ADD_CITY,
  DELETE_CITY,
  CITIES_LOADING,
} from "../actions/city/cityTypes";

const initialState = {
  cities: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false,
      };
    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
      };
    case CITIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
