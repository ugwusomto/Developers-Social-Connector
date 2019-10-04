import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };

  render() {
    console.log();

    const experience = Object.values(this.props.experience).map(
      (exp, index) => (
        <tr key={exp.id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            {exp.from} - {exp.current ? "Now" : exp.to}
          </td>
          <td>
            <button
              onClick={() => this.onDeleteClick(exp.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      )
    );
    return (
      <div>
        <h4>Experience Credentials</h4>
        <table className="table">
          <thead>
            <th>Company</th>
            <th>Title</th>
            <th>Year</th>
            <th></th>
          </thead>

          {experience}
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  // profile: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    //   errors: state.errors,
    //   profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { deleteExperience }
)(Experience);
