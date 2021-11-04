import F2 from '@antv/f2';

const data = [{
  day: '周一',
  value: 300
}, {
  day: '周二',
  value: 400
}, {
  day: '周三',
  value: null
}, {
  day: '周四',
  value: 500
}, {
  day: '周五',
  value: 490
}, {
  day: '周六',
  value: 600
}, {
  day: '周日',
  value: 900
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});

chart.source(data, {
  value: {
    tickCount: 5,
    min: 0
  },
  day: {
    range: [ 0, 1 ]
  }
});
chart.axis('day', {
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
chart.tooltip({
  showCrosshairs: true
});
chart.line({
  connectNulls: true // 配置，连接空值数据
}).position('day*value');
chart.point().position('day*value');
chart.render();
