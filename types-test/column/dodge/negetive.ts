// https://f2.antv.vision/zh/examples/column/dodge#negetive

import F2 from '@antv/f2';
import _ from 'lodash';

const data = [
  {
    time: '周一',
    tem: 6.9,
    city: 'tokyo',
  },
  {
    time: '周二',
    tem: 9.5,
    city: 'tokyo',
  },
  {
    time: '周三',
    tem: 14.5,
    city: 'tokyo',
  },
  {
    time: '周四',
    tem: 18.2,
    city: 'tokyo',
  },
  {
    time: '周五',
    tem: 21.5,
    city: 'tokyo',
  },
  {
    time: '周六',
    tem: 25.2,
    city: 'tokyo',
  },
  {
    time: '周日',
    tem: 26.5,
    city: 'tokyo',
  },
  {
    time: '周一',
    tem: -10.8,
    city: 'newYork',
  },
  {
    time: '周二',
    tem: -5.7,
    city: 'newYork',
  },
  {
    time: '周三',
    tem: -11.3,
    city: 'newYork',
  },
  {
    time: '周四',
    tem: -17,
    city: 'newYork',
  },
  {
    time: '周五',
    tem: -22,
    city: 'newYork',
  },
  {
    time: '周六',
    tem: -24.8,
    city: 'newYork',
  },
  {
    time: '周日',
    tem: -24.1,
    city: 'newYork',
  },
  {
    time: '周一',
    tem: 2.6,
    city: 'berlin',
  },
  {
    time: '周二',
    tem: 3.5,
    city: 'berlin',
  },
  {
    time: '周三',
    tem: 8.4,
    city: 'berlin',
  },
  {
    time: '周四',
    tem: 13.5,
    city: 'berlin',
  },
  {
    time: '周五',
    tem: 17,
    city: 'berlin',
  },
  {
    time: '周六',
    tem: -18.6,
    city: 'berlin',
  },
  {
    time: '周日',
    tem: 17.9,
    city: 'berlin',
  },
];
const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data, {
  tem: {
    tickCount: 5,
  },
});
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
    legend.setItems(chart.getLegendItems().city!);
  },
});
chart
  .interval()
  .position(['time', 'tem'])
  .color('city')
  .style('tem', {
    radius: function radius(val) {
      return val > 0 ? [4, 4, 0, 0] : [0, 0, 4, 4];
    },
  })
  .adjust('dodge');
chart.render();
