import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import Loading from "../../modals/Loading";

class Graphic extends React.Component {
  render() {
    const { data, yLabel } = this.props;
    let chartData = [];
    let xLabels = [];
    let xValues = [];
    for (let i = 0; i < data.length; i++) {
      const id = i + 1;
      chartData.push({ x: id, y: data[i].count });
      xLabels.push(data[i].name);
      xValues.push(id);
    }

    return (
      <VictoryChart domainPadding={50}>
        <VictoryAxis tickValues={xValues} tickFormat={xLabels} />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (Number.isInteger(x) ? `${x} (${yLabel})` : "")}
          style={{
            tickLabels: { fontSize: 5, padding: 1 },
          }}
        />
        <VictoryBar data={chartData} x="x" y="y" />
      </VictoryChart>
    );
  }
}

export default Graphic;
