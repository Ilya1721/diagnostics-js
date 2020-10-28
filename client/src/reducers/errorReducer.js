import { GET_ERRORS, CLEAR_ERRORS } from "../actions/error/errorTypes";

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action) {
    case GET_ERRORS:
      return {
        msg: action.payload,
        status: action.status,
        id: action.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
