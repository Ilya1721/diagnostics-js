import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVisitStat } from "../../../actions/visitStat/visitStatActions";
import Loading from "../../modals/Loading";

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
      const days = this.props.visitStat.visitStat.days.filter(
        (d) => d.count !== 0
      );
      const months = this.props.visitStat.visitStat.months.filter(
        (m) => m.count !== 0
      );
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика візитів</h2>
          <h4>Популярність днів</h4>
          <table className="table table-light text-center mb-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">День</th>
                <th scope="col">Кількість візитів</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day.id}>
                  <td>{day.name}</td>
                  <td>{day.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Популярність місяців</h4>
          <table className="table table-light text-center mb-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Місяць</th>
                <th scope="col">Кількість візитів</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month) => (
                <tr key={month.id}>
                  <td>{month.name}</td>
                  <td>{month.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

VisitStat.propTypes = {
  visitStat: PropTypes.object.isRequired,
  getVisitStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  visitStat: state.visitStat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVisitStat })(VisitStat);
