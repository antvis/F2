// https://f2.antv.vision/zh/examples/pie/donut#cascade

import F2 from '@antv/f2';
import _ from 'lodash';

const data = [
  {
    a: '1',
    b: 0.2,
    c: '1',
  },
  {
    a: '2',
    b: 0.5,
    c: '1',
  },
  {
    a: '3',
    b: 0.4,
    c: '1',
  },
  {
    a: '1',
    b: 0.8,
    c: '2',
  },
  {
    a: '2',
    b: 0.5,
    c: '2',
  },
  {
    a: '3',
    b: 0.6,
    c: '2',
  },
];

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data);

chart.coord('polar', {
  transposed: true,
  radius: 0.85,
  inner: 0.5,
});

chart.axis(false);
chart.tooltip({
  custom: true, // 自定义 tooltip 内容框
  onChange: function onChange(obj) {
    const legend = chart.get('legendController').legends.top![0];
    const tooltipItems = obj.items;
    const legendItems = legend.items;
    const map: Record<string, F2.LegendItem> = {};
    legendItems.forEach(function (item) {
      map[item.name] = _.clone(item);
    });
    tooltipItems.forEach(function (item) {
      const name = item.name!;
      const value = item.value;
      if (map[name]) {
        map[name].value = value;
      }
    });
    legend.setItems(_.values(map));
  },
  onHide: function onHide() {
    const legend = chart.get('legendController').legends.top![0];
    legend.setItems(chart.getLegendItems().c!);
  },
});
chart.interval().position(['a', 'b']).color('c').adjust('stack');
chart.render();
