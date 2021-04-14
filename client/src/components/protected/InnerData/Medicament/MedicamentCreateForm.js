import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addMedicament,
  getMedicaments,
} from "../../../../actions/medicament/medicamentActions";
import TableCreateForm from "../../Helpers/TableCreateForm";
import Loading from "../../../modals/Loading";

class MedicamentCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getMedicaments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.medicament.loading,
      });
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      return (
        <TableCreateForm
          data={this.props.medicament.medicaments}
          addObject={this.props.addMedicament}
          header="Додати медикамент"
          redirectTo="/innerData/medicaments"
        />
      );
    }
  }
}

MedicamentCreateForm.propTypes = {
  addMedicament: PropTypes.func.isRequired,
  getMedicaments: PropTypes.func.isRequired,
  medicament: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  medicament: state.medicament,
});

export default connect(mapStateToProps, { addMedicament, getMedicaments })(
  MedicamentCreateForm
);
