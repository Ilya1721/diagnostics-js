import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVisitStat } from "../../../actions/visitStat/visitStatActions";
import { addLink } from "../../../actions/navigation/navigationActions";
import Loading from "../../modals/Loading";
import Graphic from "./Graphic";

class VisitStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    this.props.getVisitStat(id);
    this.props.addLink({
      path: window.location.pathname,
      name: "Статистика візитів",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visitStat.loading !== this.props.visitStat.loading) {
      this.setState({
        loading: this.props.visitStat.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { hours, days, months } = this.props.visitStat.visitStat;
      return (
        <div className="container text-center">
          <h2 className="text-center mb-3">Статистика візитів</h2>
          <h4>Навантаження по годинам</h4>
          <Graphic data={hours} yLabel="відвідування" />
          <h4>Навантаження по дням</h4>
          <Graphic data={days} yLabel="відвідування" />
          <h4>Навантаження по місяцям</h4>
          <Graphic data={months} yLabel="відвідування" />
        </div>
      );
    }
  }
}

VisitStat.propTypes = {
  visitStat: PropTypes.object.isRequired,
  getVisitStat: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  visitStat: state.visitStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVisitStat, addLink })(VisitStat);
