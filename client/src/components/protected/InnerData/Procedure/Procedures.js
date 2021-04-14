import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProcedures } from "../../../../actions/procedure/procedureActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import Loading from "../../../modals/Loading";
import SimpleTableView from "../../Helpers/SimpleTableView";

class Procedures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getProcedures();
    this.props.addLink({ path: window.location.pathname, name: "Процедури" });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.procedure.loading,
      });
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      const { procedures } = this.props.procedure;
      return (
        <SimpleTableView
          data={procedures}
          name="Процедури"
          addFormLink="/innerData/procedures/create"
          addFormText="Додати процедуру"
        />
      );
    }
  }
}

Procedures.propTypes = {
  procedure: PropTypes.object.isRequired,
  getProcedures: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  procedure: state.procedure,
});

export default connect(mapStateToProps, { getProcedures, addLink })(Procedures);
