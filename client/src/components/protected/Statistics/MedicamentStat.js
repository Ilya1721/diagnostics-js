import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMedicamentStat } from "../../../actions/medicamentStat/medicamentStatActions";
import Loading from "../../modals/Loading";
import Histogram from "react-chart-histogram";

class MedicamentStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getMedicamentStat(id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.medicamentStat.loading !== this.props.medicamentStat.loading
    ) {
      this.setState({
        loading: this.props.medicamentStat.loading,
      });
    }
  }

  buildGraph = () => {
    const { medicamentStat } = this.props.medicamentStat;
    if (medicamentStat.length > 0) {
      const options = { fillColor: "#0000FF", strokeColor: "#0000FF" };
      let labels = [];
      let data = [];
      const medicamentis = medicamentStat.filter((d) => d.name !== null);
      for (const medicament of medicamentis) {
        labels.push(medicament.name);
        data.push(medicament.count);
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
        <div className="container text-center">
          <h2 className="mb-3">Статистика медикаментів</h2>
          <h4>Популярність медикаментів</h4>
          <div className="graph">{this.buildGraph()}</div>
        </div>
      );
    }
  }
}

MedicamentStat.propTypes = {
  medicamentStat: PropTypes.object.isRequired,
  getMedicamentStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  medicamentStat: state.medicamentStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMedicamentStat })(MedicamentStat);
