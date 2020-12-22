import React from "react";
import moment from "moment";

class Medicaments extends React.Component {
  render() {
    const { medicaments } = this.props;

    return (
      <div className="container">
        <h4 className="text-center">Медикаменти</h4>
        <table className="table black-border text-center">
          <thead>
            <tr>
              <th scope="col">Медикамент</th>
              <th scope="col">Доповнення</th>
              <th scope="col">Дата призначення</th>
            </tr>
          </thead>
          <tbody>
            {medicaments.map((medicament) => (
              <tr>
                <td align="center">{medicament.name}</td>
                <td align="center">{medicament.amount}</td>
                <td align="center">
                  {moment(medicament.dateFact).format("DD.MM.YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Medicaments;
