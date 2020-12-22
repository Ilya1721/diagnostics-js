import React from "react";
import moment from "moment";

class Diagnosis extends React.Component {
  render() {
    const { diagnosis } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Діагнози</h4>
        <table className="table black-border text-center">
          <thead>
            <tr>
              <th scope="col">Діагноз</th>
              <th scope="col">Доповнення</th>
              <th scope="col">Дата призначення</th>
            </tr>
          </thead>
          <tbody>
            {diagnosis.map((diagnos) => (
              <tr key={diagnos.id}>
                <td align="center">{diagnos.name}</td>
                <td align="center">{diagnos.description}</td>
                <td align="center">
                  {moment(diagnos.dateFact).format("DD.MM.YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Diagnosis;
