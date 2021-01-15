import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Loading from "../../modals/Loading";
import { addClinic } from "../../../actions/clinic/clinicActions";
import { getCities } from "../../../actions/city/cityActions";

class ClinicCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      loading: true,
      clinic: {
        city: "",
        name: "",
        street: "",
        house: "",
        phoneNumber: "",
        type: "",
        schedule: "",
        image: "",
      },
    };
  }

  componentDidMount() {
    this.props.getCities();
  }

  componendDidUpdate(prevProps) {
    if (prevProps.city.loading !== this.props.city.loading) {
      this.setState({
        ...this.state,
        loading: this.props.city.loading,
      });
    }
  }

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      department: {
        ...this.state.department,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  redirect = () => {
    if (this.state.isComplete) {
      return <Redirect to="/innerData" />;
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { cities } = this.props.city;
      const {
        city,
        name,
        street,
        house,
        phoneNumber,
        type,
        schedule,
        image,
      } = this.state.clinic;
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Додати клініку</div>
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
                          value={name}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="name"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="city"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Місто
                      </label>
                      <div className="col-md-6">
                        <select
                          id="city"
                          className="form-control"
                          name="city"
                          required
                          autoFocus
                          onChange={this.onBaseInputChange}
                          value={this.state.city}
                        >
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="street"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Вулиця
                      </label>

                      <div className="col-md-6">
                        <input
                          id="street"
                          type="text"
                          className="form-control"
                          street="street"
                          value={street}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="street"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="house"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Будинок
                      </label>

                      <div className="col-md-6">
                        <input
                          id="house"
                          type="text"
                          className="form-control"
                          house="house"
                          value={house}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="house"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="phoneNumber"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Номер телефону
                      </label>

                      <div className="col-md-6">
                        <input
                          id="phoneNumber"
                          type="text"
                          className="form-control"
                          phoneNumber="phoneNumber"
                          value={phoneNumber}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="phoneNumber"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="type"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Тип
                      </label>

                      <div className="col-md-6">
                        <input
                          id="type"
                          type="text"
                          className="form-control"
                          type="type"
                          value={type}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="type"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="schedule"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Графік роботи
                      </label>

                      <div className="col-md-6">
                        <input
                          id="schedule"
                          type="text"
                          className="form-control"
                          schedule="schedule"
                          value={schedule}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="schedule"
                          autoFocus
                        />
                      </div>
                    </div>

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
                          value={name}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="name"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="image"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Фото
                      </label>

                      <div className="col-md-6">
                        <input
                          id="image"
                          ref={this.imageFileRef}
                          type="file"
                          className="form-control-file"
                          name="image"
                          onChange={this.onImageChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-0">
                      <div className="col-md-6 offset-md-4">
                        <button type="submit" className="btn btn-primary mr-2">
                          Register
                        </button>
                        <Link
                          to="/innerData"
                          className="btn btn-danger"
                          role="button"
                        >
                          Cancel
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
}

ClinicCreateForm.propTypes = {
  addClinic: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

export default withRouter(
  connect(mapStateToProps, { addClinic, getCities })(ClinicCreateForm)
);
