import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

// This function gets a specific user
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/v1/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// This function sets the profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// This function clears the profile object
// This is called when the user logs out
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// This method is called whe a customer is trying to create a profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("api/v1/profile", profileData)
    .then(response => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// This method is called whe a customer is trying to delete a profile
export const deleteAction = () => dispatch => {
  if (window.confirm("Are you sure you want to delete this account")) {
    axios
      .delete("api/v1/profile")
      .then(response =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

// This method is used to add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("api/v1/profile/experience", expData)
    .then(response => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// This method is used to add experience
export const addEducation = (expData, history) => dispatch => {
  axios
    .post("api/v1/profile/education", expData)
    .then(response => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// This method is used to delete on  experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`api/v1/profile/experience/${id}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// This method is used to delete on  experience
export const deleteEducation = id => dispatch => {
  axios
    .delete(`api/v1/profile/education/${id}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// This function gets all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/v1/profile/all")
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// This function gets a specific user profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  console.log("all the way");
  axios
    .get("api/v1/" + handle)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};
