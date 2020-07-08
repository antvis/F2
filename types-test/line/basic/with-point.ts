// https://f2.antv.vision/zh/examples/line/basic#with-point

import F2 from '@antv/f2';

const data = [
  {
    day: '周一',
    value: 300,
  },
  {
    day: '周二',
    value: 400,
  },
  {
    day: '周三',
    value: 350,
  },
  {
    day: '周四',
    value: 500,
  },
  {
    day: '周五',
    value: 490,
  },
  {
    day: '周六',
    value: 600,
  },
  {
    day: '周日',
    value: 900,
  },
];

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data, {
  value: {
    tickCount: 5,
    min: 0,
  },
  day: {
    range: [0, 1],
  },
});
chart.tooltip({
  showCrosshairs: true,
  showItemMarker: false,
  onShow: function onShow(ev) {
    const items = ev.items;
    items[0].name = null;
    items[0].value = '$ ' + items[0].value;
  },
});
chart.axis('day', {
  label: function label(text, index, total) {
    const textCfg: F2.AxisLabelParams = {};
    if (index === 0) {
      textCfg.textAlign = 'left';
    } else if (index === total - 1) {
      textCfg.textAlign = 'right';
    }
    return textCfg;
  },
});
chart.line().position(['day', 'value']);
chart.point().position(['day', 'value']).style({
  stroke: '#fff',
  lineWidth: 1,
});
chart.render();
