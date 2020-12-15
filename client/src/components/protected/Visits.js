import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVisits } from "../../actions/visit/visitActions";

class Visits extends React.Component {
  componentDidMount() {
    const { user } = this.props.auth;
    if (user.id !== undefined) {
      console.log(user);
      this.props.getVisits(user);
    }
  }

  findVisit = (e) => {
    const { user } = this.props.auth;
    e.preventDefault();
  };

  render() {
    const { user } = this.props.auth;
    const { visits } = this.props.visit;

    return (
      <div className="container">
        <h2 className="text-center mt-3">Візити</h2>
        <Link
          className="btn btn-primary text-right"
          role="button"
          to="/visit/create"
        >
          Додати Запис
        </Link>
        <div className="row w-100">
          <div className="col-4"></div>
          <div className="col-6 my-3">
            <form
              onSubmit={this.findVisit}
              method="GET"
              className="form-inline"
            >
              <div className="input-group">
                <select name="category" className="form-control w-25">
                  <option value="patients.last_name">Прізвище</option>
                  <option value="patients.first_name">Ім'я</option>
                  <option value="patients.father_name">По-батькові</option>
                  <option value="rooms.number">Кабінет</option>
                  <option value="patients.street">Вулиця</option>
                  <option value="presences.id">Номер картки</option>
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
          <div className="col-4"></div>
        </div>
        {visits.map((visit) => (
          <div key={visit.id} className="card rounded-0 mt-3">
            <div className="row">
              <div className="col pr-0">
                <div className="card border-top-0 border-left-0 rounded-0 container">
                  <div className="card-body">№{visit.id}</div>
                </div>
              </div>
              <div className="col px-0">
                <div className="card border-top-0 border-left-0 border-right-0 rounded-0 container">
                  <div className="card-body">Початок: {visit.arrived_at}</div>
                </div>
              </div>
              <div className="col pl-0">
                <div className="card border-top-0 border-right-0 rounded-0 container">
                  <div className="card-body">Кінець: {visit.departure_at}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col pr-0">
                <div className="card rounded-0 container border-left-0 border-bottom-0 border-top-0 border-right-1">
                  <div className="card-body">
                    <h3>Пацієнт</h3>
                    <p>
                      <h5>ПІБ:</h5> {visit.lastName} {visit.firstName}{" "}
                      {visit.fatherName}
                    </p>
                    <p>
                      <h5>Адреса:</h5> м.{visit.cityName}
                      вул.{visit.street} {visit.house}
                      кв. {visit.flat}
                    </p>
                    <p>
                      <h5>Телефон:</h5> {visit.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col pl-0">
                <div className="card rounded-0 container border-0">
                  <div className="card-body">
                    <h3>Прийом</h3>
                    <p>
                      <h5>Заклад:</h5>
                      {visit.clinicName}
                    </p>
                    <p>
                      <h5>Кабінет:</h5>
                      {visit.room}
                    </p>
                    <div className="pt-0">
                      <Link
                        to={`/visits/${visit.id}/edit`}
                        className="btn btn-info"
                        role="button"
                      >
                        Редагувати
                      </Link>
                      <Link
                        to={`/visits/${visit.id}/show`}
                        className="btn btn-primary"
                        role="button"
                      >
                        Детальніше
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Visits.propTypes = {
  auth: PropTypes.object.isRequired,
  visit: PropTypes.object.isRequired,
  getVisits: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  visit: state.visit,
});

export default connect(mapStateToProps, { getVisits })(Visits);
