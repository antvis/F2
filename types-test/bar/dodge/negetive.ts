// https://f2.antv.vision/zh/examples/bar/dodge#negetive

import F2 from '@antv/f2';

const data = [
  {
    gender: 'Male',
    value: -4.4,
    cate: '0-10',
  },
  {
    gender: 'Male',
    value: -4.8,
    cate: '10-19',
  },
  {
    gender: 'Male',
    value: -5.8,
    cate: '20-29',
  },
  {
    gender: 'Male',
    value: -6.2,
    cate: '30-39',
  },
  {
    gender: 'Male',
    value: -7.5,
    cate: '40-49',
  },
  {
    gender: 'Male',
    value: -8.0,
    cate: '50-59',
  },
  {
    gender: 'Male',
    value: -5.5,
    cate: '60-69',
  },
  {
    gender: 'Male',
    value: -4.8,
    cate: '70-79',
  },
  {
    gender: 'Male',
    value: -1.8,
    cate: '80-89',
  },
  {
    gender: 'Male',
    value: -0.3,
    cate: '90-99',
  },
  {
    gender: 'Male',
    value: -0.1,
    cate: '100 +',
  },
  {
    gender: 'Female',
    value: 4.1,
    cate: '0-10',
  },
  {
    gender: 'Female',
    value: 4.6,
    cate: '10-19',
  },
  {
    gender: 'Female',
    value: 5.6,
    cate: '20-29',
  },
  {
    gender: 'Female',
    value: 6.0,
    cate: '30-39',
  },
  {
    gender: 'Female',
    value: 7.2,
    cate: '40-49',
  },
  {
    gender: 'Female',
    value: 7.9,
    cate: '50-59',
  },
  {
    gender: 'Female',
    value: 6.0,
    cate: '60-69',
  },
  {
    gender: 'Female',
    value: 5.8,
    cate: '70-79',
  },
  {
    gender: 'Female',
    value: 3.0,
    cate: '80-89',
  },
  {
    gender: 'Female',
    value: 0.7,
    cate: '90-99',
  },
  {
    gender: 'Female',
    value: 0.1,
    cate: '100 +',
  },
];
const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data);
chart.coord({
  transposed: true,
});
chart.legend({
  align: 'right',
  itemWidth: 50,
});
chart.axis('cate', {
  line: F2.Global._defaultAxis.line,
  grid: null,
});
chart.axis('value', {
  line: null,
  grid: F2.Global._defaultAxis.grid,
  label: function label(text, index, total) {
    const textCfg: F2.AxisLabelParams = {};
    if (index === 0) {
      textCfg.textAlign = 'left';
    } else if (index === total - 1) {
      textCfg.textAlign = 'right';
    }
    return textCfg;
  },
});
chart.interval().position(['cate', 'value']).color('gender').adjust('stack');
chart.render();
