import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/v1/user/register", userData)
    .then(response => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// action for login
export const loginUser = userData => dispatch => {
  axios
    .post("api/v1/user/login", userData)
    .then(response => {
      //  get the token
      const { token } = response.data;

      // set it to the local storage
      localStorage.setItem("jwtToken", token);

      // add the token to the authorization header
      setAuthToken(token);

      // Decode the token
      const decode = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decode));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// updates the current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout the current user
export const logOutUser = () => dispatch => {
  //  remove the localstorage token
  localStorage.removeItem("jwtToken");
  // remove the authorization header  for future requrst
  setAuthToken(false);
  // update the current user
  dispatch(setCurrentUser({}));
};
