import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/auth/authActions";

class Navbar extends React.Component {
  logOut = (e) => {
    e.preventDefault();
    this.props.logOutUser();
  };

  renderProtectedLinks = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <React.Fragment>
          <li className="nav-item active">
            <Link className="nav-link text-secondary" to="/visits">
              Візити <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-secondary" to="/patients">
              Пацієнти <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-secondary" to="/personalData">
              Особисті дані <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-secondary" to="/statistics">
              Статистика <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-secondary" to="/diagnostics">
              Діагностика <span className="sr-only">(current)</span>
            </Link>
          </li>
          {this.renderInnerLinks()}
        </React.Fragment>
      );
    }
  };

  renderInnerLinks = () => {
    const { role_id } = this.props.auth.user;
    if (role_id === 2) {
      return (
        <li className="nav-item active">
          <Link className="nav-link text-secondary" to="/innerData">
            Внутрішні дані <span className="sr-only">(current)</span>
          </Link>
        </li>
      );
    }
  };

  renderAuth = () => {
    const { isAuthenticated, user } = this.props.auth;
    if (!isAuthenticated) {
      return (
        <div className="top-right links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      );
    } else {
      return (
        <div className="logout-div">
          <a
            id="navbarDropdown"
            className="nav-link pointer dropdown-toggle"
            role="button"
            to="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            v-pre="true"
          >
            {user.login} <span className="caret"></span>
          </a>

          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <Link className="dropdown-item" to="/" onClick={this.logOut}>
              Logout
            </Link>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <div id="header" className="container">
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link text-secondary" to="/doctors">
                  Лікарі <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link text-secondary" to="/clinics">
                  Клініки <span className="sr-only">(current)</span>
                </Link>
              </li>
              <div className="navbar-brand ml-2">
                <Link to="/">
                  <img
                    src="https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/logos/medicsLogo.svg"
                    className="float-left pr-1"
                    alt="logo"
                  />
                </Link>
              </div>
              {this.renderProtectedLinks()}
              {this.renderAuth()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOutUser })(Navbar);
