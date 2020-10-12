import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  onLogout = (e) => {
    e.preventDefault();
    document.getElementById("logout-form").submit();
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <div id="header" className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link text-secondary" href="/doctors">
                  Лікарі <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link text-secondary" href="/clinics">
                  Клініки <span className="sr-only">(current)</span>
                </a>
              </li>
              <div className="navbar-brand ml-2">
                <img
                  src="https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/logos/medicsLogo.svg"
                  className="float-left pr-1"
                  alt="logo"
                />
                Medics
              </div>
              <li>
                <div className="flex-right">
                  <div className="top-right links">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
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

export default Navbar;
