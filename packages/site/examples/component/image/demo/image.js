import F2 from '@antv/f2';

const data = [
  {
    year: '2001',
    sales: 1500
  },
  {
    year: '2002',
    sales: 5500
  },
  {
    year: '2003',
    sales: 1200
  },
  {
    year: '2004',
    sales: 2000
  }
];

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});


chart.source(data);

chart.coord({
  transposed: true
});

chart.interval().position('year*sales').size(20);

chart.on('beforerender', () => {
  const point = chart.getPosition({ year: '2002', sales: 5500 });
  const { x, y } = point;
  chart.get('canvas').addShape('image', {
    zIndex: 31,
    attrs: {
      x,
      y: y - 20,
      src: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 20,
      height: 20
    }
  });
});

chart.animate(false);
chart.render();
