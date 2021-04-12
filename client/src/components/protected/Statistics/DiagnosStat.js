import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDiagnosStat } from "../../../actions/diagnosStat/diagnosStatActions";
import Loading from "../../modals/Loading";
import Graphic from "./Graphic";

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
      const { diagnosStat } = this.props.diagnosStat;
      return (
        <div className="container text-center">
          <h2 className="mb-3">Статистика діагнозів</h2>
          <h4>Популярність діагнозів</h4>
          <Graphic data={diagnosStat} yLabel="призначень" />
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
