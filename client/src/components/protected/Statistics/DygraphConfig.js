export const graphConfig = {
  axes: {
    x: {
      axisLabelFormatter: function (x) {
        return x.toPrecision(4);
      },
      pixelsPerLabel: 30,
    },
    y: {
      axisLabelFormatter: function (y) {
        return y.toPrecision(4);
      },
    },
  },
  width: 600,
  height: 400,
  rightGap: 50,
  digitsAfterDecimal: 0,
  xRangePad: 3,
  stepPlot: true,
};

export default { graphConfig };
