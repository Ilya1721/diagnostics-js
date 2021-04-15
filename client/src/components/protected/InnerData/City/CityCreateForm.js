import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCity, getCities } from "../../../../actions/city/cityActions";
import { getCountries } from "../../../../actions/country/countryActions";
import CityTableCreateForm from "../../Helpers/CityTableCreateForm";
import Loading from "../../../modals/Loading";

class CityCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getCities();
    this.props.getCountries();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: !(
          this.props.city.cities.length > 0 &&
          this.props.country.countries.length > 0
        ),
      });
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      console.log("citycreateform", this.props.country.countries);
      return (
        <CityTableCreateForm
          data={this.props.city.cities}
          secondaryData={this.props.country.countries}
          secondaryLabel="Країна"
          addObject={this.props.addCity}
          header="Додати місто"
          redirectTo="/innerData/cities"
        />
      );
    }
  }
}

CityCreateForm.propTypes = {
  addCity: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
  country: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  country: state.country,
});

export default connect(mapStateToProps, { addCity, getCities, getCountries })(
  CityCreateForm
);
