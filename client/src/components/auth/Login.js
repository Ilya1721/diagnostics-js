import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/auth/authActions";
import { Redirect, Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rememberMe: false,
    };
  }

  onSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.loginUser({ email, password });
  };

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  redirect = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
  };

  setErrorClass = () => {
    const { isWrongCredentials } = this.props.auth;
    if (isWrongCredentials) {
      return "is-invalid";
    } else {
      return "";
    }
  };

  setErrorMsg = () => {
    const { isWrongCredentials } = this.props.auth;
    if (isWrongCredentials) {
      return (
        <span className="invalid-feedback" role="alert">
          <strong>Неправильний логін або пароль</strong>
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Login</div>

              <div className="card-body">
                <form method="POST" onSubmit={this.onSubmit}>
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
                        className={`form-control ${this.setErrorClass()}`}
                        name="email"
                        required
                        autoComplete="email"
                        autoFocus
                        onChange={this.onBaseInputChange}
                        value={this.state.email}
                      />

                      {this.setErrorMsg()}
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
                        autoComplete="current-password"
                        onChange={this.onBaseInputChange}
                        value={this.state.password}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-8 offset-md-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
