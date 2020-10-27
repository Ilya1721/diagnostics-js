import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/user/userActions";
import PropTypes from "prop-types";

class Doctors extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    console.log(this.props);
    const { users, loading } = this.props.user;
    return (
      <div className="container">
        <h2 className="text-center mt-3">Лікарі</h2>
        <div className="col text-center">
          <form action="/users/filter" method="GET" className="form-inline">
            <div className="input-group">
              <select name="category" className="form-control w-25">
                <option value="users.last_name">Прізвище</option>
                <option value="users.first_name">Ім'я</option>
                <option value="users.father_name">По-батькові</option>
                <option value="jobs.name">Посада</option>
                <option value="departments.name">Відділення</option>
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
          users.map((user) => (
            <div key={user._id} className="card mt-3">
              <div className="row font-weight-bold">
                <div className="col-2 text-left">
                  <img alt="" src={user.image} />
                </div>
                <div className="col-8 text-left">
                  <div className="card-body text-left">
                    {user.lastName} {user.firstName} {user.fatherName}
                    <p className="font-weight-normal">{user.about}</p>
                  </div>
                </div>
              </div>
              <div className="row my-3 font-weight-bold">
                <div className="col text-center">{user.job.name}</div>
                <div className="col text-center">{user.clinic.name}</div>
                <div className="col text-center">{user.department.name}</div>
                <div className="col">{user.phoneNumber}</div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

Doctors.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(Doctors);
