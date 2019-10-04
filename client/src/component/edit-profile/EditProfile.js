import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import PropTypes from "prop-types";
import TextFieldGroups from "../../commons/TextFieldGroups";
import InputGroup from "../../commons/InputGroup";
import TextAreaFieldGroup from "../../commons/TextAreaFieldGroup";
import SelectListGroup from "../../commons/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../utils/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      skills: "",
      handle: "",
      company: "",
      location: "",
      status: "",
      bio: "",
      githubusername: "",
      youtube: null,
      twitter: null,
      facebook: null,
      linkedin: null,
      instagram: null,
      website: null,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  // This ccomponent updates the errors in the state
  componentWillReceiveProps(nextProps) {
    // updates the errors in the state
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // This is where the profile edit  form will updated
    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;

      // set the profile object

      //   profileFields.social = {};
      if (profile.social) {
        this.setState({
          displaySocialInputs: true
        });
      }
      // collect all the details
      profile.social = isEmpty(profile.social) ? {} : profile.social;
      profile.website = isEmpty(profile.website) ? null : profile.website;
      profile.handle = isEmpty(profile.handle) ? "" : profile.handle;
      profile.company = isEmpty(profile.company) ? "" : profile.company;
      profile.location = isEmpty(profile.location) ? "" : profile.location;
      profile.status = isEmpty(profile.status) ? "" : profile.status;
      profile.bio = isEmpty(profile.bio) ? "" : profile.bio;
      profile.skills = isEmpty(profile.skills) ? "" : profile.skills;
      profile.githubusername = isEmpty(profile.githubusername)
        ? ""
        : profile.githubusername;
      profile.social.youtube = isEmpty(profile.social.youtube)
        ? null
        : profile.social.youtube;
      profile.social.linkedin = isEmpty(profile.social.linkedin)
        ? null
        : profile.social.linkedin;
      profile.social.twitter = isEmpty(profile.social.twitter)
        ? null
        : profile.social.twitter;
      profile.social.instagram = isEmpty(profile.social.instagram)
        ? null
        : profile.social.instagram;
      profile.social.facebook = isEmpty(profile.social.facebook)
        ? null
        : profile.social.facebook;

      this.setState({
        skills: profile.skills,
        handle: profile.handle,
        company: profile.company,
        location: profile.location,
        status: profile.status,
        bio: profile.bio,
        githubusername: profile.githubusername,
        youtube: profile.social.youtube,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        instagram: profile.social.instagram,
        website: profile.social.website
      });
    }
  }

  // onsubmit method
  onSubmit = e => {
    e.preventDefault();
    const newObj = { ...this.state };
    delete newObj.errors;
    this.props.createProfile(newObj, this.props.history);
  };

  // on change function
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    const options = [
      { value: "0", label: "* Select Professional Status" },
      { value: "Developer", label: "Developer" },
      { value: "Junior Developer", label: "Junior Developer" },
      { value: "Senior Developer", label: "Senior Developer" },
      { value: "Manager", label: "Manager" },
      { value: "Student or Learning", label: "Student or Learning" },
      { value: "Instructor", label: "Instructor or Teacher" },
      { value: "Intern", label: "Intern" },
      { value: "Other", label: "Other" }
    ];

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile Url"
            error={errors.twitter}
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            icon="fa fa-twitter"
          />

          <InputGroup
            placeholder="instagram Profile Url"
            error={errors.instagram}
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            icon="fa fa-instagram"
          />

          <InputGroup
            placeholder="facebook Profile Url"
            error={errors.facebook}
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            icon="fa fa-facebook"
          />
          <InputGroup
            placeholder="linkedin Profile Url"
            error={errors.linkedin}
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            icon="fa fa-linkedin"
          />
          <InputGroup
            placeholder="youtube Profile Url"
            error={errors.youtube}
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            icon="fa fa-youtube"
          />
        </div>
      );
    }

    return (
      <div class="create-profile">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <Link to="/dashboard" class="btn btn-light">
                Go Back
              </Link>
              <h1 class="display-4 text-center">Edit Your Profile</h1>

              <small class="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroups
                  placeholder="handle *"
                  error={errors.handle}
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  info="This handle is unique for your profile url"
                />

                <SelectListGroup
                  options={options}
                  error={errors.status}
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  info="Your career level"
                />

                <TextFieldGroups
                  placeholder="company"
                  error={errors.company}
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  info="your company or the one you worked for"
                />

                <TextFieldGroups
                  placeholder="website"
                  error={errors.website}
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  info="your website or company own"
                />

                <TextFieldGroups
                  placeholder="location"
                  error={errors.location}
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  info="city or city and state (eg Enugu , Nsk)"
                />

                <TextFieldGroups
                  placeholder="skills"
                  error={errors.skills}
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  info="Please use comma seperated values (eg html,php,js)"
                />

                <TextFieldGroups
                  placeholder="githubusername"
                  error={errors.githubusername}
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  info="if you want latest repo and a github link include your username"
                />

                <TextAreaFieldGroup
                  placeholder="bio"
                  error={errors.bio}
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  info="tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}
                <input
                  type="submit"
                  value="submit"
                  class="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
