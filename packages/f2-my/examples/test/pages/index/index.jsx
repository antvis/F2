// 通过 createElement 方式创建
// import { createElement } from '@antv/f2';
import Chart from './chart';

/* eslint-disable */

const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const data2 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 50 },
  { genre: 'Other', sold: 50 },
];

var isAppX2CanvasEnv = function isAppX2CanvasEnv() {
  return my.canIUse('canvas.onReady') && my.canIUse('createSelectorQuery.return.node');
};

Page({
  data: {
    // chartData: data1,
  },
  onReady() {
    this.setData({
      chartData: data1,
    });
    // 模拟数据更新
    setTimeout(() => {
      this.setData({
        chartData: data2,
      });
    }, 2000);
  },
  onRenderChart(props) {
    const { data } = props;
    return <Chart data={data} />;

    // 如果不使用 jsx, 用下面代码效果也是一样的
    // return createElement(Chart, {
    //   data: data,
    // });
  },
});
