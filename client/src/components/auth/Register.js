import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth/authActions";
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
      msg: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
  };

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
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
                      htmlFor="city"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Місто
                    </label>

                    <div className="col-md-6">
                      <input
                        id="city"
                        type="text"
                        className="form-control"
                        name="city"
                        required
                        autoComplete="city"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.city}
                      />
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
                      <input
                        id="country"
                        type="text"
                        className="form-control"
                        name="country"
                        required
                        autoComplete="country"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.country}
                      />
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
                        <option value="1">Хмельницька поліклініка № 4</option>
                        <option value="2">Хмельницька поліклініка № 3</option>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(Register);
