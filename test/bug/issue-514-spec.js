const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');
require('../../src/coord/polar');
require('../../src/geom/adjust/stack');
require('../../src/geom/adjust/dodge');

describe('Issue 514', () => {
  let canvas;
  let chart;
  before(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'issue514';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.backgroundColor = '#fff';
    document.body.appendChild(canvas);
  });

  it('Issue 514', () => {
    const data = [
      { amount: 10000000000, title: '货币基金', amountDesc: '10000000000.00元' },
      { amount: 100999999, title: '定期', amountDesc: '100999999.00元' },
      { amount: 100, title: '短期理财', amountDesc: '100.00元' },
      { amount: 100, title: '余额宝', amountDesc: '100.00元' }
    ];
    chart = new F2.Chart({
      id: 'issue514',
      width: 300,
      height: 300,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.axis(false);
    chart.coord('polar', { // 极坐标
      transposed: true,
      innerRadius: 0.5,
      radius: 0.85
    });

    chart.interval()
      .position('a*amount')
      .color('title')
      .adjust('stack'); // 层叠

    chart.render();

    // 通过判断像素点的颜色进行测试
    const pixelData = canvas.getContext('2d').getImageData(248, 171, 1, 1).data;

    expect(pixelData[0]).to.equal(24); // r
    expect(pixelData[1]).to.equal(144); // g
    expect(pixelData[2]).to.equal(255); // b

    chart.destroy();
  });

  it('endAngle < startAngle', () => {

    const chartData = [{
      name: '总',
      percent: [ 0.0, 1 ],
      a: '1',
      type: 'data'
    }, {
      name: '当前',
      percent: [ 0.0, 0.9 ],
      a: '1',
      type: 'data'
    }, {
      name: '指针',
      percent: [ 0.0, 0.9 ],
      a: '1',
      type: 'pointer'
    }];
    const Shape = F2.Shape;
    // 指针
    Shape.registerShape('interval', 'dashBoard', {
      getPoints: function getPoints(cfg) {
        const x = cfg.x;
        const size = cfg.size;
        const y = cfg.y;
        const yTo = y[1];
        return [{
          x: x - size / 2 - 1,
          y: yTo + 0.002
        },
        {
          x: x - size / 2 - 1,
          y: yTo - 0.002
        },
        {
          x: x - 2.1,
          y: yTo - 0.02
        },
        {
          x: x - 2.1,
          y: yTo + 0.02
        }];
      },
      draw: function draw(cfg, container) {
        let point1 = cfg.points[0];
        let point2 = cfg.points[1];
        let point3 = cfg.points[2];
        let point4 = cfg.points[3];
        point1 = this.parsePoint(point1);
        point2 = this.parsePoint(point2);
        point3 = this.parsePoint(point3);
        point4 = this.parsePoint(point4);


        const line = container.addShape('Polygon', {
          attrs: {
            points: [ point1, point2, point3, point4 ],
            fill: '#313131',
            lineWidth: 2
          }
        });

        return line;
      }
    });

    chart = new F2.Chart({
      id: 'issue514',
      width: 300,
      height: 300,
      pixelRatio: 2
    });

    chart.source(chartData, {
      percent: {
        formatter: function formatter(val) {
          return val + '%';
        }
      }
    });

    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.68,
      radius: 0.85,
      startAngle: -1.1 * Math.PI,
      endAngle: 0.1 * Math.PI
    });
    chart.axis(false);
    chart.interval().position('a*percent')
      .size('name', name => {
        if (name === '总') {
          return 20;
        }
        return 50;
      })
      .color('name*percent', (name, percent) => {
        if (name === '总') {
          return 'red';
        } else if (name === '当前') {
          if (percent[1] < 0.2) {
            return '#FFDC75';
          } else if (percent[1] < 0.5) {
            return 'l(0) 0:#FFDC75 1:#ffa15a';
          }
          return '#1890ff';
        }
        return '#0055ff';
      })
      .adjust({
        type: 'dodge',
        marginRatio: 5
      })
      .shape('type', type => {
        if (type === 'pointer') {
          return 'dashBoard';
        }
        return 'rect';
      });

    chart.render();

    const pixelData = canvas.getContext('2d').getImageData(241, 138, 1, 1).data;
    expect(pixelData[0]).to.equal(24); // r
    expect(pixelData[1]).to.equal(144); // g
    expect(pixelData[2]).to.equal(255); // b
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
