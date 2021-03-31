import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

class Graphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        data: this.props.data,
      });
    }
  }

  render() {
    const { data } = this.props;
    if (data.length > 0) {
      let chartData = [];
      for (const item of data) {
        chartData.push({ label: `${item.name}`, y: item.count });
      }
      const options = {
        data: [
          {
            type: "column",
            dataPoints: chartData,
          },
        ],
      };
      console.log(chartData);
      return <CanvasJSChart options={options} />;
    }
  }
}

export default Graphic;
