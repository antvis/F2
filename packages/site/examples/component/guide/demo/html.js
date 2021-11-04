import F2 from '@antv/f2';

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

chart.source(data, {
  percent: {
    alias: '市场占比',
    formatter: function formatter(val) {
      return val + '%';
    }
  }
});
chart.tooltip({});
chart.guide().html({
  position: [ 'Samsung', 21.2 ],
  html: '<div style="background: #1890ff;font-size: 10px;color: #fff;padding: 2px;text-align: center;border-radius: 2px;">21.2%</div>',
  alignX: 'center',
  alignY: 'bottom',
  offsetY: -8
});
chart.guide().html({
  position: [ 'Others', 42.7 ],
  html: '<div style="background: #1890ff;font-size: 10px;color: #fff;padding: 2px;text-align: center;border-radius: 2px;">42.7%</div>',
  alignX: 'center',
  alignY: 'bottom',
  offsetY: -8
});

chart.interval().position('name*percent');

chart.render();
