import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTreatments } from "../../../../actions/treatment/treatmentActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import Loading from "../../../modals/Loading";
import SimpleTableView from "../../Helpers/SimpleTableView";

class Treatments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getTreatments();
    this.props.addLink({
      path: window.location.pathname,
      name: "Схеми лікувань",
    });
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
      const { treatments } = this.props.treatment;
      return (
        <SimpleTableView
          data={treatments}
          name="Схеми лікувань"
          addFormLink="/innerData/treatments/create"
          addFormText="Додати схему лікувань"
        />
      );
    }
  }
}

Treatments.propTypes = {
  treatment: PropTypes.object.isRequired,
  getTreatments: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  treatment: state.treatment,
});

export default connect(mapStateToProps, { getTreatments, addLink })(Treatments);
