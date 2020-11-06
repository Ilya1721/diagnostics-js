import {
  GET_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  DEPARTMENTS_LOADING,
} from "../actions/department/departmentTypes";

const initialState = {
  departments: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
        isLoading: false,
      };
    case DEPARTMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
