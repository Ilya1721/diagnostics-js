import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClinics } from "../../../actions/clinic/clinicActions";
import Loading from "../../modals/Loading";

class Clinics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getClinics();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clinic.loading !== this.props.clinic.loading) {
      this.setState({
        loading: this.props.clinic.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { clinics } = this.props.clinic;
      return (
        <div className="container">
          <h2 className="text-center mt-3">Клініки</h2>
          <Link
            className="btn btn-primary text-right mr-2 mb-3"
            role="button"
            to="/clinics/create"
          >
            Додати клініку
          </Link>
          <table className="table text-center table-light">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic.clinic_id}>
                  <td>
                    <Link
                      to={`/clinics/${clinic.clinic_id}`}
                      className="btn btn-link"
                    >
                      {clinic.clinic_name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

Clinics.propTypes = {
  clinic: PropTypes.object.isRequired,
  getClinics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clinic: state.clinic,
});

export default connect(mapStateToProps, { getClinics })(Clinics);
