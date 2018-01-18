/**
 * @fileOverview 默认皮肤
 * @author dxq613@gail.com
 */

// constant
// FONTSIZE
// COLOR
const color1 = 'rgba(0, 0, 0, 0.09)'; // 坐标轴线、坐标轴网格线的颜色
const color2 = 'rgba(0, 0, 0, 0.45)'; // 字体颜色

const AXIS_LABEL = {
  fill: color2,
  fontSize: 20
};
const AXIS_LINE = {
  stroke: color1,
  lineWidth: 1,
  top: true
};
const AXIS_GRID = {
  stroke: color1,
  lineWidth: 1,
  lineDash: [ 4 ]
};

const defaultFont = {
  fontStyle: '',
  fontVariant: '',
  fontWeight: '',
  fontSize: '12px',
  fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", SimSun, "sans-serif"'
};

const Theme = {
  defaultFont,
  defaultColor: '#4E7CCC',
  pixelRatio: 1,
  padding: [ 80 ],
  colors: [ '#4E7CCC', '#36B3C3', '#4ECDA5', '#94E08A', '#E2F194', '#EDCC72', '#F8AB60', '#F9815C', '#EB4456', '#C82B3D' ],
  shapes: {
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  opacities: [ 0.1, 0.9 ],
  sizes: [ 4, 10 ],
  axis: {
    bottom: {
      line: AXIS_LINE,
      tickLine: null,
      grid: null,
      labelOffset: 15,
      label: AXIS_LABEL
    },
    left: {
      label: AXIS_LABEL,
      line: null,
      tickLine: null,
      grid: AXIS_GRID,
      labelOffset: 15
    },
    right: {
      label: AXIS_LABEL,
      line: null,
      grid: null,
      tickLine: null,
      labelOffset: 15
    },
    circle: {
      label: AXIS_LABEL,
      line: null,
      grid: AXIS_GRID,
      tickLine: null,
      labelOffset: 15
    },
    radius: {
      label: AXIS_LABEL,
      line: AXIS_LINE,
      grid: AXIS_GRID,
      tickLine: null,
      labelOffset: 8
    }
  },
  shape: {
    line: {
      lineWidth: 4 // 线的默认宽度
    },
    point: {
      lineWidth: 0,
      size: 5 // 圆的默认半径
    },
    area: {
      fillOpacity: 0.4 // TODO: 需要确认
    }
  }
};

module.exports = Theme;
