const expect = require('chai').expect;

const F2 = require('../../src/core');
require('../../src/geom/interval');
require('../../src/coord/polar'); // 极坐标系
require('../../src/geom/adjust/stack');
require('../../src/component/guide/arc');
const Guide = require('../../src/plugin/guide');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'colDefs';
document.body.appendChild(canvas);

describe('colDefs', () => {
  let chart;
  let data;

  it('定义了 min 和 max 的柱状图', function() {
    data = [
      { time: '周一', tem: 6.9, rain: 10 },
      { time: '周二', tem: 9.5, rain: 13 },
      { time: '周三', tem: 14.5, rain: 14 },
      { time: '周四', tem: 18.2, rain: 10 },
      { time: '周五', tem: 21.5, rain: 12 },
      { time: '周六', tem: 25.2, rain: 16 },
      { time: '周日', tem: 26.5, rain: 13 }
    ];
    chart = new F2.Chart({
      id: 'colDefs',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      tem: {
        min: 0,
        max: 80
      }
    });

    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('time', {
      label: {
        fontSize: 14
      },
      grid: null
    });
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
    chart.axis('rain', {
      label: {
        fontSize: 14
      }
    });
    chart.interval().position('time*tem');
    chart.render();

    const yScale = chart.getYScales()[0];
    expect(yScale.min).to.equal(0);
    expect(yScale.max).to.equal(80);
    chart.destroy();
  });

  it('设置了 max 的极坐标转置下的柱状图', function() {
    data = [
      { x: '1', y: 85 }
    ];
    chart = new F2.Chart({
      id: 'colDefs',
      pixelRatio: window.devicePixelRatio,
      plugins: Guide
    });
    chart.source(data, {
      y: {
        max: 100,
        min: 0
      }
    });
    chart.axis(false);
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.8
    });
    chart.guide().arc({
      start: [ 0, 0 ],
      end: [ 1, 99.98 ],
      top: false,
      style: {
        lineWidth: 20,
        stroke: '#ccc'
      }
    });
    chart.interval()
      .position('x*y')
      .size(20)
      .animate({
        appear: {
          duration: 1500
        }
      });
    chart.render();
    const yScale = chart.getYScales()[0];
    expect(yScale.min).to.equal(0);
    expect(yScale.max).to.equal(100);
    chart.destroy();
  });

  it('饼图设置了 max', function() {
    data = [
      { a: '1', b: 0.3, c: '1' },
      { a: '1', b: 0.3, c: '2' },
      { a: '1', b: 0.4, c: '3' }
    ];

    chart = new F2.Chart({
      id: 'colDefs',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      b: {
        max: 100
      }
    });

    chart.coord('polar', {
      transposed: true,
      inner: 0
    });

    chart.axis(false);
    chart.interval()
      .position('a*b')
      .color('c')
      .adjust('stack');
    chart.render();

    const yScale = chart.getYScales()[0];
    expect(yScale.min).to.equal(0);
    expect(yScale.max).to.equal(1);
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
