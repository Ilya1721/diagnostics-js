import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addTreatment,
  getTreatments,
} from "../../../../actions/treatment/treatmentActions";
import TableCreateForm from "../../Helpers/TableCreateForm";
import Loading from "../../../modals/Loading";

class TreatmentCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getTreatments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.treatment.loading,
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
          data={this.props.treatment.treatments}
          addObject={this.props.addTreatment}
          header="Додати схему лікувань"
          redirectTo="/innerData/treatments"
        />
      );
    }
  }
}

TreatmentCreateForm.propTypes = {
  addTreatment: PropTypes.func.isRequired,
  getTreatments: PropTypes.func.isRequired,
  treatment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  treatment: state.treatment,
});

export default connect(mapStateToProps, { addTreatment, getTreatments })(
  TreatmentCreateForm
);
