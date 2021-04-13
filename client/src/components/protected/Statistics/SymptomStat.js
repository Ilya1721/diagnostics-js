import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSymptomStat } from "../../../actions/symptomStat/symptomStatActions";
import { addLink } from "../../../actions/navigation/navigationActions";
import Loading from "../../modals/Loading";
import Graphic from "./Graphic";

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
    this.props.addLink({
      path: window.location.pathname,
      name: "Статистика симптомів",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.symptomStat.loading !== this.props.symptomStat.loading) {
      this.setState({
        loading: this.props.symptomStat.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { symptomStat } = this.props.symptomStat;
      return (
        <div className="container text-center">
          <h2 className="mb-3">Статистика симптомів</h2>
          <h4>Популярність симптомів</h4>
          <Graphic data={symptomStat} yLabel="призначень" />
        </div>
      );
    }
  }
}

SymptomStat.propTypes = {
  symptomStat: PropTypes.object.isRequired,
  getSymptomStat: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  symptomStat: state.symptomStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSymptomStat, addLink })(
  SymptomStat
);
