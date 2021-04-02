import React from "react";
import { Link } from "react-router-dom";

class InnerData extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center mt-3">Внутрішні дані</h2>
        <table className="table text-center table-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/innerData/clinics" className="btn btn-link">
                  Клініки
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/innerData/diagnostics" className="btn btn-link">
                  Діагностика
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default InnerData;
