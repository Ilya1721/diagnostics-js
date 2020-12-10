import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends React.Component {
  onLogout = (e) => {
    e.preventDefault();
  };

  componentDidMount() {
    console.log(localStorage.getItem("token"));
    console.log(this.props.auth);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log(this.props.auth);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <div id="header" className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
              <li>
                <div className="flex-right">
                  <div className="top-right links">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
