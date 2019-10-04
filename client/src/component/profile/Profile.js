import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import ProfileItems from "./ProfileItems";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;

    if (profiles === null && loading) {
      profileItems = (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      if (profiles !== null && profiles.length > 0) {
        // profileItems = Object.values(profiles).map(profile => (
        //     <ProfileItems profile={Object.values(profile)} />
        // ))
        profileItems = profiles.map(profile => (
          <ProfileItems key={profile.id} profile={profile} />
        ));
        // console.log(Object.values(profiles));
      } else {
        profileItems = <h1>No profile found</h1>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,

  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profile);
