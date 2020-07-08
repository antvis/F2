// https://f2.antv.vision/zh/examples/line/basic#smooth

import F2 from '@antv/f2';

const data = [
  {
    time: '2016-08-08 00:00:00',
    tem: 10,
  },
  {
    time: '2016-08-08 00:10:00',
    tem: 22,
  },
  {
    time: '2016-08-08 00:30:00',
    tem: 20,
  },
  {
    time: '2016-08-09 00:35:00',
    tem: 26,
  },
  {
    time: '2016-08-09 01:00:00',
    tem: 20,
  },
  {
    time: '2016-08-09 01:20:00',
    tem: 26,
  },
  {
    time: '2016-08-10 01:40:00',
    tem: 28,
  },
  {
    time: '2016-08-10 02:00:00',
    tem: 20,
  },
  {
    time: '2016-08-10 02:20:00',
    tem: 18,
  },
];

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

const defs: F2.DataRecordScale<typeof data[0]> = {
  time: {
    type: 'timeCat',
    mask: 'MM/DD',
    tickCount: 3,
    range: [0, 1],
  },
  tem: {
    tickCount: 5,
    min: 0,
    alias: '日均温度',
  },
};
chart.source(data, defs);
chart.axis('time', {
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
chart.tooltip({
  showCrosshairs: true,
});
chart.line().position(['time', 'tem']).shape('smooth');
chart.point().position(['time', 'tem']).shape('smooth').style({
  stroke: '#fff',
  lineWidth: 1,
});
chart.render();
