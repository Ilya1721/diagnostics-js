import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addRoom } from "../../../../actions/room/roomActions";
import Loading from "../../../modals/Loading";

class RoomCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      room: {
        number: "",
        departmentId: this.props.match.params.id,
        clinicId: this.props.match.params.clinic_id,
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

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addRoom(this.state.room);
    this.setState({
      ...this.state,
      isComplete: true,
    });
  };

  redirect = () => {
    if (this.state.isComplete) {
      const { clinicId, departmentId } = this.state.room;
      return (
        <Redirect
          to={`/innerData/clinics/${clinicId}/departments/${departmentId}/show`}
        />
      );
    }
  };

  render() {
    const { clinicId, departmentId, number } = this.state.room;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Додати палату</div>
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
                        Підтвердити
                      </button>
                      <Link
                        to={`/innerData/clinics/${clinicId}/departments/${departmentId}/show`}
                        className="btn btn-danger"
                        role="button"
                      >
                        Відмінити
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

RoomCreateForm.propTypes = {
  addRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default withRouter(
  connect(mapStateToProps, { addRoom })(RoomCreateForm)
);
