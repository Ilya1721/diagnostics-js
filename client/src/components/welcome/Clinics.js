import React from "react";
import { connect } from "react-redux";
import { getClinics } from "../../actions/clinic/clinicActions";
import PropTypes from "prop-types";

class Clinics extends React.Component {
  componentDidMount() {
    this.props.getClinics();
  }

  render() {
    console.log(this.props);
    const { clinics, loading } = this.props.clinic;
    return (
      <div className="container mt-3">
        <h3 className="text-center">Клініки</h3>
        <div className="col text-center">
          <form action="/clinics/filter" method="GET" className="form-inline">
            <div className="input-group">
              <select name="category" className="form-control w-25">
                <option value="clinics.name">Назва</option>
                <option value="cities.name">Місто</option>
                <option value="clinics.type">Тип</option>
              </select>
              <input
                id="search"
                name="search"
                className="form-control w-50 input-group-append"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-success" type="submit">
                  Find<span className="glyphicon glyphicon-search"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
        {!loading &&
          clinics.map((clinic) => (
            <div key={clinic._id} className="card mt-3">
              <div className="row mt-2">
                <div className="col-2">
                  <img
                    src={clinic.image}
                    alt=""
                    style={{ width: "125px", height: "150px" }}
                  />
                </div>
                <div className="col-6">
                  <h4>{clinic.name}</h4>
                  <p>{clinic.clinicType.name}</p>
                </div>
                <div className="col-2">
                  <p>
                    {clinic.street}, {clinic.house}, {clinic.city.name}
                  </p>
                  <p>{clinic.phoneNumber}</p>
                  <p>
                    Пн - Пт:{" "}
                    <span className="font-weight-bold">{clinic.schedule}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

Clinics.propTypes = {
  getClinics: PropTypes.func.isRequired,
  clinic: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clinic: state.clinic,
});

export default connect(mapStateToProps, { getClinics })(Clinics);
