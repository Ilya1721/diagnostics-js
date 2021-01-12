import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMedicamentStat } from "../../../actions/medicamentStat/medicamentStatActions";
import Loading from "../../modals/Loading";

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
      const medicamentStat = this.props.medicamentStat.medicamentStat.filter(
        (p) => p.count !== 0
      );
      return (
        <div className="container">
          <h2 className="text-center mb-3">Статистика медикаментів</h2>
          <h4>Популярність медикаментів</h4>
          <table className="table table-light text-center mb-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Медикамент</th>
                <th scope="col">Кількість призначень</th>
              </tr>
            </thead>
            <tbody>
              {medicamentStat.map((medicament) => (
                <tr key={medicament.id}>
                  <td>{medicament.name}</td>
                  <td>{medicament.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
