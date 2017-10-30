/**
 * @fileOverview 默认皮肤
 * @author dxq613@gail.com
 */


const axisLineColor = '#999999';
const lineColor = '#E9E9E9';
const Util = require('./util');
const defaultAxis = {
  label: {
    fillStyle: '#979797',
    font: '20px san-serif'
  },
  labelOffset: 6,
  line: {
    stroke: lineColor,
    lineWidth: 1
  },
  grid: {
    stroke: lineColor,
    lineWidth: 1
  },
  tickLine: null
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
  pixelRatio: 1,
  padding: [ 40, 40, 40, 40 ],
  colors: [ '#4E7CCC', '#36B3C3', '#4ECDA5', '#94E08A', '#E2F194', '#EDCC72', '#F8AB60', '#F9815C', '#EB4456', '#C82B3D' ],
  shapes: {
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  opacities: [ 0.1, 0.9 ],
  sizes: [ 4, 10 ],
  axis: {
    bottom: Util.deepMix({}, defaultAxis, {
      line: {
        stroke: axisLineColor
      },
      label: {
        textBaseline: 'hanging'
      },
      labelOffset: 12,
      gridAttrs: {},
      grid(text, index, total) {
        if (index === 0 || index === total - 1) {
          return null;
        }
        return Util.mix({}, defaultAxis.grid, Theme.axis.bottom.gridAttrs);
      }
    }),
    left: Util.deepMix({}, defaultAxis, {
      label: {
        textAlign: 'end'
      },
      line: null,
      tickLine: null
    }),
    right: Util.deepMix({}, defaultAxis, {
      label: {
        textAlign: 'start'
      },
      line: null,
      tickLine: null,
      grid: null
    }),
    circle: Util.deepMix({}, defaultAxis, {
      line: {
        stroke: axisLineColor
      }
    }),
    radius: Util.deepMix({}, defaultAxis, {})
  },
  guide: {
    line: {
      stroke: '#000',
      lineWidth: 1
    },
    text: {
      fill: '#000',
      textAlign: 'center'
    },
    rect: {
      fillStyle: '#fafafa'
    },
    arc: {
      stroke: '#CCC'
    },
    html: {
      offset: [ 0, 0 ],
      align: 'cc'
    }
  }
};

module.exports = Theme;
