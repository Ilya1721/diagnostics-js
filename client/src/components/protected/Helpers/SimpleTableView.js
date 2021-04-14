import React from "react";
import { Link } from "react-router-dom";

class SimpleTableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { data, name, addFormLink, addFormText } = this.props;
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
              <th scope="col">Назва</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td align="center">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SimpleTableView;
