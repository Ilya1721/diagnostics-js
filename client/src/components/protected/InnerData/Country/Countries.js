import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries } from "../../../../actions/country/countryActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import Loading from "../../../modals/Loading";
import SimpleTableView from "../../Helpers/SimpleTableView";

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getCountries();
    this.props.addLink({ path: window.location.pathname, name: "Країни" });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.country.loading,
      });
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      const { countries } = this.props.country;
      return (
        <SimpleTableView
          data={countries}
          name="Країни"
          addFormLink="/innerData/countries/create"
          addFormText="Додати країну"
        />
      );
    }
  }
}

Countries.propTypes = {
  country: PropTypes.object.isRequired,
  getCountries: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  country: state.country,
});

export default connect(mapStateToProps, { getCountries, addLink })(Countries);
