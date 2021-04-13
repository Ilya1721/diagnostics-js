import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getPatients,
  findPatients,
} from "../../../actions/patient/patientActions";
import { addLink } from "../../../actions/navigation/navigationActions";
import Loading from "../../modals/Loading";

class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      search: "",
      category: "",
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getPatients(user);
    this.props.addLink({
      path: window.location.pathname,
      name: "Пацієнти",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.patient.loading !== this.props.patient.loading) {
      this.setState({
        loading: this.props.patient.loading,
        category: "p.last_name",
      });
    }
  }

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  search = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { category, search } = this.state;
    this.props.findPatients({ category, search }, user);
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
              <form onSubmit={this.search} className="form-inline">
                <div className="input-group">
                  <select
                    name="category"
                    onChange={this.onBaseInputChange}
                    className="form-control w-25"
                  >
                    <option value="p.last_name">Прізвище</option>
                    <option value="p.first_name">Ім'я</option>
                    <option value="p.father_name">По-батькові</option>
                    <option value="p.street">Вулиця</option>
                    <option value="p.id">Номер картки</option>
                  </select>
                  <input
                    id="search"
                    name="search"
                    className="form-control w-50 input-group-append"
                    value={this.state.search}
                    onChange={this.onBaseInputChange}
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
                      Картка пацієнта
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
  findPatients: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  patient: state.patient,
});

export default connect(mapStateToProps, { getPatients, findPatients, addLink })(
  Patients
);
