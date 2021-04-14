import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getDiagnosis } from "../../../../actions/diagnos/diagnosActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import Loading from "../../../modals/Loading";
import SimpleTableView from "../../Helpers/SimpleTableView";

class Diagnosis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getDiagnosis();
    this.props.addLink({ path: window.location.pathname, name: "Діагнози" });
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
      const { diagnosis } = this.props.diagnos;
      return (
        <SimpleTableView
          data={diagnosis}
          name="Хвороби"
          addFormLink="/innerData/diseases/create"
          addFormText="Додати хворобу"
        />
      );
    }
  }
}

Diagnosis.propTypes = {
  diagnos: PropTypes.object.isRequired,
  getDiagnosis: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  diagnos: state.diagnos,
});

export default connect(mapStateToProps, { getDiagnosis, addLink })(Diagnosis);
