import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EMPLOYEES_LOADING,
} from "../actions/employee/employeeTypes";

const initialState = {
  employees: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
