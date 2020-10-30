import {
  GET_CITIES,
  ADD_CITY,
  DELETE_CITY,
  CITIES_LOADING,
} from "../actions/city/cityTypes";

const initialState = {
  cities: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case CITIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
