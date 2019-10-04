import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../utils/is-empty";

class ProfileItems extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img className="rounded-circle" src={profile.user.picture} alt="" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.fullname}</h3>
            <p>
              {profile.status}
              {isEmpty(profile.company) ? null : ` at ${profile.company}`}
            </p>
            <p>{isEmpty(profile.location) ? null : `  ${profile.location}`}</p>
            {/* <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link> */}
          </div>
          <div className="col-md-4  d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.split(",").map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1"></i>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItems;
