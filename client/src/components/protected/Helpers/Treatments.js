import React from "react";
import moment from "moment";

class Treatments extends React.Component {
  render() {
    const { treatments } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Лікування</h4>
        <table className="table black-border text-center">
          <thead>
            <tr>
              <th align="center" scope="col">
                Лікування
              </th>
              <th scope="col">Доповнення</th>
              <th scope="col">Дата призначення</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((treatment) => (
              <tr key={treatment.id}>
                <td align="center">{treatment.name}</td>
                <td align="center">{treatment.description}</td>
                <td align="center">
                  {moment(treatment.dateFact).format("DD.MM.YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Treatments;
