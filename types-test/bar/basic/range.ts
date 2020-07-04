// https://f2.antv.vision/zh/examples/bar/basic#range

import F2 from '@antv/f2';

const data = [
  {
    x: '分类一',
    y: [76, 100],
  },
  {
    x: '分类二',
    y: [56, 108],
  },
  {
    x: '分类三',
    y: [38, 129],
  },
  {
    x: '分类四',
    y: [58, 155],
  },
  {
    x: '分类五',
    y: [45, 120],
  },
  {
    x: '分类六',
    y: [23, 99],
  },
  {
    x: '分类七',
    y: [18, 56],
  },
  {
    x: '分类八',
    y: [18, 34],
  },
];
const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});
chart.source(data, {
  y: {
    tickCount: 5,
  },
});
chart.coord({
  transposed: true,
});
chart.tooltip({
  showItemMarker: false,
  onShow: function onShow(ev) {
    const items = ev.items;
    items[0].name = '范围';
    const value = items[0].value;
    items[0].value = value[0] + ' 至 ' + value[1];
  },
});
chart
  .interval()
  .position(['x', 'y'])
  .animate({
    appear: {
      animation: 'shapesScaleInY',
    },
  });
chart.render();
