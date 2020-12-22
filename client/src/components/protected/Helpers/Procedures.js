import React from "react";
import moment from "moment";

class Procedures extends React.Component {
  render() {
    const { procedures } = this.props;

    return (
      <div className="container">
        <h4 className="text-center">Процедури</h4>
        <table className="table black-border text-center">
          <thead>
            <tr>
              <th scope="col">Назва</th>
              <th scope="col">Доповнення</th>
              <th scope="col">Дата призначення</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure) => (
              <tr>
                <td align="center">{procedure.name}</td>
                <td align="center">{procedure.amount}</td>
                <td align="center">
                  {moment(procedure.dateFact).format("DD.MM.YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Procedures;
