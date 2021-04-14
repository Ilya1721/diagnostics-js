import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addProcedure,
  getProcedures,
} from "../../../../actions/procedure/procedureActions";
import TableCreateForm from "../../Helpers/TableCreateForm";
import Loading from "../../../modals/Loading";

class ProcedureCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getProcedures();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.procedure.loading,
      });
    }
  }

  render() {
    return (
      <TableCreateForm
        data={this.props.procedure.procedures}
        addObject={this.props.addProcedure}
        header="Додати процедуру"
        redirectTo="/innerData/procedures"
      />
    );
  }
}

ProcedureCreateForm.propTypes = {
  addProcedure: PropTypes.func.isRequired,
  getProcedures: PropTypes.func.isRequired,
  procedure: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  procedure: state.procedure,
});

export default connect(mapStateToProps, { addProcedure, getProcedures })(
  ProcedureCreateForm
);
