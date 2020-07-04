// https://f2.antv.vision/zh/examples/gallery/forecast

import F2 from '@antv/f2';

const data = [
  {
    year: '2012',
    sales: 850,
  },
  {
    year: '2013',
    sales: 894,
  },
  {
    year: '2014',
    sales: 912,
  },
  {
    year: '2015',
    sales: 974,
  },
  {
    year: '2016',
    sales: 997,
  },
  {
    year: '2017',
    sales: 1013,
  },
  {
    year: '2018',
    sales: 1130,
  },
  {
    year: '2019',
    sales: 1204,
  },
  {
    year: '2020',
    sales: 1250,
  },
];

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  padding: ['auto', 20, 'auto', 'auto'],
  pixelRatio: window.devicePixelRatio,
});

chart.source(data, {
  year: {
    range: [0, 1],
  },
  sales: {
    tickCount: 5,
  },
});
chart.axis('year', {
  tickLine: {
    length: 4,
    lineWidth: 1,
    stroke: '#e8e8e8',
  },
});
chart.tooltip(false);
chart.line().position(['year', 'sales']);
chart
  .point()
  .position(['year', 'sales'])
  .style('year', {
    stroke: '#1890ff',
    lineWidth: 1,
    fill: '#FFF',
    r: function r(val) {
      if (Number(val) * 1 < 2018) {
        return 5;
      }
      return 0;
    },
  });

chart.guide().regionFilter({
  start: ['64%', '0%'],
  end: ['100%', '100%'],
  color: '#fff',
  style: {
    lineDash: [3, 8],
  },
});
// 2018 年开始为预测数据
const forecastData = data.slice(6);
forecastData.forEach(function (obj) {
  chart.guide().point({
    position: [obj.year, obj.sales],
    style: {
      fill: '#1890ff',
      r: 3,
    },
  });
  chart.guide().text({
    position: [obj.year, obj.sales],
    content: '$' + obj.sales,
    style: {
      fill: '#1890ff',
      textAlign: 'center',
    },
    offsetY: -15,
  });
});
chart.guide().rect({
  start: ['2017', 'min'],
  end: ['max', 'max'],
  style: {
    fill: '#1890ff',
    fillOpacity: 0.05,
  },
});
chart.guide().text({
  position: ['2017', 'max'],
  content: '预测',
  style: {
    fill: '#808080',
    textAlign: 'start',
    textBaseline: 'top',
    fontWeight: 'bold',
  },
  offsetX: 8,
  offsetY: 8,
});
chart.render();
