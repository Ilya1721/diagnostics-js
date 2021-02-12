import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoomStat } from "../../../actions/roomStat/roomStatActions";
import Loading from "../../modals/Loading";
import Histogram from "react-chart-histogram";

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
    if (prevProps.roomStat.loading !== this.props.roomStat.loading) {
      this.setState({
        loading: this.props.roomStat.loading,
      });
    }
  }

  buildGraph = () => {
    const { roomStat } = this.props.roomStat;
    if (roomStat.length > 0) {
      const options = { fillColor: "#0000FF", strokeColor: "#0000FF" };
      let labels = [];
      let data = [];
      const rooms = roomStat.filter((r) => r.number !== null);
      for (const room of rooms) {
        labels.push(room.number);
        data.push(room.count);
      }
      return (
        <Histogram
          xLabels={labels}
          yValues={data}
          width="500"
          height="300"
          options={options}
        />
      );
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const { roomStat } = this.props.roomStat;
      return (
        <div className="container text-center">
          <h2 className="mb-3">Статистика кабінетів</h2>
          <h4>Популярність кабінетів</h4>
          <div className="graph">{this.buildGraph()}</div>
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
