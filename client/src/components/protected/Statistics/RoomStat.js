import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoomStat } from "../../../actions/roomStat/roomStatActions";
import Loading from "../../modals/Loading";

class RoomStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getRoomStat();
  }

  componentDidUpdate(prevProps) {
    console.log("component update");
    if (prevProps.roomStat.loading !== this.props.roomStat.loading) {
      console.log("change loading");
      this.setState({
        loading: this.props.roomStat.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { roomStat } = this.props.roomStat;
      return (
        <div class="container">
          <h2 class="text-center mb-3">Статистика кабінетів</h2>
          <h4>Популярність кабінетів</h4>
          <table class="table table-light text-center mb-4">
            <thead class="thead-dark">
              <th scope="col">Кабінет</th>
              <th scope="col">Кількість відвідувань</th>
            </thead>
            <tbody>
              {roomStat.map((room) => (
                <tr>
                  <td>{room.number}</td>
                  <td>{room.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

RoomStat.propTypes = {
  roomStat: PropTypes.object.isRequired,
  getRoomStat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  roomStat: state.roomStat,
});

export default connect(mapStateToProps, { getRoomStat })(RoomStat);
