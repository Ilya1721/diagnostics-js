import {
  USER_LOADED,
  USER_LOADING,
  USER_UNLOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_FORM,
} from "../actions/auth/authTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isWrongCredentials: false,
  isLoading: false,
  user: {},
  registerData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case USER_UNLOADED:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isWrongCredentials: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isWrongCredentials: true,
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case REGISTER_FORM:
      return {
        ...state,
        registerData: action.payload,
      };
    default:
      return state;
  }
}
