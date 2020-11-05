import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth/authActions";
import { getCities } from "../../actions/city/cityActions";
import { getCountries } from "../../actions/country/countryActions";
import { getClinics } from "../../actions/clinic/clinicActions";
import PropTypes from "prop-types";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        login: "",
        email: "",
        password: "",
        passwordConfirm: "",
        lastName: "",
        firstName: "",
        fatherName: "",
        about: "",
        city: "",
        country: "",
        street: "",
        house: "",
        flat: "",
        phoneNumber: "",
        clinic: "",
        job: "",
        department: "",
        image: "",
      },
      countries: [],
      cities: [],
      clinics: [],
      msg: null,
    };
  }

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  onCountryChange = (e) => {
    const { cities } = this.props.city;
    const { clinics } = this.props.clinic;
    const updatedCities = cities.filter(
      (city) => city.country_id === e.target.value
    );
    const updatedClinics = clinics.filter(
      (clinic) => clinic.city_id === updatedCities[0].city_id
    );
    this.setState({
      ...this.state,
      cities: updatedCities,
      clinics: updatedClinics,
      user: {
        ...this.state.user,
        country: e.target.value,
      },
    });
  };

  onCityChange = (e) => {
    console.log("on city change");
    const { clinics } = this.props.clinic;
    const updatedClinics = clinics.filter(
      (clinic) => clinic.city_id === e.target.value
    );
    this.setState({
      ...this.state,
      clinics: updatedClinics,
      user: {
        ...this.state.user,
        clinic: e.target.value,
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  componentDidMount() {
    this.props.getCities();
    this.props.getCountries();
    this.props.getClinics();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { cities, isLoading } = this.props.city;
      const { countries } = this.props.country;
      const { clinics } = this.props.clinic;
      const defaultCountries = countries;
      const defaultCities = cities.filter(
        (city) => city.country_id === defaultCountries[0].id
      );
      const defaultClinics = clinics.filter(
        (clinic) => clinic.city_id === defaultCities[0].city_id
      );
      this.setState({
        ...this.state,
        countries: defaultCountries,
        cities: defaultCities,
        clinics: defaultClinics,
      });
    }
  }

  render() {
    const { cities, countries, clinics } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Register</div>

              <div className="card-body">
                <form
                  method="POST"
                  onSubmit={this.onSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group row">
                    <label
                      htmlFor="login"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Login
                    </label>

                    <div className="col-md-6">
                      <input
                        id="login"
                        type="text"
                        className="form-control"
                        name="login"
                        required
                        autoComplete="login"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.login}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      E-Mail Address
                    </label>

                    <div className="col-md-6">
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        required
                        autoComplete="email"
                        onChange={this.onBaseInputChange}
                        value={this.state.email}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Password
                    </label>

                    <div className="col-md-6">
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        autoComplete="new-password"
                        onChange={this.onBaseInputChange}
                        value={this.state.password}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="passwordConfirm"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Confirm Password
                    </label>

                    <div className="col-md-6">
                      <input
                        id="passwordConfirm"
                        type="password"
                        className="form-control"
                        name="passwordConfirm"
                        required
                        autoComplete="new-password"
                        onChange={this.onBaseInputChange}
                        value={this.state.passwordConfirm}
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

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
                        required
                        autoComplete="lastName"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.lastName}
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
                        required
                        autoComplete="firstName"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.firstName}
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
                        required
                        autoComplete="fatherName"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.fatherName}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="about"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Про себе
                    </label>

                    <div className="col-md-6">
                      <textarea
                        id="about"
                        type="text"
                        className="form-control"
                        name="about"
                        autoComplete="about"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.about}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="country"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Країна
                    </label>
                    <div className="col-md-6">
                      <select
                        id="country"
                        className="form-control"
                        name="country"
                        required
                        autoFocus
                        onChange={this.onCountryChange}
                        value={this.state.country}
                      >
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
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
                        required
                        autoFocus
                        onChange={this.onCityChange}
                        value={this.state.city}
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
                        required
                        autoComplete="street"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.street}
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
                        required
                        autoComplete="house"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.house}
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
                        required
                        autoComplete="flat"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.flat}
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
                        required
                        autoComplete="phoneNumber"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.phoneNumber}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="clinic"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Клініка
                    </label>
                    <div className="col-md-6">
                      <select
                        id="clinic"
                        className="form-control"
                        name="clinic"
                        required
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.clinic}
                      >
                        {clinics.map((clinic) => (
                          <option
                            key={clinic.clinic_id}
                            value={clinic.clinic_id}
                          >
                            {clinic.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="job"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Посада
                    </label>

                    <div className="col-md-6">
                      <input
                        id="job"
                        type="text"
                        className="form-control"
                        name="job"
                        required
                        autoComplete="job"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.job}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="department"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Відділ
                    </label>

                    <div className="col-md-6">
                      <input
                        id="department"
                        type="text"
                        className="form-control"
                        name="department"
                        required
                        autoComplete="department"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.department}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="image"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Фото
                    </label>

                    <div className="col-md-6">
                      <input
                        id="image"
                        type="file"
                        className="form-control-file"
                        name="image"
                        onChange={this.onBaseInputChange}
                        value={this.state.image}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
  getCities: PropTypes.func.isRequired,
  clinic: PropTypes.object.isRequired,
  getClinics: PropTypes.func.isRequired,
  country: PropTypes.object.isRequired,
  getCountries: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  city: state.city,
  country: state.country,
  error: state.error,
  clinic: state.clinic,
});

export default connect(mapStateToProps, {
  register,
  getCities,
  getCountries,
  getClinics,
})(Register);
