import F2 from '@antv/f2';

const data = [{
  label: 'Mon.',
  type: 'series1',
  value: 2800
}, {
  label: 'Mon.',
  type: 'series2',
  value: 2260
}, {
  label: 'Tue.',
  type: 'series1',
  value: 1800
}, {
  label: 'Tue.',
  type: 'series2',
  value: 1300
}, {
  label: 'Wed.',
  type: 'series1',
  value: 950
}, {
  label: 'Wed.',
  type: 'series2',
  value: 900
}, {
  label: 'Thu.',
  type: 'series1',
  value: 500
}, {
  label: 'Thu.',
  type: 'series2',
  value: 390
}, {
  label: 'Fri.',
  type: 'series1',
  value: 170
}, {
  label: 'Fri.',
  type: 'series2',
  value: 100
}];
const chart = new F2.Chart({
  id: 'container',
  padding: [ 60, 'auto', 'auto' ],
  pixelRatio: window.devicePixelRatio
});

chart.source(data);

chart.legend(false);

// Tooltip 配置
chart.tooltip({
  showTitle: true // 展示  tooltip 的标题
});

chart.axis('label', {
  line: F2.Global._defaultAxis.line,
  grid: null
});
chart.axis('value', {
  line: null,
  grid: F2.Global._defaultAxis.grid,
  label: function label(text, index, total) {
    const textCfg = {};
    if (index === 0) {
      textCfg.textAlign = 'left';
    } else if (index === total - 1) {
      textCfg.textAlign = 'right';
    }
    return textCfg;
  }
});
chart.interval()
  .position('label*value')
  .color('type')
  .adjust({
    type: 'dodge',
    marginRatio: 1 / 32
  });
chart.render();
