import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Spinner from "../../modals/Spinner";
import CloseButton from "../../modals/CloseButton";
import { generateDiagnostics } from "../../../actions/diagnostic/diagnosticActions";

class Diagnostics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symptoms: [{ id: 1, name: "" }],
      unknownSymptoms: [],
      diagnosis: [],
      symptomError: false,
      loading: false,
    };
  }

  onSymptomChange = (id, name) => {
    let symptoms = this.state.symptoms.slice();
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

  moreSymptom = () => {
    const { symptoms } = this.state;
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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { diagnosis, unknownSymptoms } = this.props.diagnostic.diagnostic;
      const { loading } = this.props.diagnostic;
      this.setState({
        ...this.state,
        diagnosis,
        unknownSymptoms,
        loading,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { symptoms } = this.state;
    this.props.generateDiagnostics(symptoms);
    this.setState({
      ...this.state,
      loading: true,
    });
  };

  render() {
    const { symptoms, diagnosis, unknownSymptoms, loading } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Отримати діагностику</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  {symptoms.map((symptom) => (
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
                  ))}
                  <div className="form-group row">
                    <label
                      htmlFor="moreSymptom"
                      className="col-md-4 col-form-label text-md-right"
                    ></label>

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
                  <div className="form-group row">
                    <label className="col-md-4 col-form-label text-md-right">
                      Невідомі системі симптоми:
                    </label>
                    <div className="col-md-6">
                      <table className="table black-border text-center">
                        <thead>
                          <tr>
                            <th scope="col">Симптом</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unknownSymptoms.map((unknownSymptom) => (
                            <tr key={unknownSymptom.name}>
                              <td align="center">{unknownSymptom.name}</td>
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

Diagnostics.propTypes = {
  diagnostic: PropTypes.object.isRequired,
  generateDiagnostics: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  diagnostic: state.diagnostic,
});

export default withRouter(
  connect(mapStateToProps, { generateDiagnostics })(Diagnostics)
);
