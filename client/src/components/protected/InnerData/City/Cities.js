import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCities } from "../../../../actions/city/cityActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import Loading from "../../../modals/Loading";
import CityTableView from "../../Helpers/CityTableView";

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getCities();
    this.props.addLink({ path: window.location.pathname, name: "Міста" });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.city.loading,
      });
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      const { cities } = this.props.city;
      return (
        <CityTableView
          data={cities}
          name="Міста"
          firstCol="Назва"
          secondCol="Країна"
          addFormLink="/innerData/cities/create"
          addFormText="Додати місто"
        />
      );
    }
  }
}

Cities.propTypes = {
  city: PropTypes.object.isRequired,
  getCities: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

export default connect(mapStateToProps, { getCities, addLink })(Cities);
