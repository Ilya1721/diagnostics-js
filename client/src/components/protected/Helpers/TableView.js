import React from "react";
import moment from "moment";

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      name: this.props.name,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        ...this.state,
        data: this.props.data,
        name: this.props.name,
      });
    }
  }

  render() {
    const { data, name } = this.props;
    let index = 0;
    return (
      <div className="container">
        <h4 className="text-center">{name}</h4>
        <table className="table black-border text-center">
          <thead>
            <tr>
              <th scope="col">Назва</th>
              <th scope="col">Доповнення</th>
              <th scope="col">Дата призначення</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={index++}>
                <td align="center">{item.name}</td>
                <td align="center">{item.description}</td>
                <td align="center">
                  {moment(item.dateFact).format("DD.MM.YYYY HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableView;
