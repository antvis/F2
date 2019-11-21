import F2 from '@antv/f2';
import insertCss from 'insert-css';

insertCss(`
  canvas.circle-grid {
    background-color: #50577D;
  }
`);
// 设置独立的css
const container = document.getElementById('container');
container.className = 'circle-grid';

const data = [{
  name: 'Samsung',
  percent: 21.2
}, {
  name: 'Apple',
  percent: 14.6
}, {
  name: 'Huawei',
  percent: 9.5
}, {
  name: 'Oppo',
  percent: 6.8
}, {
  name: 'Vivo',
  percent: 5.3
}, {
  name: 'Others',
  percent: 42.7
}];

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.coord('polar', {
  transposed: true,
  endAngle: 2 * Math.PI,
  startAngle: Math.PI / 2,
  innerRadius: 0.3
});

chart.source(data.reverse(), {
  percent: {
    max: 100
  }
});
chart.axis('name', {
  grid: {
    lineDash: null,
    type: 'arc'
  },
  line: null,
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    fill: '#E5875B'
  }
});
chart.axis('percent', false);
chart.tooltip(false);
chart.guide().html({
  position: [ 'Samsung', 21.2 ],
  html: '<div style="background: #50577D;font-size: 10px;color: #fff">21.2%</div>',
  alignX: 'center',
  alignY: 'bottom',
  offsetY: -8,
  offsetX: 2
});
chart.guide().html({
  position: [ 'Others', 42.7 ],
  html: '<div style="background: #50577D;font-size: 10px;color: #fff">42.7%</div>',
  alignX: 'center',
  alignY: 'bottom',
  offsetY: -8,
  offsetX: 2
});

chart.interval().position('name*percent').color('#E5875B');

chart.render();
