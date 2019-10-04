import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import "./App.css";
import store from "./store";
import Navbar from "./component/Layout/Navbar";
import Footer from "./component/Layout/Footer";
import Landing from "./component/Layout/Landing";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Dashboard from "./component/dashboard/Dashboard";
import CreateProfile from "./component/create-profile/CreateProfile";
import EditProfile from "./component/edit-profile/EditProfile";
import AddExperience from "./component/add-credentials/AddExperience";
import AddEducation from "./component/add-credentials/AddEducation";
import Profile from "./component/profile/Profile";
import ProfileH from "./component/profilesection/Profile";

import PrivateRoute from "./commons/PrivateRoute";

// This keeps the user logged in in the application
if (localStorage["jwtToken"]) {
  // set auth header
  setAuthToken(localStorage.jwtToken);

  // Decode token  and get current user
  const decoded = jwt_decode(localStorage.jwtToken);

  // set the user reducer
  store.dispatch(setCurrentUser(decoded));

  // check if the token has expired
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logOutUser());

    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to the login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profile} />
          <Route exact path="/profile/:handle" component={ProfileH} />

          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
          <Route exact path="/" component={Landing} />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
