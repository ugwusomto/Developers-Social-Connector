import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroups from "../../commons/TextFieldGroups";

class Register extends Component {
  // construnctor
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      picture: "",
      password: "",

      errors: {}
    };
  }

  // onsubmit method
  onSubmit = e => {
    e.preventDefault();

    const newObj = { ...this.state };

    delete newObj.errors;

    this.props.registerUser(newObj, this.props.history);
  };

  // on change function
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    // redirect if the person is logged in
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register card mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroups
                  type="text"
                  placeholder="Fullname"
                  error={errors.fullname}
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.onChange}
                />

                <TextFieldGroups
                  type="email"
                  placeholder="email"
                  error={errors.email}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <TextFieldGroups
                  type="text"
                  placeholder="picture"
                  error={errors.picture}
                  name="picture"
                  value={this.state.picture}
                  onChange={this.onChange}
                />

                <TextFieldGroups
                  type="password"
                  placeholder="password"
                  error={errors.password}
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

// mapDispatchToProps = (dispatch) => {
//   return {}
// }

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
