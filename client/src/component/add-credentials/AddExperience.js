import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroups from "../../commons/TextFieldGroups";
import TextAreaFieldGroup from "../../commons/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: {}
    };
  }

  // This ccomponent updates the errors in the state
  componentWillReceiveProps(nextProps) {
    // updates the errors in the state
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // onsubmit method
  onSubmit = e => {
    e.preventDefault();
    const newObj = { ...this.state };
    delete newObj.errors;
    this.props.addExperience(newObj, this.props.history);
  };

  // on change function
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // This method is called when checked
  onCheck = () => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroups
                  placeholder="Company"
                  error={errors.company}
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                />

                <TextFieldGroups
                  placeholder="title"
                  error={errors.title}
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <TextFieldGroups
                  placeholder="location"
                  error={errors.location}
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <h6>from date</h6>
                <TextFieldGroups
                  type="date"
                  error={errors.from}
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                />
                <h6>to date</h6>
                <TextFieldGroups
                  type="date"
                  error={errors.to}
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label className="form-check-label" for="current">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="description"
                  error={errors.description}
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="tell us a little about your position"
                />

                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4 "
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
