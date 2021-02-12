import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDiagnosStat } from "../../../actions/diagnosStat/diagnosStatActions";
import Loading from "../../modals/Loading";
import Histogram from "react-chart-histogram";

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

  buildGraph = () => {
    const { diagnosStat } = this.props.diagnosStat;
    if (diagnosStat.length > 0) {
      const options = { fillColor: "#0000FF", strokeColor: "#0000FF" };
      let labels = [];
      let data = [];
      const diagnosis = diagnosStat.filter((d) => d.name !== null);
      for (const diagnos of diagnosis) {
        labels.push(diagnos.name);
        data.push(diagnos.count);
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
      const diagnosStat = this.props.diagnosStat.diagnosStat.filter(
        (p) => p.count !== 0
      );
      return (
        <div className="container text-center">
          <h2 className="mb-3">Статистика діагнозів</h2>
          <h4>Популярність діагнозів</h4>
          <div className="graph">{this.buildGraph()}</div>
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
