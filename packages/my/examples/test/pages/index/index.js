// 通过 createElement 方式创建
import { createElement } from '@antv/f2';
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

Page({
  data: {
  },
  onRenderChart() {
    return createElement(Chart, {
      data: data
    });
  }
});
