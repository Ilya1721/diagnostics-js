import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../modals/Loading";
import {
  getDiagnostics,
  deleteDiagnostic,
} from "../../../../actions/diagnostic/diagnosticActions";
import { addLink } from "../../../../actions/navigation/navigationActions";

class Diagnostics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getDiagnostics();
    this.props.addLink({
      path: window.location.pathname,
      name: "Діагностика",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.loading,
      });
    }
  }

  onDelete = (id) => {
    if (window.confirm("Ви впевнені, що хочете це видалити?")) {
      this.props.deleteDiagnostic(id);
    }
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      const { innerData } = this.props.diagnostic;
      console.log(innerData);

      return (
        <div className="container mt-3">
          <h2 className="text-center mt-3 mb-4">
            Внутрішні дані системи діагностики
          </h2>
          <Link
            className="btn btn-primary text-right mr-2 mb-3"
            role="button"
            to={`/innerData/diagnostics/create`}
          >
            Додати співвідношення
          </Link>
          <table className="table text-center table-light">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Діагноз</th>
                <th scope="col">Симптоми</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {innerData.map((item) => (
                <tr key={item.diagnos.name}>
                  <td>{item.diagnos.name}</td>
                  <td>
                    {item.symptoms.map((symptom) => (
                      <span key={symptom.name}>{symptom.name}, </span>
                    ))}
                  </td>
                  <td>
                    <Link
                      className="btn btn-primary text-right mr-2 mb-3"
                      role="button"
                      to={`/innerData/diagnostics/${item.diagnos.id}/edit`}
                    >
                      Редагувати
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger text-right mr-2 mb-3"
                      role="button"
                      type="button"
                      onClick={() => this.onDelete(item.diagnos.id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

Diagnostics.propTypes = {
  diagnostic: PropTypes.object.isRequired,
  getDiagnostics: PropTypes.func.isRequired,
  deleteDiagnostic: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  diagnostic: state.diagnostic,
});

export default connect(mapStateToProps, {
  getDiagnostics,
  deleteDiagnostic,
  addLink,
})(Diagnostics);
