import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  editDepartment,
  getDepartment,
} from "../../../actions/department/departmentActions";
import Loading from "../../modals/Loading";

class DepartmentEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      loading: true,
      department: {
        id: "",
        name: "",
        clinicId: "",
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

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getDepartment(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.department.loading !== this.props.department.loading) {
      const { name, clinic_id, id } = this.props.department.departments[0];
      this.setState({
        ...this.state,
        loading: false,
        department: {
          name,
          id,
          clinicId: clinic_id,
        },
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editDepartment(this.state.department);
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
    if (this.state.loading) {
      return <Loading />;
    } else {
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
}

DepartmentEditForm.propTypes = {
  getDepartment: PropTypes.func.isRequired,
  editDepartment: PropTypes.func.isRequired,
  department: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
});

export default withRouter(
  connect(mapStateToProps, { getDepartment, editDepartment })(
    DepartmentEditForm
  )
);
