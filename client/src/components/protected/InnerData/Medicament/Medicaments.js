import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMedicaments } from "../../../../actions/medicament/medicamentActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import Loading from "../../../modals/Loading";
import SimpleTableView from "../../Helpers/SimpleTableView";

class Medicaments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getMedicaments();
    this.props.addLink({ path: window.location.pathname, name: "Медикаменти" });
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
      const { medicaments } = this.props.medicament;
      return (
        <SimpleTableView
          data={medicaments}
          name="Медикаменти"
          addFormLink="/innerData/medicaments/create"
          addFormText="Додати медикамент"
        />
      );
    }
  }
}

Medicaments.propTypes = {
  medicament: PropTypes.object.isRequired,
  getMedicaments: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  medicament: state.medicament,
});

export default connect(mapStateToProps, { getMedicaments, addLink })(
  Medicaments
);
