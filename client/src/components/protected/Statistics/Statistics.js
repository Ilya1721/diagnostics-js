import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLink } from "../../../actions/navigation/navigationActions";

class Statistics extends React.Component {
  componentDidMount() {
    this.props.addLink({ path: window.location.pathname, name: "Статистика" });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center mt-3">Статистика</h2>
        <table className="table text-center table-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/statistics/visits" className="btn btn-link">
                  Візити
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/diagnosis" className="btn btn-link">
                  Діагнози
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/symptoms" className="btn btn-link">
                  Симптоми
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/medicaments" className="btn btn-link">
                  Медикаменти
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/treatments" className="btn btn-link">
                  Схеми лікувань
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/procedures" className="btn btn-link">
                  Процедури
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Statistics.propTypes = {
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps, { addLink })(Statistics);
