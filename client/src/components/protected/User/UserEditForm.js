import React from "react";
import { connect } from "react-redux";
import { register } from "../../../actions/auth/authActions";
import { getCities } from "../../../actions/city/cityActions";
import { getCountries } from "../../../actions/country/countryActions";
import { getClinics } from "../../../actions/clinic/clinicActions";
import { getJobs } from "../../../actions/job/jobActions";
import { getDepartments } from "../../../actions/department/departmentActions";
import { getRegisterData } from "../../../actions/auth/authActions";
import { getUser } from "../../../actions/user/userActions";
import AwsClass from "../../../aws/awsApi";
import { getImgBuffer } from "../../../aws/imgBuffer";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import Loading from "../../modals/Loading";

class UserEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        login: "",
        lastName: "",
        firstName: "",
        fatherName: "",
        about: "",
        city: "",
        cityId: null,
        country: "",
        countryId: null,
        street: "",
        house: "",
        flat: "",
        phoneNumber: "",
        clinic: "",
        clinicId: null,
        job: "",
        jobId: null,
        department: "",
        departmentId: null,
        image: "",
      },
      countries: [],
      cities: [],
      clinics: [],
      jobs: [],
      departments: [],
      isOverallError: false,
      overallErrorMsg: "Помилка реєстрації, перевірте, будь ласка, усі поля.",
      imageFile: {},
      loading: true,
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

  setErrorClass = (error) => {
    if (error) {
      return "is-invalid";
    } else {
      return "";
    }
  };

  setErrorMsg = (error, msg) => {
    if (error) {
      return (
        <span className="invalid-feedback" role="alert">
          <strong>{msg}</strong>
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  setOverralErrorMsg = (error, msg) => {
    if (error) {
      return (
        <span className="text-danger mx-auto mb-4" role="alert">
          <strong>{msg}</strong>
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  onImageChange = (e) => {
    this.setState({
      ...this.state,
      imageFile: e.target.files[0],
    });
  };

  onCountryChange = (e) => {
    const { clinics } = this.props.clinic;
    const { cities } = this.props.city;
    const { departments } = this.props.department;
    const { countries } = this.props.country;
    let countryId;
    try {
      countryId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const country = countries.find((c) => c.id === countryId).name;
    const updatedCountries = countries.filter((c) => c.id !== countryId);
    const updatedCities = cities.filter(
      (city) => city.country_id === countryId
    );
    let updatedClinics = [];
    let updatedDepartments = [];
    let cityId = null;
    let city = "";
    let clinic = "";
    let clinicId = null;
    let department = "";
    let departmentId = null;
    if (updatedCities.length > 0) {
      cityId = updatedCities[0].id;
      city = updatedCities[0].name;
      updatedClinics = clinics.filter((clinic) => clinic.city_id === cityId);
      updatedCities.shift();
    }
    if (updatedClinics.length > 0) {
      clinicId = updatedClinics[0].clinic_id;
      clinic = updatedClinics[0].clinic_name;
      updatedDepartments = departments.filter(
        (department) => department.clinic_id === clinicId
      );
      updatedClinics.shift();
    }
    if (updatedDepartments.length > 0) {
      department = updatedDepartments[0].name;
      departmentId = updatedDepartments[0].id;
      updatedDepartments.shift();
    }
    this.setState({
      ...this.state,
      cities: updatedCities,
      clinics: updatedClinics,
      departments: updatedDepartments,
      countries: updatedCountries,
      user: {
        ...this.state.user,
        countryId,
        country,
        cityId,
        city,
        clinic,
        clinicId,
        department,
        departmentId,
      },
    });
  };

  onCityChange = (e) => {
    const { clinics } = this.state;
    const updatedClinics = clinics.filter(
      (clinic) => clinic.city_id === e.target.value
    );
    console.log(updatedClinics);
    this.setState({
      ...this.state,
      clinics: updatedClinics,
      user: {
        ...this.state.user,
        clinicId: e.target.value,
      },
    });
  };

  redirect = () => {
    /*const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }*/
  };

  onSubmit = (e) => {
    const { user, imageFile } = this.state;
    const { errors } = this.state;
    e.preventDefault();
    if (this.state.isOverallError) {
      alert("Помилка реєстрації");
    } else {
      const awsObject = AwsClass.build().then((aws) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          const buffer = getImgBuffer(base64);
          aws.uploadImage(imageFile.name, buffer, user.email).then((res) =>
            this.setState(
              {
                ...this.state,
                user: {
                  ...this.state.user,
                  image: res,
                },
              },
              () => {
                this.props.register(this.state.user);
              }
            )
          );
        };
        reader.readAsDataURL(imageFile);
      });
    }
  };

  componentDidMount() {
    this.props.getCities();
    this.props.getCountries();
    this.props.getClinics();
    this.props.getJobs();
    this.props.getDepartments();
    this.props.getRegisterData();
    this.props.getUser(this.props.auth.user.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.loading !== this.props.user.loading) {
      const { cities, loading } = this.props.city;
      const { countries } = this.props.country;
      const { clinics } = this.props.clinic;
      const { jobs } = this.props.job;
      const { departments } = this.props.department;
      const { registerData } = this.props.auth;
      const user = this.props.user.users[0];
      if (departments.length > 0) {
        const defaultCities = cities.filter(
          (city) =>
            city.country_id === user.countryId && city.id !== user.cityId
        );
        const defaultClinics = clinics.filter(
          (clinic) =>
            clinic.city_id === user.cityId && clinic.clinic_id !== user.clinicId
        );
        const defaultDepartments = departments.filter(
          (department) =>
            department.clinic_id === user.clinicId &&
            department.department_id !== user.departmentId
        );
        const defaultCountries = countries.filter(
          (country) => country.id !== user.countryId
        );
        const defaultJobs = jobs.filter((job) => job.id !== user.jobId);
        this.setState({
          ...this.state,
          countries: defaultCountries,
          cities: defaultCities,
          clinics: defaultClinics,
          jobs: defaultJobs,
          departments: defaultDepartments,
          loading: this.props.user.loading,
          user: {
            ...this.props.user.users[0],
          },
        });
      }
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { cities, countries, clinics, jobs, departments } = this.state;
      const {
        job,
        jobId,
        city,
        cityId,
        department,
        departmentId,
        room,
        roomId,
        about,
        lastName,
        firstName,
        fatherName,
        street,
        house,
        flat,
        phoneNumber,
        image,
        id,
        countryId,
        country,
        login,
        clinic,
        clinicId,
      } = this.state.user;
      const { isOverallError, overallErrorMsg } = this.state;
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
                          value={login}
                        />
                      </div>
                    </div>

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
                          value={lastName}
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
                          value={firstName}
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
                          value={fatherName}
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
                          rows="8"
                          onChange={this.onBaseInputChange}
                          value={about}
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
                          name="countryId"
                          required
                          autoFocus
                          onChange={this.onCountryChange}
                        >
                          <option value={countryId}>{country}</option>
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
                          name="cityId"
                          required
                          autoFocus
                          onChange={this.onCityChange}
                        >
                          <option value={cityId}>{city}</option>
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
                          value={street}
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
                          value={house}
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
                          value={flat}
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
                          value={phoneNumber}
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
                          name="clinicId"
                          required
                          autoFocus
                          onChange={this.onBaseInputChange}
                        >
                          <option value={clinicId}>{clinic}</option>
                          {clinics.map((clinic) => (
                            <option
                              key={clinic.clinic_id}
                              value={clinic.clinic_id}
                            >
                              {clinic.clinic_name}
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
                        <select
                          id="job"
                          className="form-control"
                          name="job"
                          required
                          autoFocus
                          onChange={this.onBaseInputChange}
                        >
                          <option value={jobId}>{job}</option>
                          {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                              {job.name}
                            </option>
                          ))}
                        </select>
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
                        <select
                          id="department"
                          className="form-control"
                          name="department"
                          required
                          autoFocus
                          onChange={this.onBaseInputChange}
                        >
                          <option value={departmentId}>{department}</option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                        </select>
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
                          ref={this.imageFileRef}
                          type="file"
                          className="form-control-file"
                          name="image"
                          onChange={this.onImageChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-0">
                      {this.setOverralErrorMsg(isOverallError, overallErrorMsg)}
                      <div className="col-md-6 offset-md-4">
                        <button type="submit" className="btn btn-primary mr-2">
                          Register
                        </button>
                        <Link
                          to="/personalData"
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

UserEditForm.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
  getCities: PropTypes.func.isRequired,
  clinic: PropTypes.object.isRequired,
  getClinics: PropTypes.func.isRequired,
  country: PropTypes.object.isRequired,
  getCountries: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
  department: PropTypes.object.isRequired,
  getDepartments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getRegisterData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  country: state.country,
  error: state.error,
  clinic: state.clinic,
  job: state.job,
  department: state.department,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  register,
  getCities,
  getCountries,
  getClinics,
  getJobs,
  getDepartments,
  getRegisterData,
  getUser,
})(UserEditForm);
