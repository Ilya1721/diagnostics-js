import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProcedureStat } from "../../../actions/procedureStat/procedureStatActions";
import Loading from "../../modals/Loading";

class ProcedureStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getProcedureStat(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.procedureStat.loading !== this.props.procedureStat.loading) {
      this.setState({
        loading: this.props.procedureStat.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { procedureStat } = this.props.procedureStat;
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика процедур</h2>
          <h4>Популярність процедур</h4>
          <table className="table table-light text-center mb-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Процедура</th>
                <th scope="col">Кількість призначень</th>
              </tr>
            </thead>
            <tbody>
              {procedureStat.map((procedure) => (
                <tr key={procedure.id}>
                  <td>{procedure.name}</td>
                  <td>{procedure.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

ProcedureStat.propTypes = {
  procedureStat: PropTypes.object.isRequired,
  getProcedureStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  procedureStat: state.procedureStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProcedureStat })(ProcedureStat);
