import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProcedureStat } from "../../../actions/procedureStat/procedureStatActions";
import Loading from "../../modals/Loading";
import Histogram from "react-chart-histogram";

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

  buildGraph = () => {
    const { procedureStat } = this.props.procedureStat;
    if (procedureStat.length > 0) {
      const options = { fillColor: "#0000FF", strokeColor: "#0000FF" };
      let labels = [];
      let data = [];
      const procedureis = procedureStat.filter((d) => d.name !== null);
      for (const procedure of procedureis) {
        labels.push(procedure.name);
        data.push(procedure.count);
      }
      return (
        <Histogram
          xLabels={labels}
          yValues={data}
          width="500"
          height="300"
          options={options}
        />
      );
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const procedureStat = this.props.procedureStat.procedureStat.filter(
        (p) => p.count !== 0
      );
      return (
        <div className="container text-center">
          <h2 className="mb-3">Статистика процедур</h2>
          <h4>Популярність процедур</h4>
          <div className="graph">{this.buildGraph()}</div>
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
