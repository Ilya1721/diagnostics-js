import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSymptoms } from "../../../../actions/symptom/symptomActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import Loading from "../../../modals/Loading";
import SimpleTableView from "../../Helpers/SimpleTableView";

class Symptoms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getSymptoms();
    this.props.addLink({ path: window.location.pathname, name: "Симптоми" });
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
      const { symptoms } = this.props.symptom;
      return (
        <SimpleTableView
          data={symptoms}
          name="Симптоми"
          addFormLink="/innerData/symptoms/create"
          addFormText="Додати симптом"
        />
      );
    }
  }
}

Symptoms.propTypes = {
  symptom: PropTypes.object.isRequired,
  getSymptoms: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  symptom: state.symptom,
});

export default connect(mapStateToProps, { getSymptoms, addLink })(Symptoms);
