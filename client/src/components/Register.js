import React from "react";

class Register extends React.Component {
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
                  action="/register"
                  enctype="multipart/form-data"
                >
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Login
                    </label>

                    <div className="col-md-6">
                      <input
                        id="name"
                        type="text"
                        className="form-control "
                        name="name"
                        required
                        autoComplete="name"
                        autoFocus
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
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="password-confirm"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Confirm Password
                    </label>

                    <div className="col-md-6">
                      <input
                        id="password-confirm"
                        type="password"
                        className="form-control"
                        name="password_confirmation"
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="form-group row">
                    <label
                      htmlFor="last_name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Прізвище
                    </label>

                    <div className="col-md-6">
                      <input
                        id="last_name"
                        type="text"
                        className="form-control"
                        name="last_name"
                        required
                        autoComplete="last_name"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="first_name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Ім`я
                    </label>

                    <div className="col-md-6">
                      <input
                        id="first_name"
                        type="text"
                        className="form-control"
                        name="first_name"
                        required
                        autoComplete="first_name"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="father_name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      По-батькові
                    </label>

                    <div className="col-md-6">
                      <input
                        id="father_name"
                        type="text"
                        className="form-control"
                        name="father_name"
                        required
                        autoComplete="father_name"
                        autoFocus
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
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="phone_number"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Номер телефону
                    </label>

                    <div className="col-md-6">
                      <input
                        id="phone_number"
                        type="text"
                        className="form-control"
                        name="phone_number"
                        required
                        autoComplete="phone_number"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="clinic_id"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Клініка
                    </label>
                    <div className="col-md-6">
                      <select
                        id="clinic_id"
                        className="form-control"
                        name="clinic_id"
                        required
                        autoFocus
                      >
                        <option value="1">Хмельницька поліклініка № 4</option>
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

export default Register;
