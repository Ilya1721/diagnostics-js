import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Spinner from "../../modals/Spinner";
import CloseButton from "../../modals/CloseButton";
import { generateDiagnostics } from "../../../actions/diagnostic/diagnosticActions";
import { getSymptoms } from "../../../actions/symptom/symptomActions";
import { addLink } from "../../../actions/navigation/navigationActions";

class DiagnosticsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symptoms: [{ id: 1, name: "", isError: false }],
      presentSymptoms: [],
      diagnosis: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getSymptoms();
    this.props.addLink({
      path: window.location.pathname,
      name: "Діагностика",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.diagnostic !== this.props.diagnostic) {
      const { diagnosis } = this.props.diagnostic.diagnostic;
      const { loading } = this.props.diagnostic;
      this.setState({
        ...this.state,
        diagnosis,
        loading,
      });
    } else if (prevProps.symptom !== this.props.symptom) {
      const { symptoms, loading } = this.props.symptom;
      this.setState({
        ...this.state,
        presentSymptoms: symptoms,
        loading,
      });
    }
  }

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
    }
    this.setState({
      ...this.state,
      symptoms,
    });
  };

  isSymptomError = () => {
    const { symptoms } = this.state;
    return symptoms.map((s) => s.isError).includes(true);
  };

  moreSymptom = () => {
    const { symptoms, symptomError } = this.state;
    if (!this.isSymptomError()) {
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

  goBack = () => {
    this.props.history.goBack();
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { symptoms, symptomError } = this.state;
    if (!this.isSymptomError()) {
      this.props.generateDiagnostics(symptoms);
      this.setState({
        ...this.state,
        loading: true,
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

  render() {
    const { symptoms, diagnosis, loading } = this.state;
    console.log(symptoms);
    console.log(diagnosis);

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Отримати діагностику</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
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
                      {this.renderError(
                        "Системі невідомий даний симптом",
                        symptom.isError
                      )}
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
                  <div className="form-group row">
                    <label className="col-md-4 col-form-label text-md-right">
                      Результат:
                    </label>
                    <div className="col-md-6">
                      <table className="table black-border text-center">
                        <thead>
                          <tr>
                            <th scope="col">Діагноз</th>
                          </tr>
                        </thead>
                        <tbody>
                          {diagnosis.map((diagnos) => (
                            <tr key={diagnos.name}>
                              <td align="center">{diagnos.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Spinner loading={loading} />
                  </div>
                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Підтвердити
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        role="button"
                        onClick={this.goBack}
                      >
                        Відмінити
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DiagnosticsForm.propTypes = {
  diagnostic: PropTypes.object.isRequired,
  symptom: PropTypes.object.isRequired,
  generateDiagnostics: PropTypes.func.isRequired,
  getSymptoms: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  diagnostic: state.diagnostic,
  symptom: state.symptom,
});

export default withRouter(
  connect(mapStateToProps, { generateDiagnostics, getSymptoms, addLink })(
    DiagnosticsForm
  )
);
