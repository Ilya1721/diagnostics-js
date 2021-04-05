import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getSymptoms } from "../../../../actions/symptom/symptomActions";
import { getDiagnosis } from "../../../../actions/diagnos/diagnosActions";
import { addDiagnostic } from "../../../../actions/diagnostic/diagnosticActions";
import CloseButton from "../../../modals/CloseButton";

class DiagnosticCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      presentDiagnosis: [],
      presentSymptoms: [],
      diagnos: { id: 1, name: "", isError: false, errorMsg: "" },
      symptoms: [{ id: 1, name: "", isError: false, errorMsg: "" }],
    };
  }

  componentDidMount() {
    this.props.getSymptoms();
    this.props.getDiagnosis();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.symptom !== this.props.symptom) {
      const { symptoms } = this.props.symptom;
      this.setState({
        ...this.state,
        presentSymptoms: symptoms,
      });
    } else if (prevProps.diagnos !== this.props.diagnos) {
      const { diagnosis } = this.props.diagnos;
      this.setState({
        ...this.state,
        presentDiagnosis: diagnosis,
      });
    }
  }

  onDiagnosChange = (name) => {
    const { presentDiagnosis } = this.state;
    let diagnos = this.state.diagnos;
    diagnos.isError = false;
    diagnos.name = name;
    if (
      !presentDiagnosis
        .map((d) => d.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      diagnos.isError = true;
      diagnos.errorMsg = "Системі невідомий даний діагноз";
    }
    this.setState({
      ...this.state,
      diagnos,
    });
  };

  onSymptomChange = (id, name) => {
    const { presentSymptoms } = this.state;
    let symptoms = this.state.symptoms.slice();
    const index = symptoms.findIndex((s) => s.id === id);
    symptoms[index].name = name;
    symptoms[index].isError = false;
    if (
      !presentSymptoms
        .map((s) => s.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      symptoms[index].isError = true;
      symptoms[index].errorMsg = "Системі невідомий даний симптом";
    } else if (
      this.state.symptoms.filter(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      ).length > 1
    ) {
      symptoms[index].isError = true;
      symptoms[index].errorMsg = "Ви вже вводили такий симптом";
    }
    this.setState({
      ...this.state,
      symptoms,
    });
  };

  moreSymptom = () => {
    const { symptoms } = this.state;
    if (!this.isError()) {
      this.setState({
        ...this.state,
        symptoms: [
          ...symptoms,
          {
            id: symptoms[symptoms.length - 1].id + 1,
            name: "",
          },
        ],
      });
    }
  };

  deleteSymptom = (id) => {
    if (this.state.symptoms.length > 1) {
      const symptoms = this.state.symptoms.filter((s) => s.id !== id);
      this.setState({
        ...this.state,
        symptoms,
      });
    }
  };

  renderError = (msg, isError) => {
    if (isError) {
      return (
        <div className="form-group row">
          <div className="col-md-6 offset-md-4">
            <span className="text-danger">{msg}</span>
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  redirect = () => {
    if (this.props.diagnostic !== undefined) {
      const { isComplete } = this.state;
      const { loading } = this.props.diagnostic;
      if (!loading && isComplete) {
        return <Redirect to="/innerData/diagnostics" />;
      }
    }
  };

  isError = () => {
    const { symptoms, diagnos } = this.state;
    return symptoms.map((s) => s.isError).includes(true) || diagnos.isError;
  };

  onSubmit = (e) => {
    const { diagnos, symptoms } = this.state;
    e.preventDefault();
    if (!this.isError()) {
      this.props.addDiagnostic({ diagnos, symptoms });
      this.setState({
        ...this.state,
        isComplete: true,
      });
    }
  };

  render() {
    const { diagnos, symptoms } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Додати співвідношення</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
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
                        onChange={(e) => this.onDiagnosChange(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {this.renderError(diagnos.errorMsg, diagnos.isError)}
                  <hr />
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
                              this.onSymptomChange(symptom.id, e.target.value)
                            }
                            required
                          />
                        </div>
                        <CloseButton
                          func={this.deleteSymptom}
                          args={[symptom.id]}
                        />
                      </div>
                      {this.renderError(symptom.errorMsg, symptom.isError)}
                    </React.Fragment>
                  ))}
                  <div className="form-group row">
                    <div className="col-md-6 offset-md-4">
                      <button
                        className="btn btn-success"
                        onClick={this.moreSymptom}
                        id="moreSymptom"
                        type="button"
                      >
                        Ще симптом
                      </button>
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Підтвердити
                      </button>
                      <Link
                        to={"/innerData/diagnostics"}
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

DiagnosticCreateForm.propTypes = {
  symptom: PropTypes.object.isRequired,
  diagnos: PropTypes.object.isRequired,
  diagnostic: PropTypes.object.isRequired,
  getSymptoms: PropTypes.func.isRequired,
  getDiagnosis: PropTypes.func.isRequired,
  addDiagnostic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  symptom: state.symptom,
  diagnos: state.diagnos,
  diagnostic: state.diagnostic,
});

export default connect(mapStateToProps, {
  getSymptoms,
  getDiagnosis,
  addDiagnostic,
})(DiagnosticCreateForm);
