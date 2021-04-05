import React from "react";
import { connect } from "react-redux";
import { getCities } from "../../../actions/city/cityActions";
import { getCountries } from "../../../actions/country/countryActions";
import { getClinics } from "../../../actions/clinic/clinicActions";
import { getJobs } from "../../../actions/job/jobActions";
import { getDepartments } from "../../../actions/department/departmentActions";
import { getRooms } from "../../../actions/room/roomActions";
import { getRegisterData, editUser } from "../../../actions/auth/authActions";
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
        room: "",
        roomId: null,
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
      rooms: [],
      isOverallError: false,
      overallErrorMsg: "Помилка реєстрації, перевірте, будь ласка, усі поля.",
      imageFile: {},
      loading: true,
      isComplete: false,
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
    const { rooms } = this.props.room;
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
    let updatedRooms = [];
    let cityId = null;
    let city = "";
    let clinic = "";
    let clinicId = null;
    let department = "";
    let departmentId = null;
    let room = "";
    let roomId = null;
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
      updatedRooms = rooms.filter((r) => r.department_id === departmentId);
      updatedDepartments.shift();
    }
    if (updatedRooms.length > 0) {
      room = updatedRooms[0].number;
      roomId = updatedRooms[0].id;
      updatedRooms.shift();
    }
    this.setState({
      ...this.state,
      cities: updatedCities,
      clinics: updatedClinics,
      departments: updatedDepartments,
      countries: updatedCountries,
      rooms: updatedRooms,
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
        room,
        roomId,
      },
    });
  };

  onCityChange = (e) => {
    const { clinics } = this.props.clinic;
    const { departments } = this.props.department;
    const { cities } = this.props.city;
    const { rooms } = this.props.room;
    let cityId;
    let clinic = "";
    let clinicId = null;
    let updatedDepartments = [];
    let updatedRooms = [];
    let department = "";
    let departmentId = null;
    let room = "";
    let roomId = null;
    try {
      cityId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedCities = cities.filter((c) => c.id !== cityId);
    const city = cities.find((c) => c.id === cityId).name;
    const updatedClinics = clinics.filter(
      (clinic) => clinic.city_id === cityId
    );
    if (updatedClinics.length > 0) {
      clinic = updatedClinics[0].clinic_name;
      clinicId = updatedClinics[0].clinic_id;
      updatedDepartments = departments.filter((d) => d.clinic_id === clinicId);
      updatedClinics.shift();
    }
    if (updatedDepartments.length > 0) {
      department = updatedDepartments[0].name;
      departmentId = updatedDepartments[0].id;
      updatedRooms = rooms.filter((r) => r.department_id === departmentId);
      updatedDepartments.shift();
    }
    if (updatedRooms.length > 0) {
      room = updatedRooms[0].number;
      roomId = updatedRooms[0].id;
      updatedRooms.shift();
    }
    this.setState({
      ...this.state,
      clinics: updatedClinics,
      departments: updatedDepartments,
      rooms: updatedRooms,
      cities: updatedCities,
      user: {
        ...this.state.user,
        clinicId,
        clinic,
        departmentId,
        department,
        roomId,
        room,
        cityId,
        city,
      },
    });
  };

  onClinicChange = (e) => {
    const { departments } = this.props.department;
    const { clinics } = this.props.clinic;
    const { rooms } = this.props.room;
    let clinicId;
    let updatedRooms = [];
    let room = "";
    let roomId = null;
    let department = "";
    let departmentId = null;
    try {
      clinicId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedClinics = clinics.filter((c) => c.clinic_id !== clinicId);
    const clinic = clinics.find((c) => c.clinic_id === clinicId).clinic_name;
    const updatedDepartments = departments.filter(
      (d) => d.clinic_id === clinicId
    );
    if (updatedDepartments.length > 0) {
      department = updatedDepartments[0].name;
      departmentId = updatedDepartments[0].id;
      updatedRooms = rooms.filter((r) => r.department_id === departmentId);
      updatedDepartments.shift();
    }
    if (updatedRooms.length > 0) {
      room = updatedRooms[0].number;
      roomId = updatedRooms[0].id;
      updatedRooms.shift();
    }
    this.setState({
      ...this.state,
      departments: updatedDepartments,
      rooms: updatedRooms,
      clinics: updatedClinics,
      user: {
        ...this.state.user,
        room,
        roomId,
        department,
        departmentId,
        clinic,
        clinicId,
      },
    });
  };

  onDepartmentChange = (e) => {
    const { departments } = this.props.department;
    const { rooms } = this.props.room;
    let departmentId;
    let room = "";
    let roomId = null;
    try {
      departmentId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedDepartments = departments.filter((d) => d.id !== departmentId);
    const department = departments.find((d) => d.id === departmentId).name;
    const updatedRooms = rooms.filter((r) => r.department_id === departmentId);
    if (updatedRooms.length > 0) {
      room = updatedRooms[0].number;
      roomId = updatedRooms[0].id;
      updatedRooms.shift();
    }
    this.setState({
      ...this.state,
      rooms: updatedRooms,
      departments: updatedDepartments,
      user: {
        ...this.state.user,
        room,
        roomId,
        department,
        departmentId,
      },
    });
  };

  onJobChange = (e) => {
    const { jobs } = this.props.job;
    let jobId;
    try {
      jobId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedJobs = jobs.filter((j) => j.id !== jobId);
    const job = jobs.find((j) => j.id === jobId).name;

    this.setState({
      ...this.state,
      jobs: updatedJobs,
      user: {
        ...this.state.user,
        job,
        jobId,
      },
    });
  };

  onRoomChange = (e) => {
    const { rooms } = this.props.room;
    let roomId;
    try {
      roomId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    const updatedRooms = rooms.filter((r) => r.id !== roomId);
    const room = rooms.find((r) => r.id === roomId).number;
    this.setState({
      ...this.state,
      rooms: updatedRooms,
      user: {
        ...this.state.user,
        roomId,
        room,
      },
    });
  };

  redirect = () => {
    const { isComplete } = this.state;
    if (isComplete) {
      return <Redirect to="/personalData" />;
    }
  };

  onSubmit = (e) => {
    const { user, imageFile } = this.state;
    const { errors } = this.state;
    e.preventDefault();
    if (this.state.isOverallError) {
      alert("Помилка реєстрації");
    } else if (imageFile.name !== undefined) {
      const awsObject = AwsClass.build().then((aws) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          const buffer = getImgBuffer(base64);
          aws.deleteImage(user.image).then((res) => {
            aws
              .uploadImage(imageFile.name, buffer, user.email, "doctors")
              .then((res) =>
                this.setState(
                  {
                    ...this.state,
                    isComplete: true,
                    user: {
                      ...this.state.user,
                      image: res,
                    },
                  },
                  () => {
                    this.props.editUser(this.state.user);
                  }
                )
              );
          });
        };
        reader.readAsDataURL(imageFile);
      });
    } else {
      this.setState({
        ...this.state,
        isComplete: true,
      });
      this.props.editUser(this.state.user);
    }
  };

  componentDidMount() {
    this.props.getCities();
    this.props.getCountries();
    this.props.getClinics();
    this.props.getJobs();
    this.props.getDepartments();
    this.props.getRegisterData();
    this.props.getRooms();
    this.props.getUser(this.props.auth.user.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.loading !== this.props.user.loading) {
      const { cities } = this.props.city;
      const { countries } = this.props.country;
      const { clinics } = this.props.clinic;
      const { jobs } = this.props.job;
      const { departments, loading } = this.props.department;
      const { rooms } = this.props.room;
      const { registerData } = this.props.auth;
      const user = this.props.user.users[0];
      if (!loading) {
        const defaultCities = cities.filter(
          (city) =>
            city.country_id === user.countryId && city.id !== user.cityId
        );
        const defaultClinics = clinics.filter(
          (clinic) =>
            clinic.city_id === user.cityId && clinic.clinic_id !== user.clinicId
        );
        const defaultDepartments = departments.filter(
          (department) => department.id !== user.departmentId
        );
        const defaultCountries = countries.filter(
          (country) => country.id !== user.countryId
        );
        const defaultJobs = jobs.filter((job) => job.id !== user.jobId);
        const defaultRooms = rooms.filter((r) => r.id !== user.roomId);
        this.setState({
          ...this.state,
          countries: defaultCountries,
          cities: defaultCities,
          clinics: defaultClinics,
          jobs: defaultJobs,
          departments: defaultDepartments,
          rooms: defaultRooms,
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
      const {
        cities,
        countries,
        clinics,
        jobs,
        departments,
        rooms,
      } = this.state;
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
                <div className="card-header">Редагувати особисті дані</div>

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
                          onChange={this.onClinicChange}
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
                          onChange={this.onJobChange}
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
                          onChange={this.onDepartmentChange}
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
                          <option value={roomId}>{room}</option>
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
                          Підвердити
                        </button>
                        <Link
                          to="/personalData"
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
}

UserEditForm.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
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
  room: PropTypes.object.isRequired,
  getRooms: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getRegisterData: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  country: state.country,
  error: state.error,
  clinic: state.clinic,
  job: state.job,
  department: state.department,
  room: state.room,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  getCities,
  getCountries,
  getClinics,
  getJobs,
  getDepartments,
  getRooms,
  getRegisterData,
  getUser,
  editUser,
})(UserEditForm);
