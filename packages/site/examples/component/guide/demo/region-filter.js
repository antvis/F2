import F2 from '@antv/f2';

const data = [{
  x: '分类一',
  y: 30
}, {
  x: '分类二',
  y: 48
}, {
  x: '分类三',
  y: 59
}, {
  x: '分类四',
  y: 125
}, {
  x: '分类五',
  y: 85
}, {
  x: '分类六',
  y: 70
}, {
  x: '分类七',
  y: 56
}, {
  x: '分类八',
  y: 34
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  y: {
    tickCount: 5
  }
});
chart.interval().position('x*y');

chart.guide().regionFilter({ // 绘制区域过滤
  start: [ 'min', 95 ],
  end: [ 'max', 'max' ],
  color: '#FF4D4F'
});
chart.guide().line({ // 绘制辅助线
  start: [ 'min', 95 ],
  end: [ 'max', 95 ],
  style: {
    stroke: '#FF4D4F',
    lineDash: [ 2 ]
  }
});
chart.guide().text({ // 绘制辅助文本
  position: [ 'max', 95 ],
  content: '预警值： 95',
  offsetY: -5,
  style: {
    fill: '#FF4D4F',
    textAlign: 'end',
    textBaseline: 'bottom'
  }
});

chart.render();
