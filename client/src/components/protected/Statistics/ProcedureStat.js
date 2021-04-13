import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProcedureStat } from "../../../actions/procedureStat/procedureStatActions";
import { addLink } from "../../../actions/navigation/navigationActions";
import Loading from "../../modals/Loading";
import Graphic from "./Graphic";

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
    this.props.addLink({
      path: window.location.pathname,
      name: "Статистика процедур",
    });
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
        <div className="container text-center">
          <h2 className="mb-3">Статистика процедур</h2>
          <h4>Популярність процедур</h4>
          <Graphic data={procedureStat} yLabel="призначень" />
        </div>
      );
    }
  }
}

ProcedureStat.propTypes = {
  procedureStat: PropTypes.object.isRequired,
  getProcedureStat: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  procedureStat: state.procedureStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProcedureStat, addLink })(
  ProcedureStat
);
