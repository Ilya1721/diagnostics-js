import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getClinics,
  deleteClinic,
  editClinic,
} from "../../../actions/clinic/clinicActions";
import AwsClass from "../../../aws/awsApi";
import { getImgBuffer } from "../../../aws/imgBuffer";
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

  onDelete = (id, image) => {
    const awsObject = AwsClass.build().then((aws) => {
      aws.deleteImage(image).then((res) => {
        this.props.deleteClinic(id);
      });
    });
  };

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
            to="/clinics/create"
          >
            Додати клініку
          </Link>
          <table className="table text-center table-light">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic.clinic_id}>
                  <td>
                    <Link
                      to={`/clinics/${clinic.clinic_id}/show`}
                      className="btn btn-link"
                    >
                      {clinic.clinic_name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="btn btn-primary text-right mr-2 mb-3"
                      role="button"
                      to={`/clinics/${clinic.clinic_id}/edit`}
                    >
                      Редагувати
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger text-right mr-2 mb-3"
                      role="button"
                      type="button"
                      onClick={() =>
                        this.onDelete(clinic.clinic_id, clinic.clinic_image)
                      }
                    >
                      Видалити
                    </button>
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
  deleteClinic: PropTypes.func.isRequired,
  editClinic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clinic: state.clinic,
});

export default connect(mapStateToProps, {
  getClinics,
  deleteClinic,
  editClinic,
})(Clinics);
