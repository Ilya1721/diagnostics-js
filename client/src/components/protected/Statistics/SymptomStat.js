import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSymptomStat } from "../../../actions/symptomStat/symptomStatActions";
import Loading from "../../modals/Loading";

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

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const symptomStat = this.props.symptomStat.symptomStat.filter(
        (p) => p.count !== 0
      );
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика симптомів</h2>
          <h4>Популярність симптомів</h4>
          <table className="table table-light text-center mb-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Процедура</th>
                <th scope="col">Кількість призначень</th>
              </tr>
            </thead>
            <tbody>
              {symptomStat.map((symptom) => (
                <tr key={symptom.id}>
                  <td>{symptom.name}</td>
                  <td>{symptom.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
