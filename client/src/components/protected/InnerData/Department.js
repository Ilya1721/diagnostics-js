import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDepartment } from "../../../actions/department/departmentActions";
import { getRoomsById } from "../../../actions/room/roomActions";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Loading from "../../modals/Loading";

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getDepartment(id);
    this.props.getRoomsById(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.room.loading !== this.props.room.loading) {
      this.setState({
        loading: this.props.room.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const department = this.props.department.departments[0];
      const { rooms } = this.props.room;
      return (
        <div className="container mt-3">
          <h2 className="text-center">{department.name} відділ</h2>
          <Link
            className="btn btn-primary text-right mr-2 mb-3"
            role="button"
            to={`/departments/${department.id}/edit`}
          >
            Редагувати відділ
          </Link>
          <h2 className="text-center mt-3">Палати</h2>
          <Link
            className="btn btn-primary text-right mr-2 mb-3"
            role="button"
            to="/rooms/create"
          >
            Додати палату
          </Link>
          <table className="table text-center table-light">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <Link to={`/rooms/${room.id}`} className="btn btn-link">
                      {room.number}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

Department.propTypes = {
  getDepartment: PropTypes.func.isRequired,
  department: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  getRoomsById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
  room: state.room,
});

export default withRouter(
  connect(mapStateToProps, { getDepartment, getRoomsById })(Department)
);
