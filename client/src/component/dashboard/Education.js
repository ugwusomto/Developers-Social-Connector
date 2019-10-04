import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  render() {
    console.log();

    const education = Object.values(this.props.education).map(edu => (
      <tr key={edu.id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {edu.from} - {edu.current ? "Now" : edu.to}
        </td>
        <td>
          <button
            onClick={() => this.onDeleteClick(edu.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4>Education Credentials</h4>
        <table className="table">
          <thead>
            <th>School</th>
            <th>Degree</th>
            <th>Year</th>
            <th></th>
          </thead>

          {education}
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  // profile: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    //   errors: state.errors,
    //   profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { deleteEducation }
)(Education);
