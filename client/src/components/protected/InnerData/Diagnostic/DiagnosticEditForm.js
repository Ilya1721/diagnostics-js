import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  editDiagnostic,
  getDiagnostic,
} from "../../../../actions/diagnostic/diagnosticActions";
import { getSymptoms } from "../../../../actions/symptom/symptomActions";
import Loading from "../../../modals/Loading";
import CloseButton from "../../../modals/CloseButton";

class DiagnosticEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presentSymptoms: [],
      isComplete: false,
      loading: true,
      diagnostic: {
        diagnos: {},
        symptoms: [],
        deletedSymptoms: [],
      },
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getDiagnostic(id);
    this.props.getSymptoms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.diagnostic !== this.props.diagnostic) {
      const { loading } = this.props.diagnostic;
      const { diagnos, symptoms } = this.props.diagnostic.innerData;
      this.setState({
        ...this.state,
        loading,
        diagnostic: {
          ...this.state.diagnostic,
          diagnos: { ...diagnos, isError: false },
          symptoms: symptoms.map((s) => ({
            ...s,
            isError: false,
            startName: s.name,
            isNew: false,
          })),
        },
      });
    } else if (prevProps.symptom !== this.props.symptom) {
      const { symptoms } = this.props.symptom;
      this.setState({
        ...this.state,
        presentSymptoms: symptoms,
      });
    }
  }

  onSymptomChange = (id, name) => {
    const { presentSymptoms } = this.state;
    let symptoms = this.state.diagnostic.symptoms.slice();
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
      diagnostic: {
        ...this.state.diagnostic,
        symptoms,
      },
    });
  };

  moreSymptom = () => {
    const { symptoms } = this.state.diagnostic;
    if (!this.isError()) {
      if (symptoms.length > 0) {
        this.setState({
          ...this.state,
          diagnostic: {
            ...this.state.diagnostic,
            symptoms: [
              ...symptoms,
              {
                id: symptoms[symptoms.length - 1].id + 1,
                name: "",
                isError: false,
                isNew: true,
              },
            ],
          },
        });
      } else {
        this.setState({
          ...this.state,
          diagnostic: {
            ...this.state.diagnostic,
            symptoms: [
              ...symptoms,
              {
                id: 1,
                name: "",
                isError: false,
                isNew: true,
              },
            ],
          },
        });
      }
    }
  };

  deleteSymptom = (id) => {
    const symptoms = this.state.diagnostic.symptoms.filter((s) => s.id !== id);
    const deletedSymptom = this.state.diagnostic.symptoms.find(
      (s) => s.id === id
    );
    this.setState({
      ...this.state,
      diagnostic: {
        ...this.state.diagnostic,
        symptoms,
        deletedSymptoms: [
          ...this.state.diagnostic.deletedSymptoms,
          deletedSymptom,
        ],
      },
    });
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

  isError = () => {
    const { symptoms } = this.state.diagnostic;
    return symptoms.map((s) => s.isError).includes(true);
  };

  onSubmit = (e) => {
    const { diagnos, symptoms, deletedSymptoms } = this.state.diagnostic;
    const newSymptoms = symptoms.filter((s) => s.isNew === true);
    const symptomsToUpdate = symptoms.filter((s) => s.isNew === false);
    e.preventDefault();
    if (!this.isError()) {
      this.props.editDiagnostic({
        diagnos,
        symptoms: symptomsToUpdate,
        newSymptoms,
        deletedSymptoms,
      });
      this.props.history.goBack();
    }
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      const { diagnos, symptoms } = this.state.diagnostic;

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
                          readOnly
                          required
                        />
                      </div>
                    </div>
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

DiagnosticEditForm.propTypes = {
  symptom: PropTypes.object.isRequired,
  diagnostic: PropTypes.object.isRequired,
  getSymptoms: PropTypes.func.isRequired,
  getDiagnostic: PropTypes.func.isRequired,
  editDiagnostic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  symptom: state.symptom,
  diagnostic: state.diagnostic,
});

export default withRouter(
  connect(mapStateToProps, { getSymptoms, editDiagnostic, getDiagnostic })(
    DiagnosticEditForm
  )
);
