import React from "react";
import Dygraph from "dygraphs";

import { graphConfig } from "../resources/config";

class NumberCountGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      string: "",
    };
    this.graphRef = React.createRef();
    this.config = graphConfig;
  }

  setData = (callback) => {
    const inputData = this.props.inputData;

    if (inputData.length > 0) {
      const sorted = inputData.sort();
      let countArr = [];
      let prevItem = undefined;
      sorted.forEach((item) => {
        if (item === prevItem) {
          return;
        } else {
          countArr.push({
            num: item,
            count: parseFloat(
              (this.getOccurenceCount(sorted, item) / inputData.length).toFixed(
                3
              )
            ),
          });
        }
        prevItem = item;
      });
      let string = "x, y\n";
      countArr.forEach((item) => {
        string += `${item.num}, ${item.count}\n`;
      });
      this.props.setCountArr(countArr);
      this.setState(
        {
          ...this.state,
          string,
        },
        callback
      );
    }
  };

  getOccurenceCount = (arr, num) => {
    let count = 0;
    arr.forEach((item) => item === num && count++);
    return count;
  };

  buildGraph = () => {
    return new Dygraph(this.graphRef.current, this.state.string, this.config);
  };

  componentDidMount() {
    this.setData(this.buildGraph);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.inputData !== this.props.inputData) {
      this.setData(this.buildGraph);
    }
  }

  render() {
    return (
      <div className="count-graph">
        <h4 className="heading">Діаграма накопичених частот</h4>
        <div className="graph" ref={this.graphRef}></div>
      </div>
    );
  }
}

export default NumberCountGraph;
