import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDiagnosStat } from "../../../actions/diagnosStat/diagnosStatActions";
import Loading from "../../modals/Loading";

class DiagnosStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getDiagnosStat(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.diagnosStat.loading !== this.props.diagnosStat.loading) {
      this.setState({
        loading: this.props.diagnosStat.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const diagnosStat = this.props.diagnosStat.diagnosStat.filter(
        (p) => p.count !== 0
      );
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика діагнозів</h2>
          <h4>Популярність діагнозів</h4>
          <table className="table table-light text-center mb-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Діагноз</th>
                <th scope="col">Кількість призначень</th>
              </tr>
            </thead>
            <tbody>
              {diagnosStat.map((diagnos) => (
                <tr key={diagnos.id}>
                  <td>{diagnos.name}</td>
                  <td>{diagnos.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

DiagnosStat.propTypes = {
  diagnosStat: PropTypes.object.isRequired,
  getDiagnosStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  diagnosStat: state.diagnosStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getDiagnosStat })(DiagnosStat);
