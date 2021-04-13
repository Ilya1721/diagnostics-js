import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTreatmentStat } from "../../../actions/treatmentStat/treatmentStatActions";
import { addLink } from "../../../actions/navigation/navigationActions";
import Loading from "../../modals/Loading";
import Graphic from "./Graphic";

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
    this.props.addLink({
      path: window.location.pathname,
      name: "Статистика схем лікувань",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.treatmentStat.loading !== this.props.treatmentStat.loading) {
      this.setState({
        loading: this.props.treatmentStat.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { treatmentStat } = this.props.treatmentStat;
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика схем лікувань</h2>
          <h4>Популярність схем лікувань</h4>
          <Graphic data={treatmentStat} yLabel="призначень" />
        </div>
      );
    }
  }
}

TreatmentStat.propTypes = {
  treatmentStat: PropTypes.object.isRequired,
  getTreatmentStat: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  treatmentStat: state.treatmentStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTreatmentStat, addLink })(
  TreatmentStat
);
