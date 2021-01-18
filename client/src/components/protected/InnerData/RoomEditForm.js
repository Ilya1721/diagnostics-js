import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { editRoom, getRoom } from "../../../actions/room/roomActions";
import Loading from "../../modals/Loading";

class RoomEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      loading: true,
      room: {
        id: "",
        number: "",
        departmentId: "",
      },
    };
  }

  onBaseInputChange = (e) => {
    this.setState({
      ...this.state,
      room: {
        ...this.state.room,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRoom(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.room.loading !== this.props.room.loading) {
      const { number, department_id, id } = this.props.room.rooms[0];
      this.setState({
        ...this.state,
        loading: false,
        room: {
          number,
          id,
          departmentId: department_id,
        },
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editRoom(this.state.room);
    this.setState({
      ...this.state,
      isComplete: true,
    });
  };

  redirect = () => {
    if (this.state.isComplete) {
      return (
        <Redirect to={`/departments/${this.state.room.departmentId}/show`} />
      );
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { departmentId, number } = this.state.room;
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Додати відділ</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                      <label
                        htmlFor="number"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Назва
                      </label>

                      <div className="col-md-6">
                        <input
                          id="number"
                          type="text"
                          className="form-control"
                          name="number"
                          value={number}
                          onChange={this.onBaseInputChange}
                          required
                          autoComplete="number"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-0">
                      <div className="col-md-6 offset-md-4">
                        <button type="submit" className="btn btn-primary mr-2">
                          Register
                        </button>
                        <Link
                          to={`/departments/${departmentId}/show`}
                          className="btn btn-danger"
                          role="button"
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                    {this.redirect()}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

RoomEditForm.propTypes = {
  getRoom: PropTypes.func.isRequired,
  editRoom: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
});

export default withRouter(
  connect(mapStateToProps, { getRoom, editRoom })(RoomEditForm)
);
