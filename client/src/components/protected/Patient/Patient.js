import React from "react";
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
import Loading from "../../modals/Loading";

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPatient(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.patient.loading !== this.props.patient.loading) {
      this.setState({
        loading: this.props.patient.loading,
      });
    }
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    } else {
      const {
        patient,
        symptoms,
        diagnosis,
        procedures,
        medicaments,
        treatments,
      } = this.props.patient.patients[0];

      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-center mb-3">Картка пацієнта</h3>
              <Link
                className="btn btn-primary text-right mr-2"
                role="button"
                to={`/patients/${patient.id}/visits/create`}
              >
                Зареєструвати візит
              </Link>
              <Link
                className="btn btn-info text-right"
                role="button"
                to={`/patients/${patient.id}/edit`}
              >
                Редагувати особисті дані
              </Link>
              <div className="card rounded-0 mt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="card border-top-0 border-left-0 border-right-0 rounded-0 container">
                      <div className="card-body">
                        №{patient.id} {patient.lastName} {patient.firstName}{" "}
                        {patient.fatherName}; м.
                        {patient.city} вул.{patient.street} {patient.house} кв.{" "}
                        {patient.flat}; тел. {patient.phoneNumber}.
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
