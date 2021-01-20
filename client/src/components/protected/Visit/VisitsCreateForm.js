import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

class VisitsCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrivedAt: moment(),
      departureAt: moment(),
      symptoms: [{ id: 1, name: "" }],
      diagnosis: [{ id: 1, name: "" }],
      medicaments: [{ id: 1, name: "" }],
      procedures: [{ id: 1, name: "" }],
      treatments: [{ id: 1, name: "" }],
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
      console.log("create");
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
      const patientId = this.props.match.params.id;
      return <Redirect to={`/patients/${patientId}/show`} />;
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
      [e.target.name]: e.target.value,
    });
  };

  onSymptomChange = (id, name) => {
    let symptoms = this.state.symptoms.slice();
    const index = symptoms.findIndex((s) => s.id === id);
    symptoms[index].name = name;
    this.setState({
      ...this.state,
      symptoms,
    });
  };

  onDiagnosChange = (id, name) => {
    let diagnosis = this.state.diagnosis.slice();
    const index = diagnosis.findIndex((s) => s.id === id);
    diagnosis[index].name = name;
    this.setState({
      ...this.state,
      diagnosis,
    });
  };

  onMedicamentChange = (id, name) => {
    let medicaments = this.state.medicaments.slice();
    const index = medicaments.findIndex((s) => s.id === id);
    medicaments[index].name = name;
    this.setState({
      ...this.state,
      medicaments,
    });
  };

  onProcedureChange = (id, name) => {
    let procedures = this.state.procedures.slice();
    const index = procedures.findIndex((s) => s.id === id);
    procedures[index].name = name;
    this.setState({
      ...this.state,
      procedures,
    });
  };

  onTreatmentChange = (id, name) => {
    let treatments = this.state.treatments.slice();
    const index = treatments.findIndex((s) => s.id === id);
    treatments[index].name = name;
    this.setState({
      ...this.state,
      treatments,
    });
  };

  moreSymptom = () => {
    const { symptoms } = this.state;
    this.setState({
      ...this.state,
      symptoms: [
        ...symptoms,
        { id: symptoms[symptoms.length - 1].id + 1, name: "" },
      ],
    });
  };
  moreDiagnos = () => {
    const { diagnosis } = this.state;
    this.setState({
      ...this.state,
      diagnosis: [
        ...diagnosis,
        { id: diagnosis[diagnosis.length - 1].id + 1, name: "" },
      ],
    });
  };
  moreMedicament = () => {
    const { medicaments } = this.state;
    this.setState({
      ...this.state,
      medicaments: [
        ...medicaments,
        { id: medicaments[medicaments.length - 1].id + 1, name: "" },
      ],
    });
  };
  moreProcedure = () => {
    const { procedures } = this.state;
    this.setState({
      ...this.state,
      procedures: [
        ...procedures,
        { id: procedures[procedures.length - 1].id + 1, name: "" },
      ],
    });
  };
  moreTreatment = () => {
    const { treatments } = this.state;
    this.setState({
      ...this.state,
      treatments: [
        ...treatments,
        { id: treatments[treatments.length - 1].id + 1, name: "" },
      ],
    });
  };

  render() {
    const {
      arrivedAt,
      departureAt,
      isDateErr,
      dateErrMsg,
      isOverallError,
      overallErrorMsg,
    } = this.state;
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
                  {this.state.symptoms.map((symptom) => (
                    <div key={symptom.id} className="form-group row">
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
                          onChange={this.onSymptomChange}
                          required
                          autoComplete="symptom"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreSymptom"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="form-control btn btn-primary"
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
                  {this.state.diagnosis.map((diagnos) => (
                    <div key={diagnos.id} className="form-group row">
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
                          onChange={this.onDiagnosChange}
                          required
                          autoComplete="diagnos"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreDiagnos"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="form-control btn btn-primary"
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
                  {this.state.medicaments.map((medicament) => (
                    <div key={medicament.id} className="form-group row">
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
                          onChange={this.onMedicamentChange}
                          required
                          autoComplete="medicament"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreMedicament"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="form-control btn btn-primary"
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
                  {this.state.procedures.map((procedure) => (
                    <div key={procedure.id} className="form-group row">
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
                          onChange={this.onProcedureChange}
                          required
                          autoComplete="procedure"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreProcedure"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="form-control btn btn-primary"
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
                  {this.state.treatments.map((treatment) => (
                    <div key={treatment.id} className="form-group row">
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
                          onChange={this.onTreatmentChange}
                          required
                          autoComplete="treatment"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="form-group row">
                    <label
                      htmlFor="moreTreatment"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>
                    <div className="col-md-6">
                      <button
                        className="form-control btn btn-primary"
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(VisitsCreateForm));
