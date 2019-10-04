import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logOutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogOutClick = e => {
    e.preventDefault();

    // This method logs out the user
    this.props.logOutUser();

    // This method clears the current profile
    this.props.clearCurrentProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mt-2">
          <Link
            to="/dashboard"
            style={{
              color: "#fff",
              marginRight: "20px",
              textDecoration: "none"
            }}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <button onClick={this.onLogOutClick}>
            <img
              src={user.picture}
              alt="Profile pics"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                marginRight: "5px",
                border: "none",
                backgroundColor: "#343a40",
                color: "#fff"
              }}
            />
            Logout
          </button>
        </li>
      </ul>
    );

    const geustLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : geustLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { logOutUser, clearCurrentProfile }
)(Navbar);
