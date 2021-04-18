import React from "react";
import { Redirect, Link } from "react-router-dom";

class CityTableCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      secondaryData: this.props.secondaryData,
      secondaryLabel: this.props.secondaryLabel,
      city: { value: "", isError: false, errorMsg: "" },
      country: { value: this.props.secondaryData[0].id },
      isComplete: false,
      redirectTo: this.props.redirectTo,
      header: this.props.header,
    };
  }

  onInputChange = (e) => {
    const { data } = this.state;
    let city = this.state.city;
    city.isError = false;
    city.value = e.target.value;
    if (
      data
        .map((item) => item.name.toLowerCase())
        .includes(e.target.value.toLowerCase())
    ) {
      city.isError = true;
      city.errorMsg = "Такі дані вже є в системі";
    }
    this.setState({
      ...this.state,
      city,
    });
  };

  onCountryInputChange = (e) => {
    this.setState({
      ...this.state,
      country: { value: e.target.value },
    });
  };

  renderError = (msg, isError) => {
    if (isError) {
      return (
        <div className="form-group row">
          <div className="col-md-6 offset-md-4">
            <span className="text-danger">{msg}</span>
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  redirect = () => {
    const { isComplete, redirectTo } = this.state;
    if (isComplete) {
      return <Redirect to={redirectTo} />;
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { city, country } = this.state;
    if (!city.isError) {
      this.props.addObject({ name: city.value, country_id: country.value });
      this.setState({
        ...this.state,
        isComplete: true,
      });
    }
  };

  render() {
    const {
      city,
      redirectTo,
      header,
      secondaryData,
      secondaryLabel,
    } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">{header}</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Назва
                    </label>

                    <div className="col-md-6">
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        value={city.name}
                        onChange={this.onInputChange}
                        required
                        autoComplete="name"
                        autoFocus
                      />
                    </div>
                  </div>
                  {this.renderError(city.errorMsg, city.isError)}
                  <div className="form-group row">
                    <label
                      htmlFor="country"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      {secondaryLabel}
                    </label>

                    <div className="col-md-6">
                      <select
                        id="country"
                        className="form-control"
                        name="country"
                        required
                        autoFocus
                        onChange={this.onCountryInputChange}
                      >
                        {secondaryData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Підтвердити
                      </button>
                      <Link
                        to={redirectTo}
                        className="btn btn-danger"
                        role="button"
                      >
                        Відмінити
                      </Link>
                    </div>
                  </div>
                  {this.redirect()}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CityTableCreateForm;
