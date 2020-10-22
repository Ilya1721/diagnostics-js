import React from "react";
import { connect } from "react-redux";
import { getEmployees } from "../actions/employee/employeeActions";
import PropTypes from "prop-types";

class Employees extends React.Component {
  componentDidMount() {
    this.props.getEmployees();
  }

  render() {
    console.log(this.props);
    const { employees, loading } = this.props.employee;
    return (
      <div className="container">
        <h2 className="text-center mt-3">Лікарі</h2>
        <div className="col text-center">
          <form action="/employees/filter" method="GET" className="form-inline">
            <div className="input-group">
              <select name="category" className="form-control w-25">
                <option value="employees.last_name">Прізвище</option>
                <option value="employees.first_name">Ім'я</option>
                <option value="employees.father_name">По-батькові</option>
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
          employees.map((employee) => (
            <div key={employee._id} className="card mt-3">
              <div className="row font-weight-bold">
                <div className="col-2 text-left">
                  <img alt="" src={employee.image} />
                </div>
                <div className="col-8 text-left">
                  <div className="card-body text-left">
                    {employee.lastName} {employee.firstName}{" "}
                    {employee.fatherName}
                    <p className="font-weight-normal">{employee.about}</p>
                  </div>
                </div>
              </div>
              <div className="row my-3 font-weight-bold">
                <div className="col text-center">{employee.job.name}</div>
                <div className="col text-center">{employee.clinic.name}</div>
                <div className="col text-center">
                  {employee.department.name}
                </div>
                <div className="col">{employee.phoneNumber}</div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

Employees.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default connect(mapStateToProps, { getEmployees })(Employees);
