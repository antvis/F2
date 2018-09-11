const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/line');
const Legend = require('../../src/plugin/legend');

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue317';
document.body.appendChild(canvas);

describe('issue 317', () => {
  it('Issue 317', () => {
    const mainLegendMarker = function(color) {
      return function(x, y, r, ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.moveTo(x - r - 3, y);
        ctx.lineTo(x + r + 3, y);
        ctx.stroke();
        ctx.fill();
      };
    };

    const data = [
      { day: '周一', value: 300 },
      { day: '周二', value: 400 },
      { day: '周三', value: 350 },
      { day: '周四', value: 500 },
      { day: '周五', value: 490 },
      { day: '周六', value: 600 },
      { day: '周日', value: 900 }
    ];
    const chart = new F2.Chart({
      id: 'issue317',
      plugins: Legend,
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      value: {
        tickCount: 5
      }
    });
    chart.legend({
      custom: true,
      position: 'bottom',
      align: 'center',
      items: [
        {
          name: '净值',
          fill: '#3E9BFF',
          marker: mainLegendMarker('#3E9BFF')
        },
        { name: '最大回撤', marker: 'square', fill: '#CBEAC2' }
      ]
    });

    chart
      .line()
      .position('year*value')
      .color('name');
    chart.render();

    const legendController = chart.get('legendController');
    const legendCfg = legendController.legendCfg;
    const items = legendCfg.items;
    expect(items[0].marker.symbol).to.be.an.instanceof(Function);
    expect(items[0].marker.fill).to.equal('#3E9BFF');
  });
});
