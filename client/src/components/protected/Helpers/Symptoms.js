import React from "react";
import moment from "moment";

class Symptoms extends React.Component {
  render() {
    const { symptoms } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">Симптоми</h4>
        <table className="table black-border text-center">
          <thead>
            <tr>
              <th scope="col">Симптом</th>
              <th scope="col">Доповнення</th>
              <th scope="col">Дата призначення</th>
            </tr>
          </thead>
          <tbody>
            {symptoms.map((symptom) => (
              <tr key={symptom.id}>
                <td align="center">{symptom.name}</td>
                <td align="center">{symptom.description}</td>
                <td align="center">
                  {moment(symptom.dateFact).format("DD.MM.YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Symptoms;
