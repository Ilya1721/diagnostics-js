import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTreatmentStat } from "../../../actions/treatmentStat/treatmentStatActions";
import Loading from "../../modals/Loading";
import Histogram from "react-chart-histogram";

class TreatmentStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getTreatmentStat(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.treatmentStat.loading !== this.props.treatmentStat.loading) {
      this.setState({
        loading: this.props.treatmentStat.loading,
      });
    }
  }

  buildGraph = () => {
    const { treatmentStat } = this.props.treatmentStat;
    if (treatmentStat.length > 0) {
      const options = { fillColor: "#0000FF", strokeColor: "#0000FF" };
      let labels = [];
      let data = [];
      const treatmentis = treatmentStat.filter((d) => d.name !== null);
      for (const treatment of treatmentis) {
        labels.push(treatment.name);
        data.push(treatment.count);
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
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика схем лікувань</h2>
          <h4>Популярність схем лікувань</h4>
          <div className="graph">{this.buildGraph()}</div>
        </div>
      );
    }
  }
}

TreatmentStat.propTypes = {
  treatmentStat: PropTypes.object.isRequired,
  getTreatmentStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  treatmentStat: state.treatmentStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTreatmentStat })(TreatmentStat);
