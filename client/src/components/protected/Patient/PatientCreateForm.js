import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getCities } from "../../../actions/city/cityActions";
import { createPatient } from "../../../actions/patient/patientActions";

class PatientCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {
        firstName: "",
        lastName: "",
        fatherName: "",
        city: undefined,
        doctor: undefined,
        street: "",
        house: "",
        flat: "",
        phoneNumber: "",
      },
      isComplete: false,
    };
  }

  componentDidMount() {
    this.props.getCities();
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.props.city;
    if (prevProps.city.loading !== loading && !loading) {
      this.setState({
        ...this.state,
        patient: {
          ...this.state.patient,
          doctor: this.props.auth.user.id,
          city: this.props.city.cities[0].id,
        },
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createPatient(this.state.patient);
    this.setState({
      ...this.state,
      isComplete: true,
    });
  };

  redirect = () => {
    if (this.props.patient !== undefined) {
      const { loading } = this.props.patient;
      const { isComplete } = this.state;
      if (!loading && isComplete) {
        return <Redirect to="/patients" />;
      }
    }
  };

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      patient: {
        ...this.state.patient,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const {
      firstName,
      lastName,
      fatherName,
      city,
      street,
      house,
      flat,
      phoneNumber,
    } = this.state.patient;
    const { cities } = this.props.city;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Зареєструвати нового пацієнта</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="lastName"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Прізвище
                    </label>

                    <div className="col-md-6">
                      <input
                        id="lastName"
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={lastName}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="lastName"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="firstName"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Ім'я
                    </label>

                    <div className="col-md-6">
                      <input
                        id="firstName"
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={firstName}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="firstName"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="fatherName"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      По-батькові
                    </label>

                    <div className="col-md-6">
                      <input
                        id="fatherName"
                        type="text"
                        className="form-control"
                        name="fatherName"
                        value={fatherName}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="fatherName"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="city"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Місто
                    </label>
                    <div className="col-md-6">
                      <select
                        id="city"
                        className="form-control"
                        name="city"
                        onChange={this.onBaseInputChange}
                        required
                        autoFocus
                      >
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="street"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Вулиця
                    </label>

                    <div className="col-md-6">
                      <input
                        id="street"
                        type="text"
                        className="form-control"
                        name="street"
                        value={street}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="street"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="house"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Будинок
                    </label>

                    <div className="col-md-6">
                      <input
                        id="house"
                        type="text"
                        className="form-control"
                        name="house"
                        value={house}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="house"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="flat"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Номер квартири
                    </label>

                    <div className="col-md-6">
                      <input
                        id="flat"
                        type="text"
                        className="form-control"
                        name="flat"
                        value={flat}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="flat"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="phoneNumber"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Номер телефону
                    </label>

                    <div className="col-md-6">
                      <input
                        id="phoneNumber"
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={this.onBaseInputChange}
                        required
                        autoComplete="phoneNumber"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Зареєструвати
                      </button>
                      <Link
                        to="/patients"
                        className="btn btn-danger"
                        role="button"
                      >
                        Відмінити
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

PatientCreateForm.propTypes = {
  getCities: PropTypes.func.isRequired,
  createPatient: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  auth: state.auth,
  patient: state.patient,
});

export default connect(mapStateToProps, { getCities, createPatient })(
  PatientCreateForm
);
