import {
  GET_JOBS,
  ADD_JOB,
  DELETE_JOB,
  JOBS_LOADING,
} from "../actions/job/jobTypes";

const initialState = {
  jobs: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        isLoading: false,
      };
    case JOBS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
