import { GET_JOBS, ADD_CITY, DELETE_CITY, JOBS_LOADING } from "./jobTypes";
import axios from "axios";

export const getJobs = () => (dispatch) => {
  dispatch(setJobsLoading());
  axios.get("/api/jobs").then((res) => {
    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  });
};

export const setJobsLoading = () => {
  return {
    type: JOBS_LOADING,
  };
};
