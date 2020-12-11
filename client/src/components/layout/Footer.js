import React from "react";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <nav className="navbar footer navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        КН-17-2
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="text-white m-auto">© Copyright 2021</li>
          <li className="text-white m-auto pl-2">Вишинський І.О.</li>
        </ul>
      </div>
    </nav>
  );
};

export default Footer;
