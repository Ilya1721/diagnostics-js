import React from "react";
import axios from "axios";

class Doctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
    };
  }

  componentDidMount() {
    axios.get("/api/employees").then((res) =>
      this.setState({
        doctors: res.data,
      })
    );
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center mt-3">Лікарі</h2>
        <div className="col text-center">
          <form action="/doctors/filter" method="GET" className="form-inline">
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
        {this.state.doctors.length > 0 &&
          this.state.doctors.map((doctor) => (
            <div className="card mt-3">
              <div className="row font-weight-bold">
                <div className="col-2 text-left">
                  <img alt="" src={doctor.image} />
                </div>
                <div className="col-8 text-left">
                  <div className="card-body text-left">
                    {doctor.lastName} {doctor.firstName} {doctor.fatherName}
                    <p className="font-weight-normal">{doctor.about}</p>
                  </div>
                </div>
              </div>
              <div className="row my-3 font-weight-bold">
                <div className="col text-center">{doctor.job.name}</div>
                <div className="col text-center">{doctor.clinic.name}</div>
                <div className="col text-center">{doctor.department.name}</div>
                <div className="col">{doctor.phoneNumber}</div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Doctors;
