import {
  USER_LOADED,
  USER_LOADING,
  USER_UNLOADED,
  USER_EDIT,
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
  loading: false,
  user: {},
  registerData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      console.log("user loading");
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case USER_EDIT:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        loading: false,
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
        loading: false,
        isWrongCredentials: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
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
        loading: false,
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
