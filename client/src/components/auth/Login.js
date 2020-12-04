import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/auth/authActions";

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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { isAuthenticated, isWrongCredentials } = this.props.auth;
      if (isAuthenticated) {
        alert("Ви успішно зайшли");
      } else if (isWrongCredentials) {
        alert("Неправильний логін або пароль");
      }
    }
  }

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
                        className="form-control"
                        name="email"
                        required
                        autoComplete="email"
                        autoFocus
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
                        autoComplete="current-password"
                        onChange={this.onBaseInputChange}
                        value={this.state.password}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6 offset-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          id="remember"
                          onChange={this.onBaseInputChange}
                          value={this.state.rememberMe}
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember Me
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-8 offset-md-4">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>

                      <a className="btn btn-link" href="/resetPassword">
                        Forgot Your Password?
                      </a>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
