// https://f2.antv.vision/zh/examples/pie/rose#rose

import F2 from '@antv/f2';

const data = [
  {
    year: '2001',
    population: 41.8,
  },
  {
    year: '2002',
    population: 25.8,
  },
  {
    year: '2003',
    population: 31.7,
  },
  {
    year: '2004',
    population: 46,
  },
  {
    year: '2005',
    population: 28,
  },
];

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});
chart.source(data);
chart.coord('polar');
chart.legend({
  position: 'right',
});
chart.axis(false);
chart.interval().position(['year', 'population']).color('year').style({
  lineWidth: 1,
  stroke: '#fff',
});
chart.render();
