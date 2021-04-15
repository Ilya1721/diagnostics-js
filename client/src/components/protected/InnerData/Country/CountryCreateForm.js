import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addCountry,
  getCountries,
} from "../../../../actions/country/countryActions";
import TableCreateForm from "../../Helpers/TableCreateForm";
import Loading from "../../../modals/Loading";

class CountryCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getCountries();
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
      return (
        <TableCreateForm
          data={this.props.country.countries}
          addObject={this.props.addCountry}
          header="Додати медикамент"
          redirectTo="/innerData/countries"
        />
      );
    }
  }
}

CountryCreateForm.propTypes = {
  addCountry: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  country: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  country: state.country,
});

export default connect(mapStateToProps, { addCountry, getCountries })(
  CountryCreateForm
);
