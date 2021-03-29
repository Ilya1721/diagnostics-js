import React from "react";
import Histogram from "react-chart-histogram";

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
      const options = { fillColor: "#0000FF", strokeColor: "#0000FF" };
      let labels = [];
      let values = [];
      for (const item of data) {
        labels.push(item.name);
        values.push(item.count);
      }
      console.log(labels, values);
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
  }
}

export default Graphic;
