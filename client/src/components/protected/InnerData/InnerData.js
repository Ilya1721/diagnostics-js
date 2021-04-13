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
