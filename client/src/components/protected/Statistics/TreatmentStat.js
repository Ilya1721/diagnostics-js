import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTreatmentStat } from "../../../actions/treatmentStat/treatmentStatActions";
import Loading from "../../modals/Loading";

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

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const treatmentStat = this.props.treatmentStat.treatmentStat.filter(
        (p) => p.count !== 0
      );
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика схем лікувань</h2>
          <h4>Популярність схем лікувань</h4>
          <table className="table table-light text-center mb-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Схема лікувань</th>
                <th scope="col">Кількість призначень</th>
              </tr>
            </thead>
            <tbody>
              {treatmentStat.map((treatment) => (
                <tr key={treatment.id}>
                  <td>{treatment.name}</td>
                  <td>{treatment.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
