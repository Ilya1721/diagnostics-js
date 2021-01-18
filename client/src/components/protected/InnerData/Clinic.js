import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClinic } from "../../../actions/clinic/clinicActions";
import { getDepartmentsById } from "../../../actions/department/departmentActions";
import { deleteDepartment } from "../../../actions/department/departmentActions";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Loading from "../../modals/Loading";

class Clinic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getClinic(id);
    this.props.getDepartmentsById(id);
  }

  onDelete = (id) => {
    this.props.deleteDepartment(id);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.clinic.loading !== this.props.clinic.loading) {
      this.setState({
        loading: this.props.clinic.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const clinic = this.props.clinic.clinics[0];
      const { departments } = this.props.department;
      return (
        <div className="container mt-3">
          <div className="card mt-3">
            <div className="row mt-2">
              <div className="col-2">
                <img
                  src={clinic.clinic_image}
                  alt=""
                  style={{ width: "125px", height: "150px" }}
                />
              </div>
              <div className="col-6">
                <h4>{clinic.clinic_name}</h4>
                <p>{clinic.clinic_type}</p>
              </div>
              <div className="col-2">
                <p>
                  {clinic.clinic_street}, {clinic.clinic_house},{" "}
                  {clinic.city_name}
                </p>
                <p>{clinic.clinic_phoneNumber}</p>
                <p>
                  Пн - Пт:{" "}
                  <span className="font-weight-bold">
                    {clinic.clinic_schedule}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <h2 className="text-center mt-3">Відділи</h2>
            <Link
              className="btn btn-primary text-right mr-2 mb-3"
              role="button"
              to={`/clinic/${clinic.clinic_id}/departments/create`}
            >
              Додати відділ
            </Link>
            <table className="table text-center table-light">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr key={department.id}>
                    <td>
                      <Link
                        to={`/departments/${department.id}/show`}
                        className="btn btn-link"
                      >
                        {department.name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="btn btn-primary text-right mr-2 mb-3"
                        role="button"
                        to={`/clinic/${clinic.clinic_id}/departments/${department.id}/edit`}
                      >
                        Редагувати
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger text-right mr-2 mb-3"
                        role="button"
                        type="button"
                        onClick={() => this.onDelete(department.id)}
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

Clinic.propTypes = {
  getClinic: PropTypes.func.isRequired,
  clinic: PropTypes.object.isRequired,
  department: PropTypes.object.isRequired,
  getDepartmentsById: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clinic: state.clinic,
  department: state.department,
});

export default withRouter(
  connect(mapStateToProps, { getClinic, getDepartmentsById, deleteDepartment })(
    Clinic
  )
);
