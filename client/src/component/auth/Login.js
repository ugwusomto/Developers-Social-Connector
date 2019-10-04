import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroups from "../../commons/TextFieldGroups";
class Login extends Component {
  // construnctor
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  // onsubmit method
  onSubmit = e => {
    e.preventDefault();
    const newObj = { ...this.state };
    delete newObj.errors;
    this.props.loginUser(newObj);
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
    // redirect to the dashboard the initial time after login
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>

              {errors.message && (
                <p className="text-center text-danger">{errors.message}</p>
              )}

              <form onSubmit={this.onSubmit}>
                <TextFieldGroups
                  type="email"
                  placeholder="Email Address"
                  error={errors.email}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <TextFieldGroups
                  type="password"
                  placeholder="Password"
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
