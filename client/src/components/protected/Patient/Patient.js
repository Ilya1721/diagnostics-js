import React, { useParams } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getPatient } from "../../../actions/patient/patientActions";

class Patient extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPatient(id);
  }

  render() {
    const { patient } = this.props.patient;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Картка пацієнта</h3>
            <div className="card rounded-0 mt-3">
              <div className="row">
                <div className="col-12">
                  <div className="card border-top-0 border-left-0 border-right-0 rounded-0 container">
                    <div className="card-body">№{patient.id}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card border-top-0 border-right-0 border-left-0 rounded-0 container">
                    <div className="card-body">
                      <h3>Пацієнт</h3>
                      <h5>ПІБ:</h5> {patient.lastName} {patient.firstName}{" "}
                      {patient.fatherName}
                      <h5>Адреса:</h5> м.{patient.city}
                      вул.{patient.street} {patient.house}
                      кв. {patient.flat}
                      <h5>Телефон:</h5> {patient.phoneNumber}
                      <Link
                        to={`/patients/${patient.id}/edit`}
                        className="btn btn-primary"
                        role="button"
                      >
                        Редагувати
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Patient.propTypes = {
  patient: PropTypes.object.isRequired,
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default withRouter(connect(mapStateToProps, { getPatient })(Patient));
