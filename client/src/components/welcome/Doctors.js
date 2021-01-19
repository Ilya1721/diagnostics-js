import React from "react";
import { connect } from "react-redux";
import { getUsers, findUsers } from "../../actions/user/userActions";
import PropTypes from "prop-types";
import Loading from "../modals/Loading";

class Doctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      search: "",
      category: "",
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  search = (e) => {
    e.preventDefault();
    const { search, category } = this.state;
    this.props.findUsers({ search, category });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.loading !== this.props.user.loading) {
      this.setState({
        loading: this.props.user.loading,
        category: "e.last_name",
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { users } = this.props.user;
      return (
        <div className="container">
          <h2 className="text-center mt-3">Лікарі</h2>
          <div className="col text-center">
            <form onSubmit={this.search} className="form-inline">
              <div className="input-group">
                <select
                  name="category"
                  onChange={this.onBaseInputChange}
                  className="form-control w-25"
                >
                  <option value="e.last_name">Прізвище</option>
                  <option value="e.first_name">Ім'я</option>
                  <option value="e.father_name">По-батькові</option>
                  <option value="j.name">Посада</option>
                  <option value="d.name">Відділення</option>
                </select>
                <input
                  id="search"
                  name="search"
                  className="form-control w-50 input-group-append"
                  onChange={this.onBaseInputChange}
                  value={this.state.search}
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
          {users.map((user) => (
            <div key={user.employee_id} className="card mt-3">
              <div className="row font-weight-bold">
                <div className="col-2 text-left">
                  <img alt="" src={user.image} />
                </div>
                <div className="col-8 text-left">
                  <div className="card-body text-left">
                    {user.last_name} {user.first_name} {user.father_name}
                    <p className="font-weight-normal">{user.about}</p>
                  </div>
                </div>
              </div>
              <div className="row my-3 font-weight-bold">
                <div className="col text-center">{user.job_name}</div>
                <div className="col text-center">{user.clinic_name}</div>
                <div className="col text-center">{user.department_name}</div>
                <div className="col">{user.phone_number}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

Doctors.propTypes = {
  getUsers: PropTypes.func.isRequired,
  findUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers, findUsers })(Doctors);
