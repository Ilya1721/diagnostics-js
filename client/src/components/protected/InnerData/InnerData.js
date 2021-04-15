import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLink } from "../../../actions/navigation/navigationActions";

class InnerData extends React.Component {
  componentDidMount() {
    this.props.addLink({
      path: window.location.pathname,
      name: "Внутрішні дані",
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center mt-3">Внутрішні дані</h2>
        <table className="table text-center table-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/innerData/clinics" className="btn btn-link">
                  Клініки
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/diagnostics" className="btn btn-link">
                  Діагностика
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/symptoms" className="btn btn-link">
                  Симптоми
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/diseases" className="btn btn-link">
                  Хвороби
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/medicaments" className="btn btn-link">
                  Медикаменти
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/procedures" className="btn btn-link">
                  Процедури
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/treatments" className="btn btn-link">
                  Схеми лікувань
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/countries" className="btn btn-link">
                  Країни
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/cities" className="btn btn-link">
                  Міста
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

InnerData.propTypes = {
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps, { addLink })(InnerData);
