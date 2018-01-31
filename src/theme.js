/**
 * @fileOverview 默认皮肤
 * @author dxq613@gail.com
 */
const Util = require('./util/common');
const color1 = '#E8E8E8'; // 坐标轴线、坐标轴网格线的颜色
const color2 = '#808080'; // 字体颜色

const defaultAxis = {
  label: {
    fill: color2,
    fontSize: 10
  },
  line: {
    stroke: color1,
    lineWidth: 1,
    top: true
  },
  grid: {
    stroke: color1,
    lineWidth: 1,
    lineDash: [ 4 ]
  },
  tickLine: null,
  labelOffset: 7.5 // TODO
};

const Theme = {
  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
  defaultColor: '#1890FF',
  pixelRatio: 1,
  padding: 'auto',
  appendPadding: 15,
  colors: [
    '#1890FF',
    '#73C9E6',
    '#13C2C2',
    '#6CD9B3',
    '#2FC25B',
    '#9DD96C',
    '#FACC14',
    '#E6965C',
    '#F04864',
    '#D66BCA',
    '#8543E0',
    '#8E77ED',
    '#3436C7',
    '#737EE6',
    '#223273',
    '#7EA2E6'
  ],
  shapes: {
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  opacities: [ 0.1, 0.9 ],
  sizes: [ 4, 10 ],
  axis: {
    bottom: Util.mix({}, defaultAxis, {
      grid: null
    }),
    left: Util.mix({}, defaultAxis, {
      line: null
    }),
    right: Util.mix({}, defaultAxis, {
      line: null,
      grid: null
    }),
    circle: Util.mix({}, defaultAxis, {
      line: null
    }),
    radius: Util.mix({}, defaultAxis, {
      labelOffset: 4
    })
  },
  shape: {
    line: {
      lineWidth: 2 // 线的默认宽度
    },
    point: {
      lineWidth: 0,
      size: 4 // 圆的默认半径
    },
    area: {
      fillOpacity: 0.4 // TODO: 需要确认
    }
  },
  _defaultAxis: defaultAxis
};

module.exports = Theme;
