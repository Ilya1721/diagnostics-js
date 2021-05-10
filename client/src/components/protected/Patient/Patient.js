import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getPatient } from "../../../actions/patient/patientActions";
import { addLink } from "../../../actions/navigation/navigationActions";
import TableView from "../Helpers/TableView";
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
      if (
        this.props.patient.patients[0] !== undefined &&
        this.props.patient.patients[0].patient !== undefined
      ) {
        const patient = this.props.patient.patients[0].patient;
        this.props.addLink({
          path: window.location.pathname,
          name: `${patient.lastName} ${patient.firstName} ${patient.fatherName}`,
        });
      }
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
                        <div>
                          №{patient.id} {patient.lastName} {patient.firstName}{" "}
                          {patient.fatherName}
                        </div>
                        <div>
                          <h3>Адреса</h3>
                          м.{patient.city} вул.{patient.street} {patient.house}{" "}
                          кв. {patient.flat}
                        </div>
                        <div>
                          <h3>Контакти</h3> тел. {patient.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card border-top-0 border-right-0 border-left-0 rounded-0 container">
                      <div className="card-body">
                        <TableView data={diagnosis} name="Діагнози" />
                        <TableView data={treatments} name="Лікування" />
                        <TableView data={symptoms} name="Симптоми" />
                        <TableView data={medicaments} name="Медикаменти" />
                        <TableView data={procedures} name="Процедури" />
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
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  patient: state.patient,
});

export default withRouter(
  connect(mapStateToProps, { getPatient, addLink })(Patient)
);
