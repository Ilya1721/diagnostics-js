import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSymptomStat } from "../../../actions/symptomStat/symptomStatActions";
import Loading from "../../modals/Loading";
import Histogram from "react-chart-histogram";

class SymptomStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getSymptomStat(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.symptomStat.loading !== this.props.symptomStat.loading) {
      this.setState({
        loading: this.props.symptomStat.loading,
      });
    }
  }

  buildGraph = () => {
    const { symptomStat } = this.props.symptomStat;
    if (symptomStat.length > 0) {
      const options = { fillColor: "#0000FF", strokeColor: "#0000FF" };
      let labels = [];
      let data = [];
      const symptoms = symptomStat.filter((d) => d.name !== null);
      for (const symptom of symptoms) {
        labels.push(symptom.name);
        data.push(symptom.count);
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
      const symptomStat = this.props.symptomStat.symptomStat.filter(
        (p) => p.count !== 0
      );
      return (
        <div className="container text-center">
          <h2 className="mb-3">Статистика симптомів</h2>
          <h4>Популярність симптомів</h4>
          <div className="graph">{this.buildGraph()}</div>
        </div>
      );
    }
  }
}

SymptomStat.propTypes = {
  symptomStat: PropTypes.object.isRequired,
  getSymptomStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  symptomStat: state.symptomStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSymptomStat })(SymptomStat);
