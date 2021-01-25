import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { createVisit } from "../../../actions/visit/visitActions";

class VisitsCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visit: {
        arrivedAt: moment(),
        departureAt: moment(),
        symptoms: [{ id: 1, name: "", description: "" }],
        diagnosis: [{ id: 1, name: "", description: "" }],
        medicaments: [{ id: 1, name: "", description: "" }],
        procedures: [{ id: 1, name: "", description: "" }],
        treatments: [{ id: 1, name: "", description: "" }],
      },
      isDateErr: false,
      isOverallError: false,
      isComplete: false,
      dateErrMsg: "Дата початку пізніше, ніж дата закінчення",
      overallErrorMsg: "Помилка створення візиту",
    };
  }

  onSubmit = (e) => {
    const { isOverallError, overallErrorMsg } = this.state;
    e.preventDefault();
    if (isOverallError) {
      alert(overallErrorMsg);
    } else {
      let patientId;
      try {
        patientId = parseInt(this.props.match.params.id);
      } catch (err) {
        console.log(err);
      }
      const userId = this.props.auth.user.id;
      console.log(this.state.visit);
      this.props.createVisit({
        ...this.state.visit,
        patientId,
        userId,
      });
      this.setState({
        ...this.state,
        isComplete: true,
      });
    }
  };

  onDepartureAtChange = (e) => {
    const departureAt = e.target.value;
    const { arrivedAt } = this.state;
    if (departureAt <= arrivedAt) {
      this.setState({
        ...this.state,
        isDateErr: true,
        isOverallError: true,
      });
    } else {
      this.setState({
        ...this.state,
        isDateErr: false,
        isOverallError: false,
        visit: {
          ...this.state.visit,
          departureAt,
        },
      });
    }
  };

  setErrorClass = (error) => {
    if (error) {
      return "is-invalid";
    } else {
      return "";
    }
  };

  setErrorMsg = (error, msg) => {
    if (error) {
      return (
        <span className="invalid-feedback" role="alert">
          <strong>{msg}</strong>
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  redirect = () => {
    if (this.state.isComplete) {
      return <Redirect to="/visits" />;
    }
  };

  setOverralErrorMsg = (error, msg) => {
    if (error) {
      return (
        <span className="text-danger mx-auto mb-4" role="alert">
          <strong>{msg}</strong>
        </span>
      );
    } else {
      return <span></span>;
    }
  };

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSymptomDescChange = (id, desc) => {
    let symptoms = this.state.visit.symptoms.slice();
    const index = symptoms.findIndex((s) => s.id === id);
    symptoms[index].description = desc;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        symptoms,
      },
    });
  };

  onSymptomChange = (id, name) => {
    let symptoms = this.state.visit.symptoms.slice();
    const index = symptoms.findIndex((s) => s.id === id);
    symptoms[index].name = name;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        symptoms,
      },
    });
  };

  onDiagnosDescChange = (id, desc) => {
    let diagnosis = this.state.visit.diagnosis.slice();
    const index = diagnosis.findIndex((s) => s.id === id);
    diagnosis[index].description = desc;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        diagnosis,
      },
    });
  };

  onDiagnosChange = (id, name) => {
    let diagnosis = this.state.visit.diagnosis.slice();
    const index = diagnosis.findIndex((s) => s.id === id);
    diagnosis[index].name = name;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        diagnosis,
      },
    });
  };

  onMedicamentDescChange = (id, desc) => {
    let medicaments = this.state.visit.medicaments.slice();
    const index = medicaments.findIndex((s) => s.id === id);
    medicaments[index].description = desc;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        medicaments,
      },
    });
  };

  onMedicamentChange = (id, name) => {
    let medicaments = this.state.visit.medicaments.slice();
    const index = medicaments.findIndex((s) => s.id === id);
    medicaments[index].name = name;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        medicaments,
      },
    });
  };

  onProcedureDescChange = (id, desc) => {
    let procedures = this.state.visit.procedures.slice();
    const index = procedures.findIndex((s) => s.id === id);
    procedures[index].description = desc;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        procedures,
      },
    });
  };

  onProcedureChange = (id, name) => {
    let procedures = this.state.visit.procedures.slice();
    const index = procedures.findIndex((s) => s.id === id);
    procedures[index].name = name;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        procedures,
      },
    });
  };

  onTreatmentDescChange = (id, desc) => {
    let treatments = this.state.visit.treatments.slice();
    const index = treatments.findIndex((s) => s.id === id);
    treatments[index].description = desc;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        treatments,
      },
    });
  };

  onTreatmentChange = (id, name) => {
    let treatments = this.state.visit.treatments.slice();
    const index = treatments.findIndex((s) => s.id === id);
    treatments[index].name = name;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        treatments,
      },
    });
  };

  moreSymptom = () => {
    const { symptoms } = this.state.visit;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        symptoms: [
          ...symptoms,
          {
            id: symptoms[symptoms.length - 1].id + 1,
            name: "",
            description: "",
          },
        ],
      },
    });
  };

  moreDiagnos = () => {
    const { diagnosis } = this.state.visit;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        diagnosis: [
          ...diagnosis,
          {
            id: diagnosis[diagnosis.length - 1].id + 1,
            name: "",
            description: "",
          },
        ],
      },
    });
  };
  moreMedicament = () => {
    const { medicaments } = this.state.visit;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        medicaments: [
          ...medicaments,
          {
            id: medicaments[medicaments.length - 1].id + 1,
            name: "",
            description: "",
          },
        ],
      },
    });
  };

  moreProcedure = () => {
    const { procedures } = this.state.visit;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        procedures: [
          ...procedures,
          {
            id: procedures[procedures.length - 1].id + 1,
            name: "",
            description: "",
          },
        ],
      },
    });
  };

  moreTreatment = () => {
    const { treatments } = this.state.visit;
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        treatments: [
          ...treatments,
          {
            id: treatments[treatments.length - 1].id + 1,
            name: "",
            description: "",
          },
        ],
      },
    });
  };

  render() {
    const {
      isDateErr,
      dateErrMsg,
      isOverallError,
      overallErrorMsg,
    } = this.state;
    const { arrivedAt, departureAt } = this.state.visit;
    const patientId = this.props.match.params.id;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Зареєструвати новий візит</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit} action="/presence">
                  <div className="form-group row">
                    <label
                      htmlFor="arrivedAt"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Дата початку
                    </label>
                    <div className="col-md-6">
                      <input
                        id="arrivedAt"
                        name="arrivedAt"
                        type="datetime-local"
                        value={arrivedAt}
                        onChange={this.onBaseInputChange}
                        className={`form-control ${this.setErrorClass(
                          isDateErr
                        )}`}
                      />
                      {this.setErrorMsg(isDateErr, dateErrMsg)}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="departureAt"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Дата закінчення
                    </label>
                    <div className="col-md-6">
                      <input
                        id="departureAt"
                        name="departureAt"
                        type="datetime-local"
                        value={departureAt}
                        onChange={this.onDepartureAtChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group-row text-center">
                    <label
                      htmlFor="symptom"
                      className="col-md-8 col-form-label big-label text-lg-center"
                    >
                      Симптоми
                    </label>
                  </div>
                  {this.state.visit.symptoms.map((symptom) => (
                    <React.Fragment key={symptom.id}>
                      <div className="form-group row">
                        <label
                          htmlFor="symptom"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Симптом:
                        </label>
                        <div className="col-md-6">
                          <input
                            id="symptom"
                            type="text"
                            className="form-control"
                            name="symptom"
                            value={symptom.name}
                            onChange={(e) =>
                              this.onSymptomChange(symptom.id, e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="symptomDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Опис:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="symptomDescription"
                            value={symptom.description}
                            id="symptomDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onSymptomDescChange(
                                symptom.id,
                                e.target.value
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreSymptom"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary"
                        onClick={this.moreSymptom}
                        id="moreSymptom"
                        type="button"
                      >
                        Ще симптом
                      </button>
                    </div>
                  </div>

                  <div className="form-group-row text-center">
                    <label
                      htmlFor="diagnos"
                      className="col-md-8 col-form-label big-label text-md-center"
                    >
                      Діагнози
                    </label>
                  </div>
                  {this.state.visit.diagnosis.map((diagnos) => (
                    <React.Fragment key={diagnos.id}>
                      <div className="form-group row">
                        <label
                          htmlFor="diagnos"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Діагноз:
                        </label>
                        <div className="col-md-6">
                          <input
                            id="diagnos"
                            type="text"
                            className="form-control"
                            name="diagnos"
                            value={diagnos.name}
                            onChange={(e) =>
                              this.onDiagnosChange(diagnos.id, e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="diagnosDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Опис:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="diagnosDescription"
                            value={diagnos.description}
                            id="diagnosDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onDiagnosDescChange(
                                diagnos.id,
                                e.target.value
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreDiagnos"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary"
                        onClick={this.moreDiagnos}
                        id="moreDiagnos"
                        type="button"
                      >
                        Ще діагноз
                      </button>
                    </div>
                  </div>

                  <div className="form-group-row text-center">
                    <label
                      htmlFor="medicament"
                      className="col-md-8 col-form-label big-label text-md-center"
                    >
                      Медикаменти
                    </label>
                  </div>
                  {this.state.visit.medicaments.map((medicament) => (
                    <React.Fragment key={medicament.id}>
                      <div className="form-group row">
                        <label
                          htmlFor="medicament"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Медиакамент:
                        </label>
                        <div className="col-md-6">
                          <input
                            id="medicament"
                            type="text"
                            className="form-control"
                            name="medicament"
                            value={medicament.name}
                            onChange={(e) =>
                              this.onMedicamentChange(
                                medicament.id,
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="medicamentDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Опис:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="medicamentDescription"
                            value={medicament.description}
                            id="medicamentDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onMedicamentDescChange(
                                medicament.id,
                                e.target.value
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreMedicament"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary"
                        onClick={this.moreMedicament}
                        id="moreMedicament"
                        type="button"
                      >
                        Ще медикамент
                      </button>
                    </div>
                  </div>

                  <div className="form-group-row text-center">
                    <label
                      htmlFor="procedure"
                      className="col-md-8 col-form-label big-label text-md-center"
                    >
                      Процедури
                    </label>
                  </div>
                  {this.state.visit.procedures.map((procedure) => (
                    <React.Fragment key={procedure.id}>
                      <div className="form-group row">
                        <label
                          htmlFor="procedure"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Процедура:
                        </label>
                        <div className="col-md-6">
                          <input
                            id="procedure"
                            type="text"
                            className="form-control"
                            name="procedure"
                            value={procedure.name}
                            onChange={(e) =>
                              this.onProcedureChange(
                                procedure.id,
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="procedureDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Опис:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="procedureDescription"
                            value={procedure.description}
                            id="procedureDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onProcedureDescChange(
                                procedure.id,
                                e.target.value
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreProcedure"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary"
                        onClick={this.moreProcedure}
                        id="moreProcedure"
                        type="button"
                      >
                        Ще процедура
                      </button>
                    </div>
                  </div>

                  <div className="form-group-row text-center">
                    <label
                      htmlFor="treatment"
                      className="col-md-8 col-form-label big-label text-md-center"
                    >
                      Схеми лікувань
                    </label>
                  </div>
                  {this.state.visit.treatments.map((treatment) => (
                    <React.Fragment key={treatment.id}>
                      <div className="form-group row">
                        <label
                          htmlFor="treatment"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Схема лікування:
                        </label>
                        <div className="col-md-6">
                          <input
                            id="treatment"
                            type="text"
                            className="form-control"
                            name="treatment"
                            value={treatment.name}
                            onChange={(e) =>
                              this.onTreatmentChange(
                                treatment.id,
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="treatmentDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Опис:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="treatmentDescription"
                            value={treatment.description}
                            id="treatmentDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onTreatmentDescChange(
                                treatment.id,
                                e.target.value
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreTreatment"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="btn btn-primary"
                        onClick={this.moreTreatment}
                        id="moreTreatment"
                        type="button"
                      >
                        Ще схема лікування
                      </button>
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4 mt-5">
                      {this.setOverralErrorMsg(isOverallError, overallErrorMsg)}
                      <button type="submit" className="btn btn-primary mr-2">
                        Зареєструвати
                      </button>
                      <Link
                        to={`/patients/${patientId}/show`}
                        className="btn btn-danger"
                        role="button"
                      >
                        Відмінити
                      </Link>
                    </div>
                  </div>
                  {this.redirect()}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VisitsCreateForm.propTypes = {
  auth: PropTypes.object.isRequired,
  createVisit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { createVisit })(VisitsCreateForm)
);
