import React from "react";
import { Link } from "react-router-dom";

class CityTableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCol: this.props.firstCol,
      secondCol: this.props.secondCol,
      data: this.props.data,
      name: this.props.name,
      addFormLink: this.props.addFormLink,
      addFormText: this.props.addFormText,
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
    const {
      data,
      name,
      addFormLink,
      addFormText,
      firstCol,
      secondCol,
    } = this.props;
    return (
      <div className="container">
        <h4 className="text-center">{name}</h4>
        <Link
          className="btn btn-primary text-right mr-2 mb-3"
          role="button"
          to={addFormLink}
        >
          {addFormText}
        </Link>
        <table className="table black-border text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">{firstCol}</th>
              <th scope="col">{secondCol}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td align="center">{item.name}</td>
                <td align="center">{item.country_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CityTableView;
