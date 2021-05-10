import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth/authActions";
import { getCities } from "../../actions/city/cityActions";
import { getCountries } from "../../actions/country/countryActions";
import { getClinics } from "../../actions/clinic/clinicActions";
import { getJobs } from "../../actions/job/jobActions";
import { getRooms } from "../../actions/room/roomActions";
import { getDepartments } from "../../actions/department/departmentActions";
import { getRegisterData } from "../../actions/auth/authActions";
import AwsClass from "../../aws/awsApi";
import { getImgBuffer } from "../../aws/imgBuffer";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

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
        room: "",
        image: "",
      },
      countries: [],
      cities: [],
      clinics: [],
      jobs: [],
      departments: [],
      emails: [],
      rooms: [],
      errors: { isEmailError: false, isPasswordConfirmError: false },
      isOverallError: false,
      emailErrorMsg: "Користувач з таким email уже існує",
      passwordConfimMsg: "Паролі не співпадають",
      overallErrorMsg: "Помилка реєстрації, перевірте, будь ласка, усі поля.",
      imageFile: {},
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

  onPasswordConfirmChange = (e) => {
    const passwordConfirm = e.target.value;
    const { user } = this.state;
    if (passwordConfirm !== user.password) {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, isPasswordConfirmError: true },
        isOverallError: true,
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, isPasswordConfirmError: false },
        isOverallError: false,
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value,
        },
      });
    }
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

  onEmailChange = (e) => {
    const email = e.target.value;
    if (this.state.emails.includes(email)) {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, isEmailError: true },
        isOverallError: true,
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, isEmailError: false },
        isOverallError: false,
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  onImageChange = (e) => {
    this.setState({
      ...this.state,
      imageFile: e.target.files[0],
    });
  };

  onCountryChange = (e) => {
    const { cities } = this.props.city;
    const { clinics } = this.props.clinic;
    const { departments } = this.props.department;
    const { rooms } = this.props.room;
    let countryId;
    try {
      countryId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedCities = cities.filter(
      (city) => city.country_id === countryId
    );
    let updatedClinics = [];
    let updatedDepartments = [];
    let updatedRooms = [];
    if (updatedCities.length > 0) {
      updatedClinics = clinics.filter(
        (clinic) => clinic.city_id === updatedCities[0].id
      );
    }
    if (updatedClinics.length > 0) {
      updatedDepartments = departments.filter(
        (d) => d.clinic_id === updatedClinics[0].clinic_id
      );
    }
    if (updatedDepartments.length > 0) {
      updatedRooms = rooms.filter(
        (r) => r.department_id === updatedDepartments[0].id
      );
    }
    this.setState({
      ...this.state,
      cities: updatedCities,
      clinics: updatedClinics,
      departments: updatedDepartments,
      rooms: updatedRooms,
      user: {
        ...this.state.user,
        country: countryId,
      },
    });
  };

  onCityChange = (e) => {
    const { clinics } = this.props.clinic;
    const { departments } = this.props.department;
    const { rooms } = this.props.room;
    let cityId;
    try {
      cityId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedClinics = clinics.filter(
      (clinic) => clinic.city_id === cityId
    );
    let updatedDepartments = [];
    let updatedRooms = [];
    if (updatedClinics.length > 0) {
      updatedDepartments = departments.filter(
        (d) => d.clinic_id === updatedClinics[0].clinic_id
      );
    }
    if (updatedDepartments.length > 0) {
      updatedRooms = rooms.filter(
        (r) => r.department_id === updatedDepartments[0].id
      );
    }
    this.setState({
      ...this.state,
      clinics: updatedClinics,
      departments: updatedDepartments,
      rooms: updatedRooms,
      user: {
        ...this.state.user,
        city: cityId,
      },
    });
  };

  onClinicChange = (e) => {
    const { departments } = this.props.department;
    const { rooms } = this.props.room;
    let clinicId;
    try {
      clinicId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedDepartments = departments.filter(
      (d) => d.clinic_id === clinicId
    );
    let updatedRooms = [];
    if (updatedDepartments.length > 0) {
      updatedRooms = rooms.filter(
        (r) => r.department_id === updatedDepartments[0].id
      );
    }
    this.setState({
      ...this.state,
      departments: updatedDepartments,
      rooms: updatedRooms,
      user: {
        ...this.state.user,
        clinic: clinicId,
      },
    });
  };

  onDepartmentChange = (e) => {
    const { rooms } = this.props.room;
    let departmentId;
    try {
      departmentId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedRooms = rooms.filter((r) => r.department_id === departmentId);
    this.setState({
      ...this.state,
      rooms: updatedRooms,
      user: {
        ...this.state.user,
        department: departmentId,
      },
    });
  };

  onRoomChange = (e) => {
    let roomId;
    try {
      roomId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        room: roomId,
      },
    });
  };

  redirect = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
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
          aws
            .uploadImage(imageFile.name, buffer, user.email, "doctors")
            .then((res) =>
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
    this.props.getRooms();
    this.props.getRegisterData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { cities, loading } = this.props.city;
      const { countries } = this.props.country;
      const { clinics } = this.props.clinic;
      const { jobs } = this.props.job;
      const { departments } = this.props.department;
      const { rooms } = this.props.room;
      const { registerData } = this.props.auth;
      const emails = registerData.map((obj) => obj.email);
      if (
        rooms.length > 0 &&
        departments.length > 0 &&
        jobs.length > 0 &&
        clinics.length > 0 &&
        countries.length > 0 &&
        cities.length > 0
      ) {
        const defaultCities = cities.filter(
          (city) => city.country_id === countries[0].id
        );
        const defaultClinics = clinics.filter(
          (clinic) => clinic.city_id === defaultCities[0].id
        );
        const defaultDepartments = departments.filter(
          (department) => department.clinic_id === defaultClinics[0].clinic_id
        );
        const defaultRooms = rooms.filter(
          (r) => r.department_id === defaultDepartments[0].id
        );
        this.setState({
          ...this.state,
          countries: countries,
          cities: defaultCities,
          clinics: defaultClinics,
          jobs: jobs,
          emails: emails,
          departments: defaultDepartments,
          rooms: defaultRooms,
          user: {
            ...this.state.user,
            country: countries[0].id,
            city: defaultCities[0].id,
            clinic: defaultClinics[0].clinic_id,
            job: jobs[0].id,
            department: defaultDepartments[0].id,
            room: defaultRooms[0].id,
          },
        });
      }
    }
  }

  render() {
    const { cities, countries, clinics, jobs, departments, rooms } = this.state;
    const { isEmailError, isPasswordConfirmError } = this.state.errors;
    const {
      emailErrorMsg,
      passwordConfimMsg,
      isOverallError,
      overallErrorMsg,
    } = this.state;
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
                        className={`form-control ${this.setErrorClass(
                          isEmailError
                        )}`}
                        name="email"
                        required
                        autoComplete="email"
                        onChange={this.onEmailChange}
                        value={this.state.email}
                      />
                      {this.setErrorMsg(isEmailError, emailErrorMsg)}
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
                        className={`form-control ${this.setErrorClass(
                          isPasswordConfirmError
                        )}`}
                        name="password"
                        required
                        autoComplete="new-password"
                        onChange={this.onBaseInputChange}
                        value={this.state.password}
                      />
                      {this.setErrorMsg(
                        isPasswordConfirmError,
                        passwordConfimMsg
                      )}
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
                        onChange={this.onPasswordConfirmChange}
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
                        onChange={this.onClinicChange}
                        value={this.state.clinic}
                      >
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
                        value={this.state.job}
                      >
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
                        onChange={this.onDepartmentChange}
                        value={this.state.department}
                      >
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
                      htmlFor="room"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Кабінет
                    </label>
                    <div className="col-md-6">
                      <select
                        id="room"
                        className="form-control"
                        name="room"
                        required
                        autoFocus
                        onChange={this.onRoomChange}
                      >
                        {rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.number}
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
                      <Link to="/" className="btn btn-danger" role="button">
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
  room: state.room,
});

export default connect(mapStateToProps, {
  register,
  getCities,
  getCountries,
  getClinics,
  getJobs,
  getDepartments,
  getRegisterData,
  getRooms,
})(Register);
