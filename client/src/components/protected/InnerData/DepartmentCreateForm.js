import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addDepartment } from "../../../actions/department/departmentActions";
import Loading from "../../modals/Loading";

class DepartmentCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      department: {
        name: "",
        clinicId: this.props.match.params.id,
      },
    };
  }

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      department: {
        ...this.state.department,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addDepartment(this.state.department);
    this.setState({
      ...this.state,
      isComplete: true,
    });
  };

  redirect = () => {
    if (this.state.isComplete) {
      return <Redirect to={`/clinics/${this.state.department.clinicId}`} />;
    }
  };

  render() {
    const { clinicId, name } = this.state.department;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Додати відділ</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Назва
                    </label>

                    <div className="col-md-6">
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="name"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Register
                      </button>
                      <Link
                        to={`/clinics/${clinicId}`}
                        className="btn btn-danger"
                        role="button"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                  {this.redirect()}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DepartmentCreateForm.propTypes = {
  addDepartment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default withRouter(
  connect(mapStateToProps, { addDepartment })(DepartmentCreateForm)
);
