// https://f2.antv.vision/zh/examples/pie/donut#basic

import F2 from '@antv/f2';

const data = [
  {
    name: '股票类',
    percent: 83.59,
    a: '1',
  },
  {
    name: '债券类',
    percent: 2.17,
    a: '1',
  },
  {
    name: '现金类',
    percent: 14.24,
    a: '1',
  },
];

const map: Record<string, string> = {};
data.forEach(function (obj: typeof data[0]) {
  map[obj.name] = obj.percent + '%';
});

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: [20, 'auto'],
});
chart.source(data, {
  percent: {
    formatter: function formatter(val) {
      return val + '%';
    },
  },
});
chart.tooltip(false);
chart.legend({
  position: 'right',
  itemFormatter: function itemFormatter(val) {
    return val + '    ' + map[val];
  },
});
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.7,
  radius: 0.85,
});
chart.axis(false);
chart
  .interval()
  .position(['a', 'percent'])
  .color('name', ['#FE5D4D', '#3BA4FF', '#737DDE'])
  .adjust('stack');

chart.guide().html({
  position: ['50%', '45%'],
  html: `<div style="width: 250px;height: 40px;text-align: center;">
      <div style="font-size: 16px">总资产</div>
      <div style="font-size: 24px">133.08 亿</div>
    </div>`,
});
chart.render();
