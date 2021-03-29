import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMedicamentStat } from "../../../actions/medicamentStat/medicamentStatActions";
import Loading from "../../modals/Loading";
import Graphic from "./Graphic";

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

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { medicamentStat } = this.props.medicamentStat;
      return (
        <div className="container text-center">
          <h2 className="mb-3">Статистика медикаментів</h2>
          <h4>Популярність медикаментів</h4>
          <Graphic data={medicamentStat} />
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
