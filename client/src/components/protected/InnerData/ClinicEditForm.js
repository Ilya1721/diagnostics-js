import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Loading from "../../modals/Loading";
import { editClinic, getClinic } from "../../../actions/clinic/clinicActions";
import { getCities } from "../../../actions/city/cityActions";
import AwsClass from "../../../aws/awsApi";
import { getImgBuffer } from "../../../aws/imgBuffer";

class ClinicEditForm extends React.Component {
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
    const id = this.props.match.params.id;
    this.props.getCities();
    this.props.getClinic(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clinic.loading !== this.props.clinic.loading) {
      const {
        city_id,
        city_name,
        clinic_id,
        clinic_name,
        clinic_street,
        clinic_house,
        clinic_phoneNumber,
        clinic_type,
        clinic_schedule,
        clinic_image,
      } = this.props.clinic.clinics[0];
      this.setState({
        ...this.state,
        loading: this.props.clinic.loading,
        cities: this.props.city.cities.filter((c) => c.id !== city_id),
        clinic: {
          city: city_id,
          cityName: city_name,
          name: clinic_name,
          street: clinic_street,
          house: clinic_house,
          phoneNumber: clinic_phoneNumber,
          type: clinic_type,
          schedule: clinic_schedule,
          image: clinic_image,
          id: clinic_id,
        },
      });
    }
  }

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      clinic: {
        ...this.state.clinic,
        [e.target.name]: e.target.value,
      },
    });
  };

  onImageChange = (e) => {
    this.setState({
      ...this.state,
      clinic: {
        ...this.state.clinic,
        image: e.target.files[0],
      },
    });
  };

  onCityChange = (e) => {
    const { cities } = this.props.city;
    let cityId;
    try {
      cityId = parseInt(e.target.value);
    } catch (err) {
      console.log(err);
    }
    this.setState({
      ...this.state,
      cities: cities.filter((c) => c.id !== cityId),
      clinic: {
        ...this.state.clinic,
        city: cityId,
        cityName: cities.find((c) => c.id === cityId).name,
      },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { image, name } = this.state.clinic;
    const awsObject = AwsClass.build().then((aws) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        const buffer = getImgBuffer(base64);
        aws.uploadImage(image.name, buffer, name, "clinics").then((res) =>
          this.setState(
            {
              ...this.state,
              clinic: {
                ...this.state.clinic,
                image: res,
              },
            },
            () => {
              this.props.editClinic(this.state.clinic);
              this.setState({
                ...this.state,
                isComplete: true,
              });
            }
          )
        );
      };
      reader.readAsDataURL(image);
    });
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
      const { cities } = this.state;
      const {
        city,
        cityName,
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
                          onChange={this.onCityChange}
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
                        >
                          <option value={city}>{cityName}</option>
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
                          name="street"
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
                          name="house"
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
                          name="phoneNumber"
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
                          name="type"
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
                          name="schedule"
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

ClinicEditForm.propTypes = {
  editClinic: PropTypes.func.isRequired,
  getClinic: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
  clinic: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  clinic: state.clinic,
});

export default withRouter(
  connect(mapStateToProps, { editClinic, getCities, getClinic })(ClinicEditForm)
);
