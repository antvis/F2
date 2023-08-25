// index.js
/* eslint-disable */
import Chart from './chart';

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

Page({
  data: {
    onRenderChart: () => {},
  },
  onReady() {
    this.setData({
      onRenderChart: () => {
        return this.renderChart(data1);
      },
    });

    // 模拟数据更新
    setTimeout(() => {
      this.setData({
        onRenderChart: () => {
          return this.renderChart(data2);
        },
      });
    }, 2000);
  },
  renderChart(data) {
    return <Chart data={data} />;
    // 如果不使用 jsx, 用下面代码效果也是一样的
    // return createElement(Chart, {
    //   data: data,
    // });
  },
});
