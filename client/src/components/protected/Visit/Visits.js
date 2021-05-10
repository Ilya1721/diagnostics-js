import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVisits, findVisits } from "../../../actions/visit/visitActions";
import { addLink } from "../../../actions/navigation/navigationActions";
import moment from "moment";
import TableView from "../Helpers/TableView";
import Loading from "../../modals/Loading";

class Visits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      search: "",
      category: "",
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getVisits(user);
    this.props.addLink({ path: window.location.pathname, name: "Візити" });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visit.loading !== this.props.visit.loading) {
      this.setState({
        loading: this.props.visit.loading,
        category: "p.last_name",
      });
    }
  }

  search = (e) => {
    e.preventDefault();
    const { search, category } = this.state;
    const { user } = this.props.auth;
    this.props.findVisits({ search, category }, user);
  };

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { user } = this.props.auth;
      const { visits } = this.props.visit;

      return (
        <div className="container">
          <h3 className="text-center mt-3">Візити</h3>
          <div className="row w-100">
            <div className="col-4"></div>
            <div className="col-6 my-3">
              <form onSubmit={this.search} className="form-inline">
                <div className="input-group">
                  <select
                    name="category"
                    onChange={this.onBaseInputChange}
                    className="form-control w-25"
                  >
                    <option value="p.last_name">Прізвище</option>
                    <option value="p.first_name">Ім'я</option>
                    <option value="p.father_name">По-батькові</option>
                    <option value="p.street">Вулиця</option>
                    <option value="pr.id">Номер картки</option>
                  </select>
                  <input
                    id="search"
                    name="search"
                    className="form-control w-50 input-group-append"
                    value={this.state.search}
                    onChange={this.onBaseInputChange}
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
            <div key={visit.presence.id} className="card rounded-0 mt-3">
              <div className="row">
                <div className="col pr-0">
                  <div className="card border-top-0 border-left-0 rounded-0 container">
                    <div className="card-body">№{visit.presence.id}</div>
                  </div>
                </div>
                <div className="col px-0">
                  <div className="card border-top-0 border-left-0 border-right-0 rounded-0 container">
                    <div className="card-body">
                      Початок:{" "}
                      {moment(visit.presence.startAt).format("DD.MM.YYYY H:mm")}
                    </div>
                  </div>
                </div>
                <div className="col pl-0">
                  <div className="card border-top-0 border-right-0 rounded-0 container">
                    <div className="card-body">
                      Кінець:{" "}
                      {visit.departure_at !== null &&
                        moment(visit.presence.endAt).format("DD.MM.YYYY H:mm")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col pr-0">
                  <div className="card rounded-0 container border-left-0 border-bottom-0 border-top-0 border-right-1">
                    <div className="card-body">
                      <h4>Пацієнт</h4>
                      <p>
                        <span className="h5">ПІБ: </span>{" "}
                        {visit.patient.lastName} {visit.patient.firstName}{" "}
                        {visit.patient.fatherName}
                      </p>
                      <p>
                        <span className="h5">Адреса: </span> м.
                        {visit.patient.city}, вул.
                        {visit.patient.street} {visit.patient.house}, кв.{" "}
                        {visit.patient.flat}
                      </p>
                      <p>
                        <span className="h5">Телефон: </span>{" "}
                        {visit.patient.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col pl-0">
                  <div className="card rounded-0 container border-0">
                    <div className="card-body">
                      <h4>Прийом</h4>
                      <p>
                        <span className="h5">Заклад: </span>
                        {visit.clinic.name}
                      </p>
                      <p>
                        <span className="h5">Кабінет: </span>
                        {visit.room.number}
                      </p>
                      <div className="pt-0">
                        <Link
                          to={`/patients/${visit.patient.id}/show`}
                          className="btn btn-primary"
                          role="button"
                        >
                          Картка пацієнта
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="card rounded-0 border-left-0 border-bottom-0 border-top-1 border-right-0 container">
                    <div className="card-body">
                      <TableView data={visit.symptoms} name="Симптоми" />
                      <TableView data={visit.diagnosis} name="Діагнози" />
                      <TableView data={visit.medicaments} name="Медикаменти" />
                      <TableView data={visit.procedures} name="Процедури" />
                      <TableView data={visit.treatments} name="Лікування" />
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
}

Visits.propTypes = {
  auth: PropTypes.object.isRequired,
  visit: PropTypes.object.isRequired,
  getVisits: PropTypes.func.isRequired,
  findVisits: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  visit: state.visit,
});

export default connect(mapStateToProps, { getVisits, findVisits, addLink })(
  Visits
);
