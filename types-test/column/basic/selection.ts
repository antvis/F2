// https://f2.antv.vision/zh/examples/column/basic#selection

import F2 from '@antv/f2';

const data = [
  {
    year: '1951 年',
    sales: 38,
  },
  {
    year: '1952 年',
    sales: 52,
  },
  {
    year: '1956 年',
    sales: 61,
  },
  {
    year: '1957 年',
    sales: 145,
  },
  {
    year: '1958 年',
    sales: 48,
  },
  {
    year: '1959 年',
    sales: 38,
  },
  {
    year: '1960 年',
    sales: 38,
  },
  {
    year: '1962 年',
    sales: 38,
  },
];
const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data, {
  sales: {
    tickCount: 5,
  },
});
chart.tooltip(false);
chart.interval().position(['year', 'sales']);
chart.render();

// 绘制柱状图文本
const offset = -5;
const canvas = chart.get('canvas');
const group = canvas.addGroup();
const shapes: Record<string, any> = {};
data.forEach(function (obj) {
  const point = chart.getPosition(obj);
  const text = group.addShape('text', {
    attrs: {
      x: point.x,
      y: point.y + offset,
      text: obj.sales,
      textAlign: 'center',
      textBaseline: 'bottom',
      fill: '#808080',
    },
  });

  shapes[obj.year] = text; // 缓存该 shape, 便于后续查找
});

let lastTextShape: any; // 上一个被选中的 text
// 配置柱状图点击交互
chart.interaction('interval-select', {
  selectAxisStyle: {
    fill: '#000',
    fontWeight: 'bold',
  },
  mode: 'range',
  defaultSelected: {
    year: '1962 年',
    sales: 38,
  },
  onEnd: function onEnd(ev) {
    const data = ev.data,
      selected = ev.selected;

    lastTextShape &&
      lastTextShape.attr({
        fill: '#808080',
        fontWeight: 'normal',
      });
    if (selected) {
      const textShape = shapes[data.year];
      textShape.attr({
        fill: '#000',
        fontWeight: 'bold',
      });
      lastTextShape = textShape;
    }
    canvas.draw();
  },
});
