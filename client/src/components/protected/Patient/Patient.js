import React, { useParams } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getPatient } from "../../../actions/patient/patientActions";
import Diagnosis from "../Helpers/Diagnosis";
import Treatments from "../Helpers/Treatments";
import Symptoms from "../Helpers/Symptoms";
import Medicaments from "../Helpers/Medicaments";
import Procedures from "../Helpers/Procedures";

class Patient extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPatient(id);
  }

  render() {
    const {
      personalData,
      symptoms,
      diagnosis,
      procedures,
      medicaments,
      treatments,
    } = this.props.patient.patients[0];

    if (personalData === undefined) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">loading...</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-center mb-3">Картка пацієнта</h3>
              <Link
                class="btn btn-primary text-right mr-2"
                role="button"
                to="/visit/create"
              >
                Зареєструвати візит
              </Link>
              <Link
                class="btn btn-info text-right"
                role="button"
                to="/patient/edit"
              >
                Редагувати особисті дані
              </Link>
              <div className="card rounded-0 mt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="card border-top-0 border-left-0 border-right-0 rounded-0 container">
                      <div className="card-body">
                        №{personalData.id} {personalData.lastName}{" "}
                        {personalData.firstName} {personalData.fatherName}; м.
                        {personalData.city} вул.{personalData.street}{" "}
                        {personalData.house} кв. {personalData.flat}; тел.{" "}
                        {personalData.phoneNumber}.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card border-top-0 border-right-0 border-left-0 rounded-0 container">
                      <div className="card-body">
                        <Diagnosis diagnosis={diagnosis} />
                        <Treatments treatments={treatments} />
                        <Symptoms symptoms={symptoms} />
                        <Medicaments medicaments={medicaments} />
                        <Procedures procedures={procedures} />
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
}

Patient.propTypes = {
  patient: PropTypes.object.isRequired,
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default withRouter(connect(mapStateToProps, { getPatient })(Patient));
