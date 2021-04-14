import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addSymptom,
  getSymptoms,
} from "../../../../actions/symptom/symptomActions";
import TableCreateForm from "../../Helpers/TableCreateForm";
import Loading from "../../../modals/Loading";

class SymptomCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getSymptoms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.symptom.loading,
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
          data={this.props.symptom.symptoms}
          addObject={this.props.addSymptom}
          header="Додати симптом"
          redirectTo="/innerData/symptoms"
        />
      );
    }
  }
}

SymptomCreateForm.propTypes = {
  addSymptom: PropTypes.func.isRequired,
  getSymptoms: PropTypes.func.isRequired,
  symptom: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  symptom: state.symptom,
});

export default connect(mapStateToProps, { addSymptom, getSymptoms })(
  SymptomCreateForm
);
