import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { createVisit } from "../../../actions/visit/visitActions";
import CloseButton from "../../modals/CloseButton";

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

  onVisitInputChange = (obj) => {
    const property = Object.keys(obj)[0];
    const field = Object.keys(obj)[1];
    let data = Object.values(obj)[0];
    const index = data.findIndex((item) => item.id === obj.id);
    data[index][field] = obj[field];
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        [property]: data,
      },
    });
  };

  moreVisitInput = (obj) => {
    const property = Object.keys(obj)[0];
    const data = Object.values(obj)[0];
    this.setState({
      ...this.state,
      visit: {
        ...this.state.visit,
        [property]: [
          ...data,
          {
            id: data[data.length - 1].id + 1,
            name: "",
            description: "",
          },
        ],
      },
    });
  };

  deleteVisitInput = (obj) => {
    const property = Object.keys(obj)[0];
    let data = Object.values(obj)[0];
    if (data.length > 1) {
      data = data.filter((item) => item.id !== obj.id);
      this.setState({
        ...this.state,
        visit: {
          ...this.state.visit,
          [property]: data,
        },
      });
    }
  };

  render() {
    const {
      isDateErr,
      dateErrMsg,
      isOverallError,
      overallErrorMsg,
    } = this.state;
    const {
      arrivedAt,
      departureAt,
      symptoms,
      diagnosis,
      treatments,
      medicaments,
      procedures,
    } = this.state.visit;
    const patientId = this.props.match.params.id;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Зареєструвати новий візит</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
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
                  {symptoms.map((symptom) => (
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
                              this.onVisitInputChange({
                                symptoms,
                                name: e.target.value,
                                id: symptom.id,
                              })
                            }
                            required
                          />
                        </div>
                        <CloseButton
                          func={this.deleteVisitInput}
                          args={[{ symptoms, id: symptom.id }]}
                        />
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="symptomDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Доповнення:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="symptomDescription"
                            value={symptom.description}
                            id="symptomDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onVisitInputChange({
                                symptoms,
                                description: e.target.value,
                                id: symptom.id,
                              })
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
                        onClick={(e) => this.moreVisitInput({ symptoms })}
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
                  {diagnosis.map((diagnos) => (
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
                              this.onVisitInputChange({
                                diagnosis,
                                name: e.target.value,
                                id: diagnos.id,
                              })
                            }
                            required
                          />
                        </div>
                        <CloseButton
                          func={this.deleteVisitInput}
                          args={[{ diagnosis, id: diagnos.id }]}
                        />
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="diagnosDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Доповнення:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="diagnosDescription"
                            value={diagnos.description}
                            id="diagnosDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onVisitInputChange({
                                diagnosis,
                                description: e.target.value,
                                id: diagnos.id,
                              })
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
                        onClick={(e) => this.moreVisitInput({ diagnosis })}
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
                  {medicaments.map((medicament) => (
                    <React.Fragment key={medicament.id}>
                      <div className="form-group row">
                        <label
                          htmlFor="medicament"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Медикамент:
                        </label>
                        <div className="col-md-6">
                          <input
                            id="medicament"
                            type="text"
                            className="form-control"
                            name="medicament"
                            value={medicament.name}
                            onChange={(e) =>
                              this.onVisitInputChange({
                                medicaments,
                                name: e.target.value,
                                id: medicament.id,
                              })
                            }
                            required
                          />
                        </div>
                        <CloseButton
                          func={this.deleteVisitInput}
                          args={[{ medicaments, id: medicament.id }]}
                        />
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="medicamentDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Доповнення:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="medicamentDescription"
                            value={medicament.description}
                            id="medicamentDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onVisitInputChange({
                                medicaments,
                                description: e.target.value,
                                id: medicament.id,
                              })
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
                        onClick={(e) => this.moreVisitInput({ medicaments })}
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
                              this.onVisitInputChange({
                                procedures,
                                name: e.target.value,
                                id: procedure.id,
                              })
                            }
                            required
                          />
                        </div>
                        <CloseButton
                          func={this.deleteVisitInput}
                          args={[{ procedures, id: procedure.id }]}
                        />
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="procedureDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Доповнення:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="procedureDescription"
                            value={procedure.description}
                            id="procedureDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onVisitInputChange({
                                procedures,
                                description: e.target.value,
                                id: procedure.id,
                              })
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
                        onClick={(e) => this.moreVisitInput({ procedures })}
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
                              this.onVisitInputChange({
                                treatments,
                                name: e.target.value,
                                id: treatment.id,
                              })
                            }
                            required
                          />
                        </div>
                        <CloseButton
                          func={this.deleteVisitInput}
                          args={[{ treatments, id: treatment.id }]}
                        />
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="treatmentDescription"
                          className="col-md-4 col-form-label text-md-right"
                        >
                          Доповнення:
                        </label>
                        <div className="col-md-6">
                          <textarea
                            className="form-control"
                            name="treatmentDescription"
                            value={treatment.description}
                            id="treatmentDescription"
                            rows="5"
                            onChange={(e) =>
                              this.onVisitInputChange({
                                treatments,
                                description: e.target.value,
                                id: treatment.id,
                              })
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
                        onClick={(e) => this.moreVisitInput({ treatments })}
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
