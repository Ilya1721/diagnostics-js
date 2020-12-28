import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPatients } from "../../../actions/patient/patientActions";
import Loading from "../../modals/Loading";

class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getPatients(user);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.patient.loading !== this.props.patient.loading) {
      this.setState({
        loading: this.props.patient.loading,
      });
    }
  }

  findPatient = (e) => {
    const { user } = this.props.auth;
    e.preventDefault();
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { user } = this.props.auth;
      const { patients } = this.props.patient;

      return (
        <div className="container">
          <h3 className="text-center">Пацієнти</h3>
          <div className="row w-100">
            <div className="col-4"></div>
            <div className="col-6 my-3">
              <form
                onSubmit={this.findPatient}
                method="GET"
                className="form-inline"
              >
                <div className="input-group">
                  <select name="category" className="form-control w-25">
                    <option value="patients.last_name">Прізвище</option>
                    <option value="patients.first_name">Ім'я</option>
                    <option value="patients.father_name">По-батькові</option>
                    <option value="patients.street">Вулиця</option>
                    <option value="presences.id">Номер картки</option>
                  </select>
                  <input
                    id="search"
                    name="search"
                    className="form-control w-50 input-group-append"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-success" type="submit">
                      Find<span className="glyphicon glyphicon-search"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-primary text-right mr-2 mb-3"
                role="button"
                to="/patients/create"
              >
                Зареєструвати пацієнта
              </Link>
            </div>
          </div>
          <table className="table table-light">
            <thead className="thead-dark">
              <tr>
                <th scope="col">№ картки</th>
                <th scope="col">Прізвище</th>
                <th scope="col">Ім'я</th>
                <th scope="col">По-батькові</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.fatherName}</td>
                  <td>
                    <Link
                      to={`/patients/${patient.id}/show`}
                      className="btn btn-primary"
                    >
                      Детальніше
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

Patients.propTypes = {
  auth: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  getPatients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  patient: state.patient,
});

export default connect(mapStateToProps, { getPatients })(Patients);
