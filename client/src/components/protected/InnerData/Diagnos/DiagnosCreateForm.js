import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addDiagnos,
  getDiagnosis,
} from "../../../../actions/diagnos/diagnosActions";
import TableCreateForm from "../../Helpers/TableCreateForm";
import Loading from "../../../modals/Loading";

class DiagnosCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getDiagnosis();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.diagnos.loading,
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
          data={this.props.diagnos.diagnosis}
          addObject={this.props.addDiagnos}
          header="Додати хворобу"
          redirectTo="/innerData/diseases"
        />
      );
    }
  }
}

DiagnosCreateForm.propTypes = {
  addDiagnos: PropTypes.func.isRequired,
  getDiagnosis: PropTypes.func.isRequired,
  diagnos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  diagnos: state.diagnos,
});

export default connect(mapStateToProps, { addDiagnos, getDiagnosis })(
  DiagnosCreateForm
);
