import React from "react";
import { Link } from "react-router-dom";

class Statistics extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center mt-3">Статистика</h2>
        <table className="table text-center table-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/statistics/visits" className="btn btn-link">
                  Візити
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/diseases" className="btn btn-link">
                  Діагнози
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/symptoms" className="btn btn-link">
                  Симптоми
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/medicaments" className="btn btn-link">
                  Медикаменти
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/treatments" className="btn btn-link">
                  Схеми лікувань
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/procedures" className="btn btn-link">
                  Процедури
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/statistics/rooms" className="btn btn-link">
                  Палати
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Statistics;