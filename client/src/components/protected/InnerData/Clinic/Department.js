import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDepartment } from "../../../../actions/department/departmentActions";
import { getRoomsById, deleteRoom } from "../../../../actions/room/roomActions";
import { addLink } from "../../../../actions/navigation/navigationActions";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Loading from "../../../modals/Loading";

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
      if (this.props.department.departments.length === 1) {
        const department = this.props.department.departments[0];
        this.props.addLink({
          path: window.location.pathname,
          name: `${department.name}`,
        });
      }
      this.setState({
        loading: this.props.room.loading,
      });
    }
  }

  onDelete = (id) => {
    this.props.deleteRoom(id);
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const department = this.props.department.departments[0];
      const { rooms } = this.props.room;
      return (
        <div className="container mt-3">
          <h2 className="text-center mt-3">Палати</h2>
          <Link
            className="btn btn-primary text-right mr-2 mb-3"
            role="button"
            to={`/innerData/clinics/${department.clinic_id}/departments/${department.id}/rooms/create`}
          >
            Додати палату
          </Link>
          <table className="table text-center table-light">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.number}</td>
                  <td>
                    <Link
                      className="btn btn-primary text-right mr-2 mb-3"
                      role="button"
                      to={`/innerData/clinics/${department.clinic_id}/departments/${department.id}/rooms/${room.id}/edit`}
                    >
                      Редагувати
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger text-right mr-2 mb-3"
                      role="button"
                      type="button"
                      onClick={() => this.onDelete(room.id)}
                    >
                      Видалити
                    </button>
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
  deleteRoom: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  department: state.department,
  room: state.room,
});

export default withRouter(
  connect(mapStateToProps, {
    getDepartment,
    getRoomsById,
    deleteRoom,
    addLink,
  })(Department)
);
