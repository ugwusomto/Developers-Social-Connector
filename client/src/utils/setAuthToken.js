import axios from "axios";
const setAuthToken = token => {
  //  check if the token exist
  if (token) {
    // set default header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete the token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
