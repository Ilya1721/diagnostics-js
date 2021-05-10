import {
  GET_VISITS,
  ADD_VISIT,
  DELETE_VISIT,
  VISITS_LOADING,
} from "../actions/visit/visitTypes";

const initialState = {
  visits: [],
  loading: false,
  createData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VISITS:
      return {
        ...state,
        visits: action.payload,
        loading: false,
      };
    case ADD_VISIT:
      return {
        ...state,
        loading: false,
      };
    case VISITS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
