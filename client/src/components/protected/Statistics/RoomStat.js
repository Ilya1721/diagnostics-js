import React from "react";
import PropTypes from "prop-types";
import Dygraph from "dygraphs";
import { graphConfig } from "./DygraphConfig";
import { connect } from "react-redux";
import { getRoomStat } from "../../../actions/roomStat/roomStatActions";
import Loading from "../../modals/Loading";

class RoomStat extends React.Component {
  constructor(props) {
    super(props);

    this.graphRef = React.createRef();
    this.config = graphConfig;
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getRoomStat();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roomStat.loading !== this.props.roomStat.loading) {
      this.setState(
        {
          loading: this.props.roomStat.loading,
        },
        this.buildGraph
      );
    }
  }

  buildGraph = () => {
    const { roomStat } = this.props.roomStat;
    if (roomStat.length > 0) {
      let string = "Кімната, Кількість візитів\n";
      for (const room of roomStat) {
        string += `${room.number}, ${room.count.toFixed(0)}\n`;
      }

      return new Dygraph(this.graphRef.current, string, this.config);
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
          <div className="m-auto" ref={this.graphRef}></div>
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
