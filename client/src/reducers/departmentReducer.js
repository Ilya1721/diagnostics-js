import {
  GET_DEPARTMENTS,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  DELETE_DEPARTMENT,
  DEPARTMENTS_LOADING,
} from "../actions/department/departmentTypes";

const initialState = {
  departments: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
        loading: false,
      };
    case DEPARTMENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, action.payload],
        loading: false,
      };
    case EDIT_DEPARTMENT:
      const copy = state.departments;
      const index = copy.findIndex((d) => d.id === action.payload.id);
      copy[index] = action.payload;
      return {
        ...state,
        departments: copy,
        loading: false,
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter((d) => d.id !== action.payload),
      };
    default:
      return state;
  }
}
