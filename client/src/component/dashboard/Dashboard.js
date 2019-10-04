import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAction } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import ProfileAction from "./ProfileAction";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    e.preventDefault();
    this.props.deleteAction();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null && loading) {
      dashboardContent = (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      //  check if the user already has a profile
      if (profile != null && Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.handle} `}>{user.fullname}</Link>
            </p>
            <ProfileAction />
            {profile.experience !== null ? (
              <Experience experience={profile.experience} />
            ) : (
              ""
            )}
            {profile.education !== null ? (
              <Education education={profile.education} />
            ) : (
              ""
            )}

            {/*  */}
            <div className={{ marginBottom: "60px" }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.fullname}</p>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="display-4">Dashboard</h4>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAction }
)(Dashboard);
