import React from "react";
import PropTypes from "prop-types";

class Doctors extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center mt-3">Лікарі</h2>
        <div className="col text-center">
          <form action="/doctors/filter" method="GET" className="form-inline">
            <div className="input-group">
              <select name="category" className="form-control w-25">
                <option value="employees.last_name">Прізвище</option>
                <option value="employees.first_name">Ім`я</option>
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
        <div className="card mt-3">
          <div className="row font-weight-bold">
            <div className="col-2 text-left">
              <img src="https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/doctors/doctor.png" />
            </div>
            <div className="col-8 text-left">
              <div className="card-body text-left">
                Вишинський Ілля Олександрович
                <p className="font-weight-normal">
                  Автор численних наукових праць, а також науково-популярних
                  статей і книг, найвідоміша з яких — «Здоров'я дитини і
                  здоровий глузд її родичів» — витримала понад 15 перевидань.
                </p>
              </div>
            </div>
          </div>
          <div className="row my-3 font-weight-bold">
            <div className="col text-center">Лікар</div>
            <div className="col text-center">
              Хмельницька міська дитяча лікарня
            </div>
            <div className="col text-center">Терапевтичний відділ</div>
            <div className="col">0936521458</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Doctors;
